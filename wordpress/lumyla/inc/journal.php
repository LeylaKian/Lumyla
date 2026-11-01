<?php
/**
 * Journal helpers: turns WordPress posts into the shape the design expects.
 *
 * @package Lumyla
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Fallback nightscape per article, so a card always has artwork even when the
 * author never picked one.
 *
 * @param int $post_id Post ID.
 * @return array{variant:string,tone:string,label:string}
 */
function lumyla_post_art( $post_id ) {
	$variants = array( 'orbit', 'grid', 'prism', 'aurora', 'veil', 'ridge' );
	$tones    = array( 'gold', 'amber', 'rose' );

	$variant = get_post_meta( $post_id, 'lumyla_art_variant', true );
	$tone    = get_post_meta( $post_id, 'lumyla_art_tone', true );
	$label   = get_post_meta( $post_id, 'lumyla_art_label', true );

	if ( ! $variant ) {
		$variant = $variants[ $post_id % count( $variants ) ];
	}
	if ( ! $tone ) {
		$tone = $tones[ $post_id % count( $tones ) ];
	}
	if ( ! $label ) {
		$label = 'LUMYLA';
	}

	return array(
		'variant' => $variant,
		'tone'    => $tone,
		'label'   => $label,
	);
}

/**
 * Maps one WP_Post to the card data structure.
 *
 * @param WP_Post $post Post object.
 * @return array
 */
function lumyla_post_to_card( $post ) {
	$categories = get_the_category( $post->ID );
	$label      = $categories ? $categories[0]->name : 'مجله';
	$reading    = get_post_meta( $post->ID, 'lumyla_reading_time', true );

	return array(
		'id'            => $post->ID,
		'title'         => get_the_title( $post ),
		'excerpt'       => get_the_excerpt( $post ),
		'permalink'     => get_permalink( $post ),
		'categoryLabel' => $label,
		'category'      => $categories ? $categories[0]->slug : 'all',
		'readingTime'   => $reading ? $reading : '۶ دقیقه',
		'publishedAt'   => get_post_meta( $post->ID, 'lumyla_published_label', true ),
		'art'           => lumyla_post_art( $post->ID ),
	);
}

/**
 * Latest journal articles as card data.
 *
 * @param int $limit How many to fetch.
 * @param int $exclude Post ID to skip.
 * @return array<int,array>
 */
function lumyla_journal_posts( $limit = 3, $exclude = 0 ) {
	$query = new WP_Query(
		array(
			'post_type'           => 'post',
			'posts_per_page'      => (int) $limit,
			'post__not_in'        => $exclude ? array( (int) $exclude ) : array(),
			'ignore_sticky_posts' => true,
			'no_found_rows'       => true,
		)
	);

	$cards = array();
	foreach ( $query->posts as $post ) {
		$cards[] = lumyla_post_to_card( $post );
	}

	wp_reset_postdata();

	return $cards;
}

/**
 * Articles for the journal archive, optionally filtered by category slug.
 *
 * @param string $category Category slug or "all".
 * @return array<int,array>
 */
function lumyla_journal_by_category( $category = 'all' ) {
	$args = array(
		'post_type'      => 'post',
		'posts_per_page' => 24,
		'no_found_rows'  => true,
	);

	if ( $category && 'all' !== $category ) {
		$args['category_name'] = $category;
	}

	$query = new WP_Query( $args );
	$cards = array();

	foreach ( $query->posts as $post ) {
		$cards[] = lumyla_post_to_card( $post );
	}

	wp_reset_postdata();

	return $cards;
}
