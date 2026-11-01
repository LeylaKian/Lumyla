<?php
/**
 * LUMYLA theme bootstrap.
 *
 * @package Lumyla
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'LUMYLA_VERSION', '1.0.0' );
define( 'LUMYLA_DIR', get_template_directory() );
define( 'LUMYLA_URI', get_template_directory_uri() );

require_once LUMYLA_DIR . '/inc/content.php';
require_once LUMYLA_DIR . '/inc/icons.php';
require_once LUMYLA_DIR . '/inc/visual.php';
require_once LUMYLA_DIR . '/inc/ui.php';
require_once LUMYLA_DIR . '/inc/cards.php';
require_once LUMYLA_DIR . '/inc/journal.php';
require_once LUMYLA_DIR . '/inc/sections.php';
require_once LUMYLA_DIR . '/inc/forms.php';
require_once LUMYLA_DIR . '/inc/importer.php';

/**
 * Theme supports and navigation locations.
 *
 * @return void
 */
function lumyla_setup() {
	load_theme_textdomain( 'lumyla', LUMYLA_DIR . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );
	add_theme_support(
		'html5',
		array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' )
	);

	register_nav_menus(
		array(
			'primary' => __( 'ناوبری اصلی', 'lumyla' ),
			'footer'  => __( 'ناوبری پاورقی', 'lumyla' ),
		)
	);

	// Journal cards read well at roughly 30 words.
	add_filter( 'excerpt_length', 'lumyla_excerpt_length', 999 );
}
add_action( 'after_setup_theme', 'lumyla_setup' );

/**
 * Excerpt length for theme previews.
 *
 * @return int
 */
function lumyla_excerpt_length() {
	return 32;
}

/**
 * Front-end assets, in cascade order: tokens → base → components → sections.
 *
 * @return void
 */
function lumyla_assets() {
	$handles = array( 'tokens', 'base', 'components', 'sections' );
	$deps    = array();

	foreach ( $handles as $handle ) {
		$deps = array( 'lumyla-' . $handle );
		wp_enqueue_style(
			'lumyla-' . $handle,
			LUMYLA_URI . '/assets/css/' . $handle . '.css',
			array_slice( $deps, 0, -1 ),
			LUMYLA_VERSION
		);
	}

	wp_enqueue_style( 'lumyla-style', get_stylesheet_uri(), array( 'lumyla-sections' ), LUMYLA_VERSION );

	wp_enqueue_script( 'lumyla-theme', LUMYLA_URI . '/assets/js/theme.js', array(), LUMYLA_VERSION, true );
	wp_localize_script(
		'lumyla-theme',
		'LUMYLA',
		array(
			'home'  => home_url( '/' ),
			'blog'  => get_permalink( get_option( 'page_for_posts' ) ) ? get_permalink( get_option( 'page_for_posts' ) ) : home_url( '/blog/' ),
			'isRtl' => is_rtl(),
		)
	);
}
add_action( 'wp_enqueue_scripts', 'lumyla_assets' );

/**
 * Preloads the hero video metadata early — the scrub interaction depends on it.
 *
 * @return void
 */
function lumyla_preload_assets() {
	if ( ! is_front_page() && ! is_page_template( 'page-templates/home.php' ) ) {
		return;
	}
	echo '<link rel="preload" as="video" href="' . esc_url( LUMYLA_URI . '/assets/media/hero-scrub-1600.mp4' ) . '" type="video/mp4">' . "\n";
	echo '<link rel="preload" as="image" href="' . esc_url( LUMYLA_URI . '/assets/media/hero-poster.jpg' ) . '">' . "\n";
}
add_action( 'wp_head', 'lumyla_preload_assets', 5 );

/**
 * Body classes that the design system expects on every page.
 *
 * @param array $classes Existing classes.
 * @return array
 */
function lumyla_body_class( $classes ) {
	$classes[] = 'lumyla';
	$classes[] = is_front_page() ? 'is-home' : 'is-inner';

	return $classes;
}
add_filter( 'body_class', 'lumyla_body_class' );

/**
 * The design is Persian and right-to-left. WordPress only emits dir="rtl" when
 * the site language is an RTL locale, so for an English admin install the theme
 * states it explicitly instead of flipping every logical property by accident.
 *
 * @param string $output The language attributes.
 * @return string
 */
function lumyla_language_attributes( $output ) {
	if ( false === strpos( $output, 'dir=' ) ) {
		$output .= ' dir="rtl"';
	}

	return $output;
}
add_filter( 'language_attributes', 'lumyla_language_attributes' );

/**
 * Persian excerpts get a clean ellipsis instead of the square bracket form.
 *
 * @return string
 */
function lumyla_excerpt_more() {
	return '…';
}
add_filter( 'excerpt_more', 'lumyla_excerpt_more' );
