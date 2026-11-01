<?php
/**
 * Site header: brand, primary navigation and the overlay triggers.
 *
 * @package Lumyla
 */

$lumyla_locations = get_nav_menu_locations();
$lumyla_items     = array();

if ( ! empty( $lumyla_locations['primary'] ) ) {
	$lumyla_menu_items = wp_get_nav_menu_items( $lumyla_locations['primary'] );
	if ( $lumyla_menu_items ) {
		foreach ( $lumyla_menu_items as $lumyla_menu_item ) {
			$lumyla_items[] = array(
				'label'  => $lumyla_menu_item->title,
				'url'    => $lumyla_menu_item->url,
				'target' => $lumyla_menu_item->target,
			);
		}
	}
}

if ( ! $lumyla_items ) {
	foreach ( lumyla_data( 'navigation' ) as $lumyla_nav ) {
		$lumyla_items[] = array(
			'label'  => $lumyla_nav['label'],
			'url'    => lumyla_url( $lumyla_nav['to'] ),
			'target' => '',
		);
	}
}

$lumyla_current = untrailingslashit( wp_parse_url( home_url( add_query_arg( array() ) ), PHP_URL_PATH ) );
$lumyla_home    = untrailingslashit( wp_parse_url( home_url( '/' ), PHP_URL_PATH ) );
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="screen-reader-text" href="#main"><?php esc_html_e( 'پرش به محتوا', 'lumyla' ); ?></a>

<header class="site-header" data-header>
	<div class="container container-wide site-header__inner">
		<a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="لومیلا — صفحه اصلی">
			<img src="<?php echo esc_url( LUMYLA_URI . '/assets/brand/lumyla-logo.png' ); ?>" alt="LUMYLA — استودیو خلاق دیجیتال" class="brand__mark" width="48" height="48" decoding="async">
			<span class="brand__text" aria-hidden="true">
				<span class="brand__name">LUMYLA</span>
				<span class="brand__sub">CREATIVE DIGITAL STUDIO</span>
			</span>
		</a>

		<nav class="site-nav" aria-label="ناوبری اصلی">
			<?php foreach ( $lumyla_items as $lumyla_item ) : ?>
				<?php
				$lumyla_path   = untrailingslashit( wp_parse_url( $lumyla_item['url'], PHP_URL_PATH ) );
				$lumyla_active = ( $lumyla_path === $lumyla_current ) || ( $lumyla_path === $lumyla_home && $lumyla_current === '' );
				?>
				<a class="site-nav__link <?php echo $lumyla_active ? 'is-active' : ''; ?>" href="<?php echo esc_url( $lumyla_item['url'] ); ?>">
					<?php echo esc_html( $lumyla_item['label'] ); ?>
				</a>
			<?php endforeach; ?>
		</nav>

		<div class="site-header__actions">
			<button type="button" class="header-search" data-search-open aria-label="جست‌وجو در سایت">
				<?php lumyla_the_icon( 'search' ); ?>
				<span class="header-search__label">جست‌وجو</span>
			</button>

			<a class="btn btn--primary btn--sm header-consult" href="<?php echo esc_url( lumyla_consult_url( 'general' ) ); ?>">دریافت مشاوره</a>

			<button type="button" class="icon-btn nav-toggle" data-drawer-open aria-label="باز کردن منو" aria-expanded="false" aria-controls="site-drawer">
				<?php lumyla_the_icon( 'menu', 20 ); ?>
			</button>
		</div>
	</div>
</header>

<div class="drawer" id="site-drawer" data-drawer data-open="false" role="dialog" aria-modal="true" aria-label="منوی سایت">
	<div class="drawer__scrim" data-drawer-close aria-hidden="true"></div>
	<div class="drawer__panel">
		<div class="drawer__top">
			<a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="لومیلا — خانه">
				<img src="<?php echo esc_url( LUMYLA_URI . '/assets/brand/lumyla-logo.png' ); ?>" alt="" class="brand__mark" width="48" height="48" decoding="async">
				<span class="brand__text" aria-hidden="true">
					<span class="brand__name">LUMYLA</span>
					<span class="brand__sub">CREATIVE DIGITAL STUDIO</span>
				</span>
			</a>
			<button type="button" class="icon-btn" data-drawer-close aria-label="بستن منو">
				<?php lumyla_the_icon( 'close', 18 ); ?>
			</button>
		</div>

		<nav aria-label="ناوبری اصلی در موبایل">
			<ul class="drawer__list">
				<?php foreach ( $lumyla_items as $lumyla_item ) : ?>
					<?php
					$lumyla_path   = untrailingslashit( wp_parse_url( $lumyla_item['url'], PHP_URL_PATH ) );
					$lumyla_active = ( $lumyla_path === $lumyla_current ) || ( $lumyla_path === $lumyla_home && $lumyla_current === '' );
					?>
					<li>
						<a class="drawer__link <?php echo $lumyla_active ? 'is-active' : ''; ?>" href="<?php echo esc_url( $lumyla_item['url'] ); ?>">
							<span><?php echo esc_html( $lumyla_item['label'] ); ?></span>
							<?php lumyla_the_icon( 'arrow', 15 ); ?>
						</a>
					</li>
				<?php endforeach; ?>
			</ul>
		</nav>

		<button type="button" class="header-search" data-search-open style="width:100%;justify-content:flex-start">
			<?php lumyla_the_icon( 'search' ); ?>
			جست‌وجو در سایت
		</button>

		<div class="drawer__foot">
			<a class="btn btn--primary btn--block" href="<?php echo esc_url( lumyla_consult_url( 'general' ) ); ?>">
				دریافت مشاوره
				<?php lumyla_arrow(); ?>
			</a>
			<?php lumyla_telegram_button( array( 'block' => true ) ); ?>
		</div>
	</div>
</div>

<div class="search-dialog" data-search-dialog data-open="false" role="dialog" aria-modal="true" aria-label="جست‌وجو در سایت">
	<div class="search-dialog__panel">
		<form class="search-dialog__field" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
			<?php lumyla_the_icon( 'search', 18 ); ?>
			<input type="search" name="s" placeholder="جست‌وجو در سایت…" aria-label="عبارت جست‌وجو" autocomplete="off">
			<button type="button" class="icon-btn" data-search-close aria-label="بستن جست‌وجو">
				<?php lumyla_the_icon( 'close', 16 ); ?>
			</button>
		</form>
	</div>
</div>

<main id="main">
