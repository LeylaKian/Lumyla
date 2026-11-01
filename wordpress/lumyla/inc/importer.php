<?php
/**
 * Activation importer.
 *
 * A classic theme can carry the whole site: on activation the theme creates the
 * pages the design needs (with their templates), fills them with the studio's
 * articles, and wires the primary menu. Everything stays editable in the
 * dashboard afterwards — the importer never overwrites content that exists.
 *
 * @package Lumyla
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Pages the design needs: path => [title, template, menu label].
 *
 * @return array<string,array>
 */
function lumyla_page_map() {
	return array(
		''                      => array(
			'title'    => 'خانه',
			'template' => 'page-templates/home.php',
			'label'    => 'خانه',
		),
		'services'              => array(
			'title'    => 'خدمات لومیلا',
			'template' => 'page-templates/services.php',
			'label'    => 'خدمات',
		),
		'services/seo'          => array(
			'title'    => 'خدمات تخصصی سئو',
			'template' => 'page-templates/seo.php',
			'label'    => 'خدمات تخصصی سئو',
			'parent'   => 'services',
		),
		'services/website-design' => array(
			'title'    => 'طراحی سایت',
			'template' => 'page-templates/website-design.php',
			'label'    => 'طراحی سایت',
			'parent'   => 'services',
		),
		'services/graphic-design' => array(
			'title'    => 'طراحی گرافیک و هویت بصری',
			'template' => 'page-templates/graphic-design.php',
			'label'    => 'طراحی گرافیک',
			'parent'   => 'services',
		),
		'pricing'               => array(
			'title'    => 'تعرفه خدمات سئو',
			'template' => 'page-templates/pricing.php',
			'label'    => 'تعرفه سئو',
		),
		'portfolio'             => array(
			'title'    => 'نمونه‌کارها',
			'template' => 'page-templates/portfolio.php',
			'label'    => 'نمونه‌کارها',
		),
		'blog'                  => array(
			'title'    => 'مجله لومیلا',
			'template' => 'page-templates/journal.php',
			'label'    => 'مقالات',
		),
		'about'                 => array(
			'title'    => 'درباره لومیلا',
			'template' => 'page-templates/about.php',
			'label'    => 'درباره لومیلا',
		),
		'contact'               => array(
			'title'    => 'تماس با ما و درخواست مشاوره',
			'template' => 'page-templates/contact.php',
			'label'    => 'تماس با ما',
		),
	);
}

/**
 * Creates (once) the pages the design needs and returns their IDs.
 *
 * @return array<string,int>
 */
function lumyla_ensure_pages() {
	$ids = array();

	foreach ( lumyla_page_map() as $path => $config ) {
		$page    = get_page_by_path( '' === $path ? 'home' : $path );
		$post_id = $page instanceof WP_Post ? $page->ID : 0;

		if ( ! $post_id ) {
			$parent = 0;
			if ( ! empty( $config['parent'] ) && isset( $ids[ $config['parent'] ] ) ) {
				$parent = $ids[ $config['parent'] ];
			}

			$post_id = wp_insert_post(
				array(
					'post_type'   => 'page',
					'post_status' => 'publish',
					'post_title'  => $config['title'],
					'post_name'   => '' === $path ? 'home' : basename( $path ),
					'post_parent' => $parent,
				)
			);
		}

		if ( $post_id && ! is_wp_error( $post_id ) ) {
			update_post_meta( $post_id, '_wp_page_template', $config['template'] );
			$ids[ $path ] = (int) $post_id;
		}
	}

	return $ids;
}

/**
 * Seeds the journal with the studio's articles (once per slug).
 *
 * The React build stores articles as block arrays; WordPress stores HTML, so the
 * blocks are converted to their classic equivalents — headings, lists, quotes.
 *
 * @return void
 */
function lumyla_import_posts() {
	$category_map = array();
	foreach ( lumyla_data( 'postCategories' ) as $category ) {
		if ( 'all' === $category['key'] ) {
			continue;
		}

		$term = term_exists( $category['label'], 'category' );
		if ( ! $term ) {
			$term = wp_insert_term( $category['label'], 'category', array( 'slug' => $category['key'] ) );
		}

		if ( ! is_wp_error( $term ) && $term ) {
			$category_map[ $category['key'] ] = (int) ( is_array( $term ) ? $term['term_id'] : $term );
		}
	}

	foreach ( lumyla_data( 'posts' ) as $post ) {
		$existing = get_page_by_path( $post['slug'], OBJECT, 'post' );
		if ( $existing instanceof WP_Post ) {
			continue;
		}

		$html = '';
		foreach ( $post['content'] as $block ) {
			switch ( $block['t'] ) {
				case 'h2':
					$html .= '<h2>' . esc_html( $block['text'] ) . "</h2>\n";
					break;
				case 'h3':
					$html .= '<h3>' . esc_html( $block['text'] ) . "</h3>\n";
					break;
				case 'ul':
				case 'ol':
					$html .= '<' . $block['t'] . ">\n";
					foreach ( $block['items'] as $item ) {
						$html .= '<li>' . esc_html( $item ) . "</li>\n";
					}
					$html .= '</' . $block['t'] . ">\n";
					break;
				case 'quote':
					$html .= '<blockquote><p>' . esc_html( $block['text'] ) . "</p></blockquote>\n";
					break;
				default:
					$html .= '<p>' . esc_html( $block['text'] ) . "</p>\n";
			}
		}

		$post_id = wp_insert_post(
			array(
				'post_type'    => 'post',
				'post_status'  => 'publish',
				'post_title'   => $post['title'],
				'post_name'    => $post['slug'],
				'post_excerpt' => $post['excerpt'],
				'post_content' => $html,
				'post_date'    => current_time( 'mysql' ),
			)
		);

		if ( is_wp_error( $post_id ) ) {
			continue;
		}

		if ( ! empty( $category_map[ $post['category'] ] ) ) {
			wp_set_post_categories( $post_id, array( $category_map[ $post['category'] ] ) );
		}

		update_post_meta( $post_id, 'lumyla_reading_time', $post['readingTime'] );
		update_post_meta( $post_id, 'lumyla_art_variant', $post['art']['variant'] );
		update_post_meta( $post_id, 'lumyla_art_tone', $post['art']['tone'] );
		update_post_meta( $post_id, 'lumyla_art_label', $post['art']['label'] );
	}
}

