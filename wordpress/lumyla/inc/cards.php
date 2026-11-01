<?php
/**
 * Card components: service, pricing, portfolio, journal and info cards.
 *
 * @package Lumyla
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Service card.
 *
 * @param array $service Service definition from data.json.
 * @return void
 */
function lumyla_service_card( $service ) {
	$is_soon = isset( $service['status'] ) && 'soon' === $service['status'];
	$cta     = isset( $service['cta'] ) ? $service['cta'] : array();
	$intent  = isset( $cta['intent'] ) ? $cta['intent'] : array();
	?>
	<article class="card card--hover service-card">
		<span class="service-card__icon"><?php lumyla_the_icon( isset( $service['icon'] ) ? $service['icon'] : 'spark' ); ?></span>

		<div style="display:flex;align-items:center;gap:.6rem;flex-wrap:wrap">
			<p class="eyebrow"><?php echo esc_html( $service['kicker'] ); ?></p>
			<?php if ( $is_soon ) : ?>
				<span class="badge badge--muted">به‌زودی</span>
			<?php endif; ?>
		</div>

		<h3 class="service-card__title"><?php echo esc_html( $service['title'] ); ?></h3>
		<p class="service-card__desc"><?php echo esc_html( $service['desc'] ); ?></p>

		<?php if ( ! empty( $service['features'] ) ) : ?>
			<ul class="service-card__list">
				<?php foreach ( array_slice( $service['features'], 0, 4 ) as $feature ) : ?>
					<li><?php echo esc_html( $feature ); ?></li>
				<?php endforeach; ?>
				<?php if ( count( $service['features'] ) > 4 ) : ?>
					<li class="muted"><?php printf( 'و %s مورد دیگر', esc_html( lumyla_fa_number( count( $service['features'] ) - 4 ) ) ); ?></li>
				<?php endif; ?>
			</ul>
		<?php endif; ?>

		<div class="service-card__foot">
			<?php if ( $is_soon ) : ?>
				<span class="badge badge--muted">این خدمت در حال آماده‌سازی است</span>
			<?php elseif ( ! empty( $cta['to'] ) ) : ?>
				<a class="btn btn--quiet" href="<?php echo esc_url( lumyla_url( $cta['to'] ) ); ?>">
					<?php echo esc_html( $cta['label'] ); ?>
					<?php lumyla_the_icon( 'arrow', 15 ); ?>
				</a>
			<?php else : ?>
				<a class="btn btn--quiet" href="<?php echo esc_url( lumyla_consult_url( isset( $intent['service'] ) ? $intent['service'] : 'general', isset( $intent['package'] ) ? $intent['package'] : '' ) ); ?>">
					<?php echo esc_html( isset( $cta['label'] ) ? $cta['label'] : '' ); ?>
					<?php lumyla_the_icon( 'arrow', 15 ); ?>
				</a>
			<?php endif; ?>
		</div>
	</article>
	<?php
}

/**
 * Pricing package card.
 *
 * @param array $pkg Package definition from data.json.
 * @return void
 */
function lumyla_pricing_card( $pkg ) {
	$is_custom = isset( $pkg['key'] ) && 'custom' === $pkg['key'];
	$featured  = ! empty( $pkg['featured'] );
	?>
	<article class="card pricing-card <?php echo $featured ? 'pricing-card--featured' : ''; ?>" aria-labelledby="package-<?php echo esc_attr( $pkg['key'] ); ?>">
		<div class="pricing-card__head">
			<h3 class="pricing-card__name" id="package-<?php echo esc_attr( $pkg['key'] ); ?>"><?php echo esc_html( $pkg['name'] ); ?></h3>
			<span class="eyebrow" style="font-size:.62rem;letter-spacing:.18em"><?php echo esc_html( $pkg['nameEn'] ); ?></span>
		</div>

		<div class="pricing-card__price">
			<span class="pricing-card__amount num"><?php echo esc_html( $pkg['price'] ); ?></span>
			<?php if ( ! empty( $pkg['cycle'] ) ) : ?>
				<span class="pricing-card__cycle"><?php echo esc_html( $pkg['cycle'] ); ?></span>
			<?php endif; ?>
		</div>

		<?php if ( ! empty( $pkg['contract'] ) ) : ?>
			<span class="pricing-card__contract">
				<?php lumyla_the_icon( 'clock', 14 ); ?>
				حداقل قرارداد: <?php echo esc_html( $pkg['contract'] ); ?>
			</span>
		<?php endif; ?>

		<?php if ( ! empty( $pkg['summary'] ) ) : ?>
			<p style="color:var(--text-3);font-size:var(--fs-sm);line-height:1.85"><?php echo esc_html( $pkg['summary'] ); ?></p>
		<?php endif; ?>

		<?php if ( ! empty( $pkg['fits'] ) ) : ?>
			<div style="display:grid;gap:.5rem">
				<span class="pricing-card__block-label">مناسب برای</span>
				<div class="pricing-card__fits">
					<?php foreach ( $pkg['fits'] as $fit ) : ?>
						<span class="badge"><?php echo esc_html( $fit ); ?></span>
					<?php endforeach; ?>
				</div>
			</div>
		<?php endif; ?>

		<div style="display:grid;gap:.6rem">
			<span class="pricing-card__block-label"><?php echo $is_custom ? 'خدمات این پکیج' : 'خدمات پکیج'; ?></span>
			<ul class="pricing-card__features">
				<?php foreach ( $pkg['features'] as $feature ) : ?>
					<li><?php lumyla_the_icon( 'check', 15, 2 ); ?><span><?php echo esc_html( $feature ); ?></span></li>
				<?php endforeach; ?>
			</ul>
		</div>

		<div class="pricing-card__cta">
			<?php
			lumyla_consult_button(
				array(
					'label'   => isset( $pkg['cta'] ) ? $pkg['cta'] : 'درخواست مشاوره',
					'service' => 'seo',
					'package' => $pkg['key'],
					'variant' => $featured ? 'primary' : 'ghost',
					'block'   => true,
				)
			);
			?>
		</div>
	</article>
	<?php
}

