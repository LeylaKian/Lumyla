<?php
/**
 * Shared UI primitives: section headings, buttons, page heroes, reveal wrappers.
 *
 * @package Lumyla
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Attributes for a reveal-animated wrapper.
 *
 * @param int    $delay Delay in milliseconds.
 * @param string $class Extra classes.
 * @return string
 */
function lumyla_reveal_attrs( $delay = 0, $class = '' ) {
	return sprintf(
		'class="%s" style="--reveal-delay:%dms"',
		esc_attr( trim( 'reveal ' . $class ) ),
		(int) $delay
	);
}

/**
 * Section heading, matching SectionHeading.jsx.
 *
 * @param array $args {
 *     @type string $eyebrow Small label above the title.
 *     @type string $title   Heading text.
 *     @type string $lead    Lead paragraph.
 *     @type string $align   start|center.
 *     @type bool   $wide    Splits title and action on one row.
 *     @type string $action  Rendered markup for the action slot.
 *     @type string $tag     h1|h2|h3.
 *     @type string $id      Heading id.
 * }
 * @return void
 */
function lumyla_section_heading( $args = array() ) {
	$args = wp_parse_args(
		$args,
		array(
			'eyebrow' => '',
			'title'   => '',
			'lead'    => '',
			'align'   => 'start',
			'wide'    => false,
			'action'  => '',
			'tag'     => 'h2',
			'id'      => '',
		)
	);

	$classes = 'section-head' . ( $args['wide'] ? ' section-head--wide' : ( 'center' === $args['align'] ? ' section-head--center' : '' ) );

	echo '<div class="' . esc_attr( $classes ) . '">';
	echo '<div class="section-head__main">';
	if ( $args['eyebrow'] ) {
		echo '<p class="eyebrow eyebrow--fa">' . esc_html( $args['eyebrow'] ) . '</p>';
	}
	printf(
		'<%1$s class="section-head__title"%2$s>%3$s</%1$s>',
		esc_html( $args['tag'] ),
		$args['id'] ? ' id="' . esc_attr( $args['id'] ) . '"' : '',
		esc_html( $args['title'] )
	);
	if ( $args['lead'] ) {
		echo '<p class="section-head__lead">' . esc_html( $args['lead'] ) . '</p>';
	}
	echo '</div>';

	if ( $args['action'] ) {
		echo $args['action']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}

	echo '</div>';
}

/**
 * Button markup.
 *
 * @param array $args {
 *     @type string $label   Button text.
 *     @type string $href    Link target; a button element is rendered without one.
 *     @type string $variant primary|ghost|gold|quiet.
 *     @type string $size    sm|lg.
 *     @type bool   $block   Full width.
 *     @type bool   $icon    Trailing arrow.
 *     @type string $class   Extra classes.
 *     @type string $attribs Extra attributes (already escaped).
 * }
 * @return string
 */
function lumyla_button( $args = array() ) {
	$args = wp_parse_args(
		$args,
		array(
			'label'   => '',
			'href'    => '',
			'variant' => 'primary',
			'size'    => '',
			'block'   => false,
			'icon'    => true,
			'class'   => '',
			'attribs' => '',
		)
	);

	$variants = array(
		'primary' => 'btn--primary',
		'ghost'   => 'btn--ghost',
		'gold'    => 'btn--outline-gold',
		'quiet'   => 'btn--quiet',
	);

	$classes = array( 'btn' );
	if ( isset( $variants[ $args['variant'] ] ) ) {
		$classes[] = $variants[ $args['variant'] ];
	}
	if ( 'sm' === $args['size'] ) {
		$classes[] = 'btn--sm';
	}
	if ( 'lg' === $args['size'] ) {
		$classes[] = 'btn--lg';
	}
	if ( $args['block'] ) {
		$classes[] = 'btn--block';
	}
	if ( $args['class'] ) {
		$classes[] = $args['class'];
	}

	$inner = esc_html( $args['label'] ) . ( $args['icon'] ? lumyla_icon( 'arrow', 18, 1.5, 'icon-arrow' ) : '' );
	$open  = '<button type="button" class="' . esc_attr( implode( ' ', $classes ) ) . '" ' . $args['attribs'] . '>';
	$close = '</button>';

	if ( $args['href'] ) {
		$open  = '<a class="' . esc_attr( implode( ' ', $classes ) ) . '" href="' . esc_url( $args['href'] ) . '" ' . $args['attribs'] . '>';
		$close = '</a>';
	}

	return $open . $inner . $close;
}

/**
 * CTA that leads to the consultation form with the service pre-selected.
 *
 * @param array $args {
 *     @type string $label   Button text.
 *     @type string $service Service key.
 *     @type string $package Package key.
 *     @type string $variant Button variant.
 *     @type string $size    Button size.
 *     @type bool   $block   Full width.
 *     @type bool   $icon    Trailing arrow.
 *     @type string $class   Extra classes.
 * }
 * @return void
 */
