<?php
/**
 * Consultation form: markup, validation, storage and notification.
 *
 * WordPress has no separate API process, so the React build's
 * POST /api/consultations becomes admin-post.php → a private "lead" record that
 * is visible in the dashboard, plus an email to the site admin.
 *
 * @package Lumyla
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the private lead post type so every request is kept in the dashboard.
 *
 * @return void
 */
function lumyla_register_lead_type() {
	register_post_type(
		'lumyla_lead',
		array(
			'labels'          => array(
				'name'          => __( 'درخواست‌های مشاوره', 'lumyla' ),
				'singular_name' => __( 'درخواست مشاوره', 'lumyla' ),
				'menu_name'     => __( 'درخواست‌ها', 'lumyla' ),
				'all_items'     => __( 'همه درخواست‌ها', 'lumyla' ),
			),
			'public'          => false,
			'show_ui'         => true,
			'show_in_menu'    => true,
			'menu_icon'       => 'dashicons-email-alt',
			'capability_type' => 'post',
			'capabilities'    => array( 'create_posts' => 'do_not_allow' ),
			'map_meta_cap'    => true,
			'supports'        => array( 'title' ),
		)
	);
}
add_action( 'init', 'lumyla_register_lead_type' );

/**
 * Normalises an Iranian mobile number to 09xxxxxxxxx.
 *
 * @param string $raw Raw input.
 * @return string Empty string when invalid.
 */
function lumyla_normalize_phone( $raw ) {
	$digits = preg_replace( '/[^0-9+]/', '', (string) $raw );

	if ( 0 === strpos( $digits, '+98' ) ) {
		$digits = '0' . substr( $digits, 3 );
	} elseif ( 0 === strpos( $digits, '0098' ) ) {
		$digits = '0' . substr( $digits, 4 );
	} elseif ( 0 === strpos( $digits, '98' ) && 12 === strlen( $digits ) ) {
		$digits = '0' . substr( $digits, 2 );
	} elseif ( 0 === strpos( $digits, '9' ) && 10 === strlen( $digits ) ) {
		$digits = '0' . $digits;
	}

	return preg_match( '/^09\d{9}$/', $digits ) ? $digits : '';
}

/**
 * Handles the submitted consultation form.
 *
 * @return void
 */