/**
 * Creates the case study pages (one per project) so /portfolio/<slug>/ resolves.
 *
 * @return void
 */
function lumyla_import_projects() {
	foreach ( lumyla_data( 'projects' ) as $project ) {
		$path     = 'portfolio/' . $project['slug'];
		$existing = get_page_by_path( $path );

		if ( $existing instanceof WP_Post ) {
			continue;
		}

		$portfolio = get_page_by_path( 'portfolio' );

		$post_id = wp_insert_post(
			array(
				'post_type'   => 'page',
				'post_status' => 'publish',
				'post_title'  => $project['title'],
				'post_name'   => $project['slug'],
				'post_parent' => $portfolio instanceof WP_Post ? $portfolio->ID : 0,
			)
		);

		if ( ! is_wp_error( $post_id ) ) {
			update_post_meta( $post_id, '_wp_page_template', 'page-templates/case-study.php' );
			update_post_meta( $post_id, 'lumyla_project_slug', $project['slug'] );
		}
	}
}

/**
 * Builds the primary menu from the created pages.
 *
 * @param array<string,int> $ids Page IDs keyed by path.
 * @return void
 */
function lumyla_build_menu( $ids ) {
	$menu_name = 'منوی اصلی لومیلا';
	$menu      = wp_get_nav_menu_object( $menu_name );

	if ( ! $menu ) {
		$menu_id = wp_create_nav_menu( $menu_name );
		if ( is_wp_error( $menu_id ) ) {
			return;
		}
	} else {
		$menu_id = $menu->term_id;
	}

	$existing_items = wp_get_nav_menu_items( $menu_id );
	if ( $existing_items ) {
		return; // Already built — never duplicate on a second activation.
	}

	$order = array( '', 'services', 'pricing', 'portfolio', 'blog', 'about', 'contact' );

	foreach ( $order as $path ) {
		if ( empty( $ids[ $path ] ) ) {
			continue;
		}

		wp_update_nav_menu_item(
			$menu_id,
			0,
			array(
				'menu-item-title'     => lumyla_page_map()[ $path ]['label'],
				'menu-item-object'    => 'page',
				'menu-item-object-id' => $ids[ $path ],
				'menu-item-type'      => 'post_type',
				'menu-item-status'    => 'publish',
			)
		);
	}

	$locations          = get_theme_mod( 'nav_menu_locations', array() );
	$locations['primary'] = $menu_id;
	set_theme_mod( 'nav_menu_locations', $locations );
}

/**
 * Runs the whole import when the theme is activated.
 *
 * @return void
 */
function lumyla_activate() {
	$ids  = lumyla_ensure_pages();
	$home = isset( $ids[''] ) ? $ids[''] : 0;

	if ( $home ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $home );
	}

	// Pretty permalinks keep the studio's URLs (/services/seo/, /portfolio/…).
	if ( '' === get_option( 'permalink_structure' ) ) {
		update_option( 'permalink_structure', '/%postname%/' );
	}

	lumyla_import_posts();
	lumyla_import_projects();
	lumyla_build_menu( $ids );

	flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'lumyla_activate' );

/**
 * Re-runs the content import from the dashboard (Appearance → LUMYLA setup),
 * so a site that already had the theme can pull in new pages or articles.
 *
 * @return void
 */
function lumyla_admin_menu() {
	add_theme_page(
		__( 'راه‌اندازی لومیلا', 'lumyla' ),
		__( 'راه‌اندازی لومیلا', 'lumyla' ),
		'edit_theme_options',
		'lumyla-setup',
		'lumyla_setup_screen'
	);
}
add_action( 'admin_menu', 'lumyla_admin_menu' );

/**
 * Setup screen: one button that re-runs the importer.
 *
 * @return void
 */
function lumyla_setup_screen() {
	if ( isset( $_POST['lumyla_run_import'] ) && check_admin_referer( 'lumyla_setup' ) ) {
		lumyla_activate();
		echo '<div class="notice notice-success"><p>' . esc_html__( 'صفحه‌ها، مقالات و منو ساخته شدند.', 'lumyla' ) . '</p></div>';
	}
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'راه‌اندازی قالب لومیلا', 'lumyla' ); ?></h1>
		<p><?php esc_html_e( 'با این دکمه صفحه‌های اصلی، مقاله‌های مجله، صفحه‌های نمونه‌کار و منوی سایت ساخته می‌شوند. محتوای موجود بازنویسی نمی‌شود.', 'lumyla' ); ?></p>
		<form method="post">
			<?php wp_nonce_field( 'lumyla_setup' ); ?>
			<p><button type="submit" name="lumyla_run_import" class="button button-primary"><?php esc_html_e( 'ساخت محتوای قالب', 'lumyla' ); ?></button></p>
		</form>
	</div>
	<?php
}
