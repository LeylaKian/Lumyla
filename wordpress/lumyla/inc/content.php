<?php
/**
 * Content access layer.
 *
 * Every string, package, project and article that the design shows lives in
 * inc/data.json — exported from the studio's single source of truth. Reading it
 * once and caching it in a static keeps the templates free of markup noise.
 *
 * @package Lumyla
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Returns the whole content tree, or one top level key of it.
 *
 * @param string|null $key Top level key (site, navigation, pricingPackages, …).
 * @return mixed
 */
function lumyla_data( $key = null ) {
	static $data = null;

	if ( null === $data ) {
		$path = get_template_directory() . '/inc/data.json';
		$raw  = is_readable( $path ) ? file_get_contents( $path ) : ''; // phpcs:ignore WordPress.WP.AlternativeFunctions
		$data = $raw ? json_decode( $raw, true ) : array();
	}

	if ( ! is_array( $data ) ) {
		$data = array();
	}

	if ( null === $key ) {
		return $data;
	}

	return isset( $data[ $key ] ) ? $data[ $key ] : array();
}

/**
 * Reads a dotted path out of the content tree.
 *
 * @param string $path    e.g. "site.nameFa".
 * @param mixed  $default Returned when the path is missing.
 * @return mixed
 */
function lumyla_get( $path, $default = '' ) {
	$value = lumyla_data();

	foreach ( explode( '.', $path ) as $segment ) {
		if ( ! is_array( $value ) || ! array_key_exists( $segment, $value ) ) {
			return $default;
		}
		$value = $value[ $segment ];
	}

	return $value;
}

/**
 * Resolves a site path ("services/seo", "pricing", …) to a real WordPress URL.
 *
 * The pages are created by the importer on activation, so a missing page simply
 * falls back to the same path on the home URL instead of leading nowhere.
 *
 * @param string $path Path without leading or trailing slashes.
 * @return string
 */
function lumyla_url( $path = '' ) {
	$path = trim( (string) $path, '/' );

	if ( '' === $path ) {
		return home_url( '/' );
	}

	$page = get_page_by_path( $path );

	if ( $page instanceof WP_Post && 'publish' === $page->post_status ) {
		return get_permalink( $page );
	}

	return home_url( '/' . $path . '/' );
}

/**
 * Finds an imported project by its original slug (case studies).
 *
 * @param string $slug Project slug.
 * @return array|null
 */
function lumyla_project( $slug ) {
	foreach ( lumyla_data( 'projects' ) as $project ) {
		if ( isset( $project['slug'] ) && $project['slug'] === $slug ) {
			return $project;
		}
	}

	return null;
}

/**
 * All projects, optionally limited.
 *
 * @param int $limit 0 for every project.
 * @return array
 */
function lumyla_projects( $limit = 0 ) {
	$projects = lumyla_data( 'projects' );

	if ( $limit > 0 ) {
		return array_slice( $projects, 0, $limit );
	}

	return $projects;
}

/**
 * Site wide brand configuration.
 *
 * @param string $key Optional key inside the site object.
 * @param mixed  $default Fallback.
 * @return mixed
 */
function lumyla_site( $key = '', $default = '' ) {
	$site = lumyla_data( 'site' );

	if ( '' === $key ) {
		return $site;
	}

	return isset( $site[ $key ] ) && '' !== $site[ $key ] ? $site[ $key ] : $default;
}

/**
 * Telegram URL when a username is configured, empty string otherwise.
 *
 * @return string
 */
function lumyla_telegram_url() {
	$username = trim( (string) lumyla_site( 'telegramUsername', '' ), '@' );

	return $username ? 'https://t.me/' . $username : '';
}

/**
 * The contact page URL with an optional pre-selected service.
 *
 * @param string $service Service key (seo, website-template, …).
 * @param string $package Package key (start, growth, …).
 * @return string
 */
function lumyla_consult_url( $service = '', $package = '' ) {
	$url = lumyla_url( 'contact' );

	$args = array_filter(
		array(
			'service' => $service,
			'package' => $package,
		)
	);

	if ( $args ) {
		$url = add_query_arg( $args, $url ) . '#consultation';
	} else {
		$url .= '#consultation';
	}

	return $url;
}

/**
 * Persian digits for counters that the design renders as ۰۱، ۰۲، …
 *
 * @param int $number Latin number.
 * @return string
 */
function lumyla_fa_number( $number ) {
	$digits = array( '۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹' );

	return str_replace( range( 0, 9 ), $digits, (string) $number );
}
