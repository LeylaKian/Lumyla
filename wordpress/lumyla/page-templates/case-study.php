<?php
/**
 * Template Name: جزئیات نمونه‌کار
 * Template Post Type: page
 *
 * @package Lumyla
 */

get_header();

$lumyla_slug = get_post_meta( get_the_ID(), 'lumyla_project_slug', true );
if ( ! $lumyla_slug ) {
	$lumyla_slug = get_post_field( 'post_name', get_the_ID() );
}

$lumyla_project = $lumyla_slug ? lumyla_project( $lumyla_slug ) : null;

if ( ! $lumyla_project ) :
	lumyla_page_hero(
		array(
			'eyebrow'    => 'نمونه‌کار',
			'title'      => 'این نمونه‌کار پیدا نشد',
			'lead'       => 'ممکن است این صفحه جابه‌جا شده یا هنوز منتشر نشده باشد.',
			'breadcrumb' => array(
				array(
					'label' => 'نمونه‌کارها',
					'to'    => lumyla_url( 'portfolio' ),
				),
				array( 'label' => 'یافت نشد' ),
			),
			'actions'    => lumyla_button(
				array(
					'label'   => 'بازگشت به نمونه‌کارها',
					'href'    => lumyla_url( 'portfolio' ),
					'variant' => 'ghost',
					'icon'    => false,
				)
			),
		)
	);
	lumyla_final_cta();
	get_footer();
	return;
endif;

$lumyla_related = array();
foreach ( lumyla_projects() as $lumyla_item ) {
	if ( $lumyla_item['slug'] !== $lumyla_project['slug'] && count( $lumyla_related ) < 2 ) {
		$lumyla_related[] = $lumyla_item;
	}
}

lumyla_page_hero(
	array(
		'eyebrow'    => $lumyla_project['categoryLabel'],
		'title'      => $lumyla_project['title'],
		'lead'       => $lumyla_project['summary'],
		'breadcrumb' => array(
			array(
				'label' => 'نمونه‌کارها',
				'to'    => lumyla_url( 'portfolio' ),
			),
			array( 'label' => $lumyla_project['categoryLabel'] ),
		),
	)
);
?>

<section class="section" aria-label="جزئیات نمونه‌کار">
	<div class="container container-wide">
		<div <?php echo lumyla_reveal_attrs(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
			<div class="portfolio-card" style="padding:0;overflow:hidden;display:block">
				<div class="portfolio-card__visual" style="aspect-ratio:21 / 9">
					<?php lumyla_visual( $lumyla_project['art']['variant'], $lumyla_project['art']['tone'], $lumyla_project['art']['label'] ); ?>
				</div>
			</div>
		</div>

		<div class="case-meta">
			<div>
				<span class="pricing-card__block-label">دسته‌بندی</span>
				<p><?php echo esc_html( $lumyla_project['categoryLabel'] ); ?></p>
			</div>
			<div>
				<span class="pricing-card__block-label">خدمات ارائه‌شده</span>
				<div class="pill-row" style="margin-top:.4rem">
					<?php foreach ( $lumyla_project['services'] as $lumyla_service ) : ?>
						<span class="badge"><?php echo esc_html( $lumyla_service ); ?></span>
					<?php endforeach; ?>
				</div>
			</div>
			<div>
				<span class="pricing-card__block-label">وضعیت</span>
				<p style="display:flex;align-items:center;gap:.4rem">
					<?php lumyla_the_icon( 'sparkles', 15 ); ?>
					<?php echo ! empty( $lumyla_project['demo'] ) ? 'نمونه نمایشی' : 'پروژه واقعی'; ?>
				</p>
			</div>
		</div>

		<div class="case-body">
			<div <?php echo lumyla_reveal_attrs( 0, 'prose' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
				<h2>درباره این نمونه</h2>
				<p><?php echo esc_html( $lumyla_project['summary'] ); ?></p>
				<p>
					رویکرد لومیلا در این نوع پروژه‌ها بر سه محور استوار است: شناخت وضعیت فعلی و
					محدودیت‌ها، تعریف خروجی‌های قابل اندازه‌گیری، و اجرای مرحله‌به‌مرحله با بازبینی
					منظم. در هر مرحله، تصمیم‌ها بر اساس داده و بازخورد واقعی اصلاح می‌شوند.
				</p>
				<h2>دامنه خدمات</h2>
				<ul>
					<?php foreach ( $lumyla_project['services'] as $lumyla_service ) : ?>
						<li><?php echo esc_html( $lumyla_service ); ?></li>
					<?php endforeach; ?>
				</ul>
				<?php if ( ! empty( $lumyla_project['demo'] ) ) : ?>
					<blockquote>
						این صفحه یک نمونه نمایشی است؛ برای نمایش ساختار صفحه جزئیات نمونه‌کار طراحی شده
						و هیچ نتیجه یا آمار واقعی به پروژه‌ای نسبت داده نشده است. با ثبت پروژه‌های واقعی،
						همین قالب با محتوای شما جایگزین می‌شود.
					</blockquote>
				<?php endif; ?>
				<p>
					اگر پروژه‌ای مشابه در ذهن دارید، می‌توانید درباره محدوده، اهداف و زمان‌بندی آن با ما
					صحبت کنید.
				</p>
				<div class="btn-group" style="margin-top:1.5rem">
					<?php
					lumyla_consult_button(
						array(
							'label'   => 'گفتگو درباره پروژه من',
							'service' => 'general',
							'variant' => 'primary',
						)
					);
					echo lumyla_button( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
						array(
							'label'   => 'همه نمونه‌کارها',
							'href'    => lumyla_url( 'portfolio' ),
							'variant' => 'ghost',
							'icon'    => false,
						)
					);
					?>
				</div>
			</div>

			<aside class="article__aside" aria-label="نمونه‌کارهای مرتبط">
				<h3>نمونه‌کارهای دیگر</h3>
				<ul>
					<?php foreach ( $lumyla_related as $lumyla_item ) : ?>
						<li><a href="<?php echo esc_url( lumyla_url( 'portfolio/' . $lumyla_item['slug'] ) ); ?>"><?php echo esc_html( $lumyla_item['title'] ); ?></a></li>
					<?php endforeach; ?>
				</ul>
			</aside>
		</div>
	</div>
</section>

<section class="section section--inset" aria-label="نمونه‌کارهای مرتبط">
	<div class="container container-wide">
		<div class="portfolio__grid">
			<?php foreach ( $lumyla_related as $lumyla_item ) : ?>
				<?php lumyla_portfolio_card( $lumyla_item ); ?>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php
lumyla_final_cta();

get_footer();
