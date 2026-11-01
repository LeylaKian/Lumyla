<?php
/**
 * Template Name: خدمات تخصصی سئو
 * Template Post Type: page
 *
 * @package Lumyla
 */

get_header();

lumyla_page_hero(
	array(
		'eyebrow'    => 'SEO',
		'title'      => 'خدمات تخصصی سئو',
		'lead'       => 'از تحقیق کلمات کلیدی و تدوین استراتژی تا بهینه‌سازی فنی، تولید محتوا و تحلیل عملکرد، برای افزایش دیده‌شدن هدفمند سایت شما برنامه‌ریزی می‌کنیم.',
		'breadcrumb' => array(
			array(
				'label' => 'خدمات',
				'to'    => lumyla_url( 'services' ),
			),
			array( 'label' => 'خدمات سئو' ),
		),
		'actions'    => lumyla_button(
			array(
				'label'   => 'دریافت مشاوره سئو',
				'href'    => lumyla_consult_url( 'seo' ),
				'variant' => 'primary',
			)
		) . lumyla_button(
			array(
				'label'   => 'تعرفه خدمات سئو',
				'href'    => lumyla_url( 'pricing' ),
				'variant' => 'ghost',
				'icon'    => false,
			)
		),
	)
);
?>

<section class="section" aria-labelledby="seo-work-title">
	<div class="container container-wide">
		<div <?php echo lumyla_reveal_attrs(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
			<?php
			lumyla_section_heading(
				array(
					'eyebrow' => 'روش کار',
					'title'   => 'سئو به‌عنوان یک فرایند، نه چند اقدام پراکنده',
					'lead'    => 'هر مرحله خروجی مشخصی دارد و پیش از رفتن به مرحله بعد بررسی می‌شود؛ این‌گونه تلاش‌ها در مسیر اهداف تجاری شما قرار می‌گیرند.',
					'id'      => 'seo-work-title',
				)
			);
			?>
		</div>

		<div class="card-grid card-grid--two">
			<?php foreach ( lumyla_data( 'seoScope' ) as $index => $item ) : ?>
				<div <?php echo lumyla_reveal_attrs( 60 * $index ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
					<article class="card card--hover info-card">
						<div style="display:flex;align-items:center;gap:.75rem">
							<span class="why__num num"><?php echo esc_html( '۰' . lumyla_fa_number( $index + 1 ) ); ?></span>
							<h3 style="font-size:var(--fs-h4)"><?php echo esc_html( $item['title'] ); ?></h3>
						</div>
						<p><?php echo esc_html( $item['desc'] ); ?></p>
						<ul class="service-card__list">
							<?php foreach ( $item['items'] as $entry ) : ?>
								<li><?php echo esc_html( $entry ); ?></li>
							<?php endforeach; ?>
						</ul>
					</article>
				</div>
			<?php endforeach; ?>
		</div>

		<?php
		lumyla_cta_band(
			array(
				'title' => 'سئو با تضمین رتبه سنجیده نمی‌شود',
				'desc'  => 'نتایج سئو به عوامل متعددی وابسته است و رتبه مشخص در گوگل تضمین نمی‌شود؛ اما مسیر اجرا، گزارش و شاخص‌های پیشرفت شفاف و قابل پیگیری است.',
				'link'  => '<a class="btn btn--ghost" href="' . esc_url( lumyla_url( 'pricing' ) ) . '">مقایسه پکیج‌ها' . lumyla_icon( 'arrow', 18, 1.5, 'icon-arrow' ) . '</a>',
			)
		);
		?>
	</div>
</section>

<?php
lumyla_pricing_section( array( 'eyebrow' => 'تعرفه سئو' ) );
lumyla_process_section();
lumyla_faq_section();
lumyla_final_cta();

get_footer();
