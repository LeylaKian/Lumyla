<?php
/**
 * Template Name: طراحی سایت
 * Template Post Type: page
 *
 * @package Lumyla
 */

get_header();

lumyla_page_hero(
	array(
		'eyebrow'    => 'WEB DESIGN',
		'title'      => 'طراحی سایت، متناسب با هویت و آینده کسب‌وکار شما',
		'lead'       => 'سه مسیر متفاوت برای سه نیاز متفاوت؛ انتخاب مسیر درست، از یک جلسه مشاوره آغاز می‌شود.',
		'breadcrumb' => array(
			array(
				'label' => 'خدمات',
				'to'    => lumyla_url( 'services' ),
			),
			array( 'label' => 'طراحی سایت' ),
		),
		'actions'    => lumyla_button(
			array(
				'label'   => 'درخواست مشاوره طراحی',
				'href'    => lumyla_consult_url( 'website-template' ),
				'variant' => 'primary',
			)
		),
	)
);

lumyla_website_design_section();

$lumyla_factors = array(
	array(
		'title' => 'محدوده پروژه',
		'desc'  => 'تعداد صفحات، ساختار محتوایی و میزان طراحی اختصاصی، مهم‌ترین عامل در تعیین هزینه است.',
	),
	array(
		'title' => 'پیچیدگی طراحی',
		'desc'  => 'طراحی بصری سفارشی، تعامل‌های ویژه و المان‌های سه‌بعدی، زمان و دقت بیشتری می‌خواهند.',
	),
	array(
		'title' => 'امکانات و توسعه',
		'desc'  => 'فروشگاه، پنل کاربری، فرم‌های خاص یا اتصال به سرویس‌های دیگر، دامنه کار را مشخص می‌کنند.',
	),
);
?>

<section class="section section--inset" aria-labelledby="cost-title">
	<div class="container container-wide">
		<div <?php echo lumyla_reveal_attrs(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
			<?php
			lumyla_section_heading(
				array(
					'eyebrow' => 'هزینه',
					'title'   => 'هزینه طراحی سایت چگونه مشخص می‌شود؟',
					'lead'    => 'هیچ قیمت ثابتی روی سایت اعلام نمی‌کنیم، چون هر پروژه محدوده و نیازهای خودش را دارد. سه عامل اصلی تعیین‌کننده هزینه را بشناسید.',
					'id'      => 'cost-title',
				)
			);
			?>
		</div>
		<div class="card-grid">
			<?php foreach ( $lumyla_factors as $index => $factor ) : ?>
				<div <?php echo lumyla_reveal_attrs( 60 * $index ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
					<?php lumyla_info_card( $index, $factor['title'], $factor['desc'], array(), false ); ?>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php
lumyla_process_section();
lumyla_final_cta();

get_footer();
