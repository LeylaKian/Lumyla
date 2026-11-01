<?php
/**
 * 404.
 *
 * @package Lumyla
 */

get_header();

lumyla_page_hero(
	array(
		'eyebrow'    => '۴۰۴',
		'title'      => 'این صفحه پیدا نشد',
		'lead'       => 'ممکن است نشانی را اشتباه وارد کرده باشید یا این صفحه جابه‌جا شده باشد.',
		'breadcrumb' => array( array( 'label' => 'صفحه یافت نشد' ) ),
		'actions'    => lumyla_button(
			array(
				'label'   => 'بازگشت به صفحه اصلی',
				'href'    => home_url( '/' ),
				'variant' => 'primary',
			)
		) . lumyla_button(
			array(
				'label'   => 'مشاهده خدمات',
				'href'    => lumyla_url( 'services' ),
				'variant' => 'ghost',
				'icon'    => false,
			)
		),
	)
);

lumyla_final_cta();

get_footer();
