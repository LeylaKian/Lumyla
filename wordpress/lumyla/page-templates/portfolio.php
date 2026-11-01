<?php
/**
 * Template Name: نمونه‌کارها
 * Template Post Type: page
 *
 * @package Lumyla
 */

get_header();

lumyla_page_hero(
	array(
		'eyebrow'    => 'PORTFOLIO',
		'title'      => 'نمونه‌کارهای لومیلا',
		'lead'       => 'هر پروژه یک مسئله متفاوت است. این بخش، منطق طراحی و ساختار اجرا را نشان می‌دهد — نه ادعای نتیجه‌ای که قابل اثبات نیست.',
		'breadcrumb' => array( array( 'label' => 'نمونه‌کارها' ) ),
	)
);

lumyla_portfolio_section( array( 'showFilters' => true ) );
lumyla_final_cta();

get_footer();
