<?php
/**
 * Template Name: تماس و مشاوره
 * Template Post Type: page
 *
 * @package Lumyla
 */

get_header();

lumyla_page_hero(
	array(
		'eyebrow'    => 'CONTACT',
		'title'      => 'برای شروع یک همکاری حرفه‌ای آماده‌اید؟',
		'lead'       => 'فرم زیر را تکمیل کنید تا در اولین فرصت برای بررسی نیازهای کسب‌وکار و ارائه مشاوره با شما تماس بگیریم.',
		'breadcrumb' => array( array( 'label' => 'تماس با ما' ) ),
	)
);

lumyla_contact_section();
lumyla_faq_section();

get_footer();
