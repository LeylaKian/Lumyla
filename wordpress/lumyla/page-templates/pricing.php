<?php
/**
 * Template Name: تعرفه خدمات سئو
 * Template Post Type: page
 *
 * @package Lumyla
 */

get_header();

lumyla_page_hero(
	array(
		'eyebrow'    => 'PRICING',
		'title'      => 'تعرفه خدمات سئو لومیلا',
		'lead'       => 'پکیج‌های متناسب با اهداف، میزان رقابت و مرحله رشد کسب‌وکار شما. همه پکیج‌ها پیش از شروع با یک جلسه مشاوره نهایی می‌شوند.',
		'breadcrumb' => array( array( 'label' => 'تعرفه سئو' ) ),
		'actions'    => lumyla_button(
			array(
				'label'   => 'دریافت مشاوره تعرفه',
				'href'    => lumyla_consult_url( 'seo' ),
				'variant' => 'primary',
			)
		),
	)
);

lumyla_pricing_section(
	array(
		'eyebrow' => 'چهار پکیج',
		'title'   => 'پکیج‌های ماهانه سئو',
		'lead'    => 'مقایسه خدمات هر پکیج در یک نگاه؛ عدد نهایی قرارداد پس از بررسی سایت و رقابت حوزه مشخص می‌شود.',
		'id'      => 'pricing-page-title',
	)
);

$lumyla_points = array(
	array(
		'title' => 'ماهانه، بدون هزینه پنهان',
		'desc'  => 'تمام پکیج‌ها ماهانه محاسبه می‌شوند. هزینه رپورتاژ و هزینه‌های رسانه‌ای خارج از تعرفه خدمات سئو محاسبه می‌شود.',
	),
	array(
		'title' => 'حداقل بازه همکاری',
		'desc'  => 'برای دیدن نتیجه واقعی، هر پکیج یک حداقل بازه همکاری دارد؛ این بازه در کارت هر پکیج مشخص شده است.',
	),
	array(
		'title' => 'قیمت نهایی با بررسی',
		'desc'  => 'مبلغ نهایی قرارداد با توجه به محدوده پروژه، رقابت حوزه و وضعیت فعلی سایت، پس از بررسی و در جلسه مشاوره اعلام می‌شود.',
	),
);
?>

<section class="section" aria-labelledby="pricing-detail-title">
	<div class="container container-wide">
		<div <?php echo lumyla_reveal_attrs(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
			<?php
			lumyla_section_heading(
				array(
					'eyebrow' => 'شرایط همکاری',
					'title'   => 'قبل از انتخاب پکیج، این سه نکته را بدانید',
					'lead'    => 'شفافیت در شرایط، بخشی از همکاری حرفه‌ای است.',
					'id'      => 'pricing-detail-title',
				)
			);
			?>
		</div>
		<div class="card-grid">
			<?php foreach ( $lumyla_points as $index => $point ) : ?>
				<div <?php echo lumyla_reveal_attrs( 60 * $index ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
					<?php lumyla_info_card( $index, $point['title'], $point['desc'] ); ?>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php
lumyla_faq_section();
lumyla_final_cta();

get_footer();