/**
 * Portfolio card.
 *
 * @param array $project Project definition from data.json.
 * @param bool  $wide    Wide variant for the lead card.
 * @return void
 */
function lumyla_portfolio_card( $project, $wide = false ) {
	$art = isset( $project['art'] ) ? $project['art'] : array();
	?>
	<a class="portfolio-card <?php echo $wide ? 'portfolio-card--wide' : ''; ?>" href="<?php echo esc_url( lumyla_url( 'portfolio/' . $project['slug'] ) ); ?>" aria-label="<?php echo esc_attr( 'مشاهده جزئیات: ' . $project['title'] ); ?>">
		<div class="portfolio-card__visual">
			<?php lumyla_visual( $art['variant'], $art['tone'], $art['label'] ); ?>
			<?php if ( ! empty( $project['demo'] ) ) : ?>
				<span class="badge" style="position:absolute;inset-block-start:.85rem;inset-inline-start:.9rem;background:rgba(8,14,27,.7);backdrop-filter:blur(8px)">نمونه نمایشی</span>
			<?php endif; ?>
		</div>
		<div class="portfolio-card__body">
			<span class="portfolio-card__cat"><?php echo esc_html( $project['categoryLabel'] ); ?></span>
			<h3 class="portfolio-card__title"><?php echo esc_html( $project['title'] ); ?></h3>
			<p class="portfolio-card__desc"><?php echo esc_html( $project['summary'] ); ?></p>
			<span class="portfolio-card__more">
				مطالعه نمونه‌کار
				<?php lumyla_the_icon( 'arrow', 14 ); ?>
			</span>
		</div>
	</a>
	<?php
}

/**
 * Journal card.
 *
 * @param array $post     Post data (title, excerpt, categoryLabel, readingTime, art, permalink).
 * @param bool  $featured Featured layout on the blog section.
 * @return void
 */
function lumyla_post_card( $post, $featured = false ) {
	$art = isset( $post['art'] ) ? $post['art'] : array( 'variant' => 'orbit', 'tone' => 'gold', 'label' => '' );
	?>
	<a class="post-card <?php echo $featured ? 'post-card--featured' : ''; ?>" href="<?php echo esc_url( $post['permalink'] ); ?>" aria-label="<?php echo esc_attr( 'خواندن مقاله: ' . $post['title'] ); ?>">
		<div class="post-card__visual">
			<?php lumyla_visual( $art['variant'], $art['tone'], isset( $art['label'] ) ? $art['label'] : '' ); ?>
		</div>
		<div style="display:grid;gap:.7rem;align-content:start">
			<div class="post-card__meta">
				<span><?php echo esc_html( $post['categoryLabel'] ); ?></span>
				<span><?php echo esc_html( $post['readingTime'] ); ?> مطالعه</span>
				<?php if ( ! empty( $post['publishedAt'] ) ) : ?>
					<span><?php echo esc_html( $post['publishedAt'] ); ?></span>
				<?php endif; ?>
			</div>
			<h3 class="post-card__title"><?php echo esc_html( $post['title'] ); ?></h3>
			<p class="post-card__excerpt"><?php echo esc_html( $post['excerpt'] ); ?></p>
			<span class="portfolio-card__more">
				ادامه مطلب
				<?php lumyla_the_icon( 'arrow', 14 ); ?>
			</span>
		</div>
	</a>
	<?php
}

/**
 * Numbered info card used by the services, SEO and website design pages.
 *
 * @param int    $index Zero based index for the Persian step number.
 * @param string $title Card title.
 * @param string $desc  Card description.
 * @param array  $items Optional bullet list.
 * @param bool   $hover Hover lift.
 * @return void
 */
function lumyla_info_card( $index, $title, $desc, $items = array(), $hover = true ) {
	?>
	<article class="card <?php echo $hover ? 'card--hover' : ''; ?> info-card">
		<span class="why__num num"><?php echo esc_html( '۰' . lumyla_fa_number( $index + 1 ) ); ?></span>
		<h3><?php echo esc_html( $title ); ?></h3>
		<p><?php echo esc_html( $desc ); ?></p>
		<?php if ( $items ) : ?>
			<ul class="service-card__list">
				<?php foreach ( $items as $item ) : ?>
					<li><?php echo esc_html( $item ); ?></li>
				<?php endforeach; ?>
			</ul>
		<?php endif; ?>
	</article>
	<?php
}