function lumyla_consult_button( $args = array() ) {
	$args = wp_parse_args(
		$args,
		array(
			'label'   => __( 'دریافت مشاوره', 'lumyla' ),
			'service' => 'general',
			'package' => '',
			'variant' => 'primary',
			'size'    => '',
			'block'   => false,
			'icon'    => true,
			'class'   => '',
		)
	);

	echo lumyla_button( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		array(
			'label'   => $args['label'],
			'href'    => lumyla_consult_url( $args['service'], $args['package'] ),
			'variant' => $args['variant'],
			'size'    => $args['size'],
			'block'   => $args['block'],
			'icon'    => $args['icon'],
			'class'   => $args['class'],
		)
	);
}

/**
 * Telegram CTA. Falls back to the consultation form while no username is set,
 * so a button never leads nowhere.
 *
 * @param array $args {
 *     @type string $label   Button text.
 *     @type string $variant Button variant.
 *     @type string $size    Button size.
 *     @type bool   $block   Full width.
 * }
 * @return void
 */
function lumyla_telegram_button( $args = array() ) {
	$args = wp_parse_args(
		$args,
		array(
			'label'   => __( 'ارتباط در تلگرام', 'lumyla' ),
			'variant' => 'ghost',
			'size'    => '',
			'block'   => false,
		)
	);

	$url = lumyla_telegram_url();

	if ( $url ) {
		echo lumyla_button( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			array(
				'label'   => $args['label'],
				'href'    => $url,
				'variant' => $args['variant'],
				'size'    => $args['size'],
				'block'   => $args['block'],
				'icon'    => false,
				'attribs' => 'target="_blank" rel="noopener noreferrer"',
			)
		);
		return;
	}

	echo '<a class="btn ' . esc_attr( 'ghost' === $args['variant'] ? 'btn--ghost' : 'btn--primary' ) . ( $args['block'] ? ' btn--block' : '' ) . ( 'sm' === $args['size'] ? ' btn--sm' : '' ) . ( 'lg' === $args['size'] ? ' btn--lg' : '' ) . '" href="' . esc_url( lumyla_consult_url( 'general' ) ) . '">';
	lumyla_the_icon( 'send' );
	echo esc_html( 'ارتباط در تلگرام' === $args['label'] ? __( 'درخواست مشاوره', 'lumyla' ) : $args['label'] );
	echo '</a>';
}

/**
 * Page hero used by every inner page.
 *
 * @param array $args {
 *     @type string $eyebrow    Small label.
 *     @type string $title      Page title.
 *     @type string $lead       Intro paragraph.
 *     @type array  $breadcrumb List of ['label' => '', 'to' => ''].
 *     @type string $actions    Rendered markup.
 * }
 * @return void
 */
function lumyla_page_hero( $args = array() ) {
	$args = wp_parse_args(
		$args,
		array(
			'eyebrow'    => '',
			'title'      => '',
			'lead'       => '',
			'breadcrumb' => array(),
			'actions'    => '',
		)
	);
	?>
	<section class="page-hero" aria-labelledby="page-hero-title">
		<div class="page-hero__bg" role="presentation"></div>
		<div class="page-hero__veil"></div>
		<div class="page-hero__stars stars" aria-hidden="true"></div>
		<div class="container container-wide">
			<nav class="breadcrumb" aria-label="مسیر صفحه">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>">خانه</a>
				<?php foreach ( $args['breadcrumb'] as $crumb ) : ?>
					<span aria-hidden="true">/</span>
					<?php if ( ! empty( $crumb['to'] ) ) : ?>
						<a href="<?php echo esc_url( $crumb['to'] ); ?>"><?php echo esc_html( $crumb['label'] ); ?></a>
					<?php else : ?>
						<span aria-current="page"><?php echo esc_html( $crumb['label'] ); ?></span>
					<?php endif; ?>
				<?php endforeach; ?>
			</nav>

			<div class="page-hero__inner" style="margin-top:1.5rem">
				<?php if ( $args['eyebrow'] ) : ?>
					<p class="eyebrow eyebrow--fa"><?php echo esc_html( $args['eyebrow'] ); ?></p>
				<?php endif; ?>
				<h1 class="page-hero__title" id="page-hero-title"><?php echo esc_html( $args['title'] ); ?></h1>
				<?php if ( $args['lead'] ) : ?>
					<p class="page-hero__lead"><?php echo esc_html( $args['lead'] ); ?></p>
				<?php endif; ?>
				<?php if ( $args['actions'] ) : ?>
					<div class="page-hero__actions"><?php echo $args['actions']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
				<?php endif; ?>
			</div>
		</div>
	</section>
	<?php
}

/**
 * A generic content band used by the services and SEO pages.
 *
 * @param array $args {
 *     @type string $title Title.
 *     @type string $desc  Description.
 *     @type string $link  Optional link markup.
 * }
 * @return void
 */
function lumyla_cta_band( $args = array() ) {
	$args = wp_parse_args(
		$args,
		array(
			'title' => '',
			'desc'  => '',
			'link'  => '',
		)
	);
	?>
	<div class="cta-band">
		<div class="cta-band__text">
			<h2><?php echo esc_html( $args['title'] ); ?></h2>
			<p><?php echo esc_html( $args['desc'] ); ?></p>
		</div>
		<div class="btn-group"><?php echo $args['link']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
	</div>
	<?php
}
