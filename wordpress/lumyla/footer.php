<?php
/**
 * Site footer.
 *
 * @package Lumyla
 */

$lumyla_latest = lumyla_journal_posts( 3 );
$lumyla_year   = date_i18n( 'Y' );
?>
</main>

<footer class="site-footer">
	<div class="container container-wide">
		<div class="site-footer__grid">
			<div class="site-footer__brand">
				<a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="لومیلا — صفحه اصلی">
					<img src="<?php echo esc_url( LUMYLA_URI . '/assets/brand/lumyla-logo.png' ); ?>" alt="" class="brand__mark" width="48" height="48" loading="lazy" decoding="async">
					<span class="brand__text" aria-hidden="true">
						<span class="brand__name">LUMYLA</span>
						<span class="brand__sub">CREATIVE DIGITAL STUDIO</span>
					</span>
				</a>
				<p class="site-footer__about">
					لومیلا یک استودیوی خلاق دیجیتال است؛ جایی که استراتژی، طراحی و بهینه‌سازی در کنار هم
					قرار می‌گیرند تا کسب‌وکار شما در فضای آنلاین حرفه‌ای‌تر دیده شود.
				</p>
				<div class="btn-group">
					<?php
					lumyla_consult_button(
						array(
							'label'   => 'دریافت مشاوره',
							'service' => 'general',
							'variant' => 'gold',
							'size'    => 'sm',
						)
					);
					?>
				</div>
			</div>

			<div>
				<p class="site-footer__col-title">صفحه‌های سایت</p>
				<ul class="site-footer__links">
					<?php foreach ( lumyla_data( 'navigation' ) as $lumyla_nav ) : ?>
						<li><a href="<?php echo esc_url( lumyla_url( $lumyla_nav['to'] ) ); ?>"><?php echo esc_html( $lumyla_nav['label'] ); ?></a></li>
					<?php endforeach; ?>
				</ul>
			</div>

			<div>
				<p class="site-footer__col-title">خدمات</p>
				<ul class="site-footer__links">
					<?php foreach ( lumyla_data( 'serviceLinks' ) as $lumyla_service ) : ?>
						<li><a href="<?php echo esc_url( lumyla_url( $lumyla_service['to'] ) ); ?>"><?php echo esc_html( $lumyla_service['label'] ); ?></a></li>
					<?php endforeach; ?>
				</ul>
			</div>

			<div>
				<p class="site-footer__col-title">از مجله لومیلا</p>
				<ul class="site-footer__links">
					<?php if ( $lumyla_latest ) : ?>
						<?php foreach ( $lumyla_latest as $lumyla_post ) : ?>
							<li><a href="<?php echo esc_url( $lumyla_post['permalink'] ); ?>"><?php echo esc_html( $lumyla_post['title'] ); ?></a></li>
						<?php endforeach; ?>
					<?php else : ?>
						<li><a href="<?php echo esc_url( lumyla_url( 'blog' ) ); ?>">مجله لومیلا</a></li>
					<?php endif; ?>
				</ul>
			</div>
		</div>

		<div style="margin-top:clamp(2rem,4vw,3.5rem)">
			<div class="site-footer__cta">
				<p class="eyebrow eyebrow--fa">شروع همکاری</p>
				<p style="color:var(--text);font-weight:600">برای بررسی نیاز کسب‌وکارتان با ما در ارتباط باشید.</p>
				<div class="btn-group">
					<?php
					lumyla_consult_button(
						array(
							'label'   => 'فرم درخواست مشاوره',
							'service' => 'general',
							'size'    => 'sm',
						)
					);
					lumyla_telegram_button( array( 'size' => 'sm' ) );
					?>
				</div>
				<?php if ( lumyla_site( 'email' ) || lumyla_site( 'phone' ) ) : ?>
					<div class="meta-row" style="margin-top:.25rem">
						<?php if ( lumyla_site( 'email' ) ) : ?>
							<a href="mailto:<?php echo esc_attr( lumyla_site( 'email' ) ); ?>" class="meta-row">
								<?php lumyla_the_icon( 'mail', 15 ); ?>
								<?php echo esc_html( lumyla_site( 'email' ) ); ?>
							</a>
						<?php endif; ?>
						<?php if ( lumyla_site( 'phone' ) ) : ?>
							<a href="tel:<?php echo esc_attr( preg_replace( '/\s/', '', lumyla_site( 'phone' ) ) ); ?>" class="meta-row">
								<?php lumyla_the_icon( 'phone', 15 ); ?>
								<?php echo esc_html( lumyla_site( 'phone' ) ); ?>
							</a>
						<?php endif; ?>
					</div>
				<?php endif; ?>
			</div>
		</div>

		<div class="site-footer__bottom">
			<p>© <?php echo esc_html( $lumyla_year ); ?> LUMYLA | تمامی حقوق محفوظ است.</p>
			<p>طراحی و توسعه در استودیو خلاق دیجیتال لومیلا</p>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