function lumyla_handle_lead() {
	$referer = wp_get_referer() ? wp_get_referer() : home_url( '/' );
	$referer = strtok( $referer, '#' );

	if ( ! isset( $_POST['lumyla_lead_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['lumyla_lead_nonce'] ) ), 'lumyla_lead' ) ) {
		wp_safe_redirect( add_query_arg( 'lead', 'error', $referer ) . '#consultation' );
		exit;
	}

	$honeypot = isset( $_POST['company'] ) ? sanitize_text_field( wp_unslash( $_POST['company'] ) ) : '';
	if ( '' !== $honeypot ) {
		// Bots get the same success page and never create a record.
		wp_safe_redirect( add_query_arg( 'sent', '1', $referer ) . '#consultation' );
		exit;
	}

	$full_name = isset( $_POST['fullName'] ) ? sanitize_text_field( wp_unslash( $_POST['fullName'] ) ) : '';
	$phone_raw = isset( $_POST['phone'] ) ? sanitize_text_field( wp_unslash( $_POST['phone'] ) ) : '';
	$website   = isset( $_POST['website'] ) ? esc_url_raw( wp_unslash( $_POST['website'] ) ) : '';
	$service   = isset( $_POST['service'] ) ? sanitize_key( wp_unslash( $_POST['service'] ) ) : '';
	$package   = isset( $_POST['packageKey'] ) ? sanitize_key( wp_unslash( $_POST['packageKey'] ) ) : '';
	$message   = isset( $_POST['message'] ) ? sanitize_textarea_field( wp_unslash( $_POST['message'] ) ) : '';
	$phone     = lumyla_normalize_phone( $phone_raw );

	if ( mb_strlen( $full_name ) < 3 || ! $phone || ! $service || mb_strlen( $message ) > 2000 ) {
		wp_safe_redirect( add_query_arg( 'lead', 'invalid', $referer ) . '#consultation' );
		exit;
	}

	$services = array();
	$packages = array();
	foreach ( lumyla_data( 'consultationServices' ) as $item ) {
		$services[ $item['value'] ] = $item['label'];
	}
	foreach ( lumyla_data( 'consultationPackages' ) as $item ) {
		$packages[ $item['value'] ] = $item['label'];
	}

	$lead_id = wp_insert_post(
		array(
			'post_type'   => 'lumyla_lead',
			'post_status' => 'publish',
			'post_title'  => $full_name . ' — ' . $phone,
		),
		true
	);

	if ( is_wp_error( $lead_id ) ) {
		wp_safe_redirect( add_query_arg( 'lead', 'error', $referer ) . '#consultation' );
		exit;
	}

	$fields = array(
		'fullName'   => $full_name,
		'phone'      => $phone,
		'website'    => $website,
		'service'    => isset( $services[ $service ] ) ? $services[ $service ] : $service,
		'packageKey' => isset( $packages[ $package ] ) ? $packages[ $package ] : $package,
		'message'    => $message,
	);

	foreach ( $fields as $key => $value ) {
		update_post_meta( $lead_id, 'lumyla_' . $key, $value );
	}

	$lines = array(
		'نام: ' . $full_name,
		'موبایل: ' . $phone,
		'وب‌سایت: ' . ( $website ? $website : '—' ),
		'خدمت: ' . $fields['service'],
		'پکیج: ' . ( $fields['packageKey'] ? $fields['packageKey'] : '—' ),
		'',
		'توضیحات:',
		$message ? $message : '—',
	);

	wp_mail(
		get_option( 'admin_email' ),
		sprintf( 'درخواست مشاوره جدید — %s', $full_name ),
		implode( "\n", $lines )
	);

	wp_safe_redirect( add_query_arg( 'sent', '1', $referer ) . '#consultation' );
	exit;
}
add_action( 'admin_post_lumyla_lead', 'lumyla_handle_lead' );
add_action( 'admin_post_nopriv_lumyla_lead', 'lumyla_handle_lead' );

/**
 * Renders the consultation form, or the success panel after a submission.
 *
 * @return void
 */
function lumyla_consultation_form() {
	$sent = isset( $_GET['sent'] ) && '1' === sanitize_text_field( wp_unslash( $_GET['sent'] ) );
	$lead = isset( $_GET['lead'] ) ? sanitize_key( wp_unslash( $_GET['lead'] ) ) : '';

	if ( $sent ) {
		?>
		<div class="form-success" role="status" aria-live="polite">
			<span class="form-success__mark"><?php lumyla_the_icon( 'checkCircle', 26 ); ?></span>
			<h3>درخواست مشاوره شما ثبت شد</h3>
			<p style="color:var(--text-2);font-size:var(--fs-sm);line-height:1.9">
				در اولین فرصت برای بررسی نیازهای کسب‌وکارتان با شما تماس می‌گیریم. اگر موضوع فوری دارید،
				می‌توانید از تلگرام هم پیام دهید.
			</p>
			<a class="btn btn--ghost btn--sm" href="<?php echo esc_url( lumyla_url( 'contact' ) ); ?>#consultation">ثبت درخواست دیگر</a>
		</div>
		<?php
		return;
	}

	$service_param = isset( $_GET['service'] ) ? sanitize_key( wp_unslash( $_GET['service'] ) ) : '';
	$package_param = isset( $_GET['package'] ) ? sanitize_key( wp_unslash( $_GET['package'] ) ) : '';

	$services = lumyla_data( 'consultationServices' );
	$packages = lumyla_data( 'consultationPackages' );

	$service_labels = array();
	foreach ( $services as $item ) {
		$service_labels[ $item['value'] ] = $item['label'];
	}
	$package_labels = array();
	foreach ( $packages as $item ) {
		$package_labels[ $item['value'] ] = $item['label'];
	}

	$intent = '';
	if ( $service_param && isset( $service_labels[ $service_param ] ) ) {
		$intent = $service_labels[ $service_param ];
		if ( 'seo' === $service_param && $package_param && isset( $package_labels[ $package_param ] ) ) {
			$intent .= ' — پکیج ' . $package_labels[ $package_param ];
		}
	}
	?>
	<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" data-consult-form>
		<input type="hidden" name="action" value="lumyla_lead">
		<?php wp_nonce_field( 'lumyla_lead', 'lumyla_lead_nonce' ); ?>

		<?php if ( $intent ) : ?>
			<p class="contact__intent">
				<?php lumyla_the_icon( 'sparkles' ); ?>
				درخواست شما برای <strong style="font-weight:600"><?php echo esc_html( $intent ); ?></strong> ثبت خواهد شد.
			</p>
		<?php endif; ?>

		<?php if ( 'invalid' === $lead || 'error' === $lead ) : ?>
			<p class="field__error" role="alert">
				<?php echo 'invalid' === $lead ? 'لطفاً نام، شماره موبایل و نوع خدمت را کامل و صحیح وارد کنید.' : 'ثبت درخواست انجام نشد. لطفاً دوباره تلاش کنید.'; ?>
			</p>
		<?php endif; ?>

		<div class="form-grid">
			<div class="field">
				<label class="field__label" for="fullName">نام و نام خانوادگی <span class="req">*</span></label>
				<input id="fullName" name="fullName" type="text" autocomplete="name" placeholder="مثلاً سارا احمدی" required minlength="3">
			</div>

			<div class="field">
				<label class="field__label" for="phone">شماره تماس <span class="req">*</span></label>
				<input id="phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="۰۹۱۲۳۴۵۶۷۸۹" required>
				<p class="field__hint">شماره موبایل خود را وارد کنید تا برای هماهنگی با شما تماس بگیریم.</p>
			</div>

			<div class="field">
				<label class="field__label" for="website">آدرس وب‌سایت</label>
				<input id="website" name="website" type="url" autocomplete="url" placeholder="https://example.com">
				<p class="field__hint">در صورت نداشتن سایت، این فیلد را خالی بگذارید.</p>
			</div>

			<div class="field">
				<label class="field__label" for="service">نوع خدمت <span class="req">*</span></label>
				<select id="service" name="service" required data-consult-service>
					<option value="">انتخاب کنید…</option>
					<?php foreach ( $services as $item ) : ?>
						<option value="<?php echo esc_attr( $item['value'] ); ?>" <?php selected( $service_param, $item['value'] ); ?>><?php echo esc_html( $item['label'] ); ?></option>
					<?php endforeach; ?>
				</select>
			</div>

			<div class="field" data-consult-package <?php echo 'seo' === $service_param ? '' : 'style="display:none"'; ?>>
				<label class="field__label" for="packageKey">پکیج سئو</label>
				<select id="packageKey" name="packageKey">
					<option value="">انتخاب پکیج…</option>
					<?php foreach ( $packages as $item ) : ?>
						<option value="<?php echo esc_attr( $item['value'] ); ?>" <?php selected( $package_param, $item['value'] ); ?>><?php echo esc_html( $item['label'] ); ?></option>
					<?php endforeach; ?>
				</select>
			</div>

			<div class="field field--full">
				<label class="field__label" for="message">توضیحات</label>
				<textarea id="message" name="message" rows="4" maxlength="2000" placeholder="درباره کسب‌وکار، اهداف و نیاز خود بنویسید…"></textarea>
			</div>

			<div style="display:none" aria-hidden="true">
				<label for="company">شرکت</label>
				<input id="company" name="company" type="text" tabindex="-1" autocomplete="off">
			</div>
		</div>

		<div class="btn-group" style="margin-top:1.25rem">
			<button type="submit" class="btn btn--primary">
				ارسال درخواست مشاوره
				<?php lumyla_the_icon( 'arrow', 18, 1.5, 'icon-arrow' ); ?>
			</button>
		</div>
	</form>
	<?php
}
