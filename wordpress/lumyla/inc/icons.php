<?php
/**
 * Thin-stroke icon set, drawn to match the champagne-gold hairline language.
 * Every icon inherits `currentColor`, exactly like the React build.
 *
 * @package Lumyla
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Inner markup of every icon in the set.
 *
 * @return array<string,string>
 */
function lumyla_icon_paths() {
	static $paths = null;

	if ( null !== $paths ) {
		return $paths;
	}

	$paths = array(
		'search'      => '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
		'menu'        => '<path d="M3 6h18M3 12h18M3 18h18"/>',
		'close'       => '<path d="M18 6 6 18M6 6l12 12"/>',
		'arrow'       => '<path d="M19 12H5M12 19l-7-7 7-7"/>',
		'arrowUp'     => '<path d="M12 19V5M5 12l7-7 7 7"/>',
		'check'       => '<path d="M20 6 9 17l-5-5"/>',
		'checkCircle' => '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.4 2.4 4.6-4.9"/>',
		'send'        => '<path d="M21 3 10.5 13.5"/><path d="M21 3 14.5 21l-4-7.5L3 9.5 21 3Z"/>',
		'mail'        => '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>',
		'phone'       => '<path d="M5 3h3l1.6 4-2 1.6a13 13 0 0 0 6.8 6.8l1.6-2 4 1.6v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 3 5.2 2 2 0 0 1 5 3Z"/>',
		'clock'       => '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.3l3.2 1.9"/>',
		'pin'         => '<path d="M20 10.5c0 5.6-8 11.5-8 11.5s-8-5.9-8-11.5a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10.3" r="2.6"/>',
		'shield'      => '<path d="M12 21.5S4.5 17.8 4.5 11V5.6L12 2.8l7.5 2.8V11c0 6.8-7.5 10.5-7.5 10.5Z"/><path d="m9 11.6 2.2 2.2 4-4.4"/>',
		'chart'       => '<path d="M4 3v18h17"/><path d="m7.5 15 3.6-4 3 2.8 4.9-6"/>',
		'eye'         => '<path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.8"/>',
		'star'        => '<path d="m12 3.4 2.4 5.5 5.9.6-4.5 3.9 1.3 5.8L12 16.1l-5.1 3.1 1.3-5.8L3.7 9.5l5.9-.6L12 3.4Z"/>',
		'spark'       => '<path d="M12 3v3.4M12 17.6V21M3 12h3.4M17.6 12H21M5.6 5.6l2.4 2.4M16 16l2.4 2.4M18.4 5.6 16 8M8 16l-2.4 2.4"/>',
		'sparkles'    => '<path d="m12 3 1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3Z"/><path d="M18.5 15.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z"/>',
		'compass'     => '<circle cx="12" cy="12" r="9"/><path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1Z"/>',
		'pen'         => '<path d="M16.5 3.5a2.3 2.3 0 0 1 3.3 3.3L7.4 19.2 3 20.5l1.3-4.4L16.5 3.5Z"/><path d="m14.5 5.5 3.3 3.3"/>',
		'layout'      => '<rect x="3" y="4" width="18" height="16" rx="2.2"/><path d="M3 9.5h18M9.5 20V9.5"/>',
		'cube'        => '<path d="M20.5 15.6V8.4a2 2 0 0 0-1-1.7l-6.6-3.6a2 2 0 0 0-1.9 0L4.5 6.7a2 2 0 0 0-1 1.7v7.2a2 2 0 0 0 1 1.7l6.5 3.6a2 2 0 0 0 1.9 0l6.6-3.6a2 2 0 0 0 1-1.7Z"/><path d="m3.9 7 8.1 4.4L20.1 7M12 21.2V11.4"/>',
		'layers'      => '<path d="m12 2.6 9 4.6-9 4.6-9-4.6 9-4.6Z"/><path d="m3 12.4 9 4.6 9-4.6M3 17.2l9 4.6 9-4.6"/>',
		'target'      => '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.2"/><circle cx="12" cy="12" r="1.4"/>',
		'globe'       => '<circle cx="12" cy="12" r="9"/><path d="M3.2 12h17.6M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/>',
		'chevron'     => '<path d="m6 9.5 6 6 6-6"/>',
		'file'        => '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/>',
		'zap'         => '<path d="M13.5 2.5 4 14h6.5l-1 7.5L20 10h-6.5l1-7.5Z"/>',
		'book'        => '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z"/><path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20"/>',
		'instagram'   => '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="0.6" fill="currentColor"/>',
		'linkedin'    => '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 10.5V17M7.5 7.6v.1M11.5 17v-6.5M11.5 13.4c0-1.7 1-2.6 2.4-2.6s2.1 1 2.1 2.6V17"/>',
	);

	return $paths;
}

/**
 * Renders one icon.
 *
 * @param string $name   Icon key.
 * @param int    $size   Pixel size.
 * @param float  $stroke Stroke width.
 * @param string $class  Extra class names.
 * @return string
 */
function lumyla_icon( $name, $size = 20, $stroke = 1.5, $class = '' ) {
	$paths = lumyla_icon_paths();

	if ( ! isset( $paths[ $name ] ) ) {
		return '';
	}

	return sprintf(
		'<svg viewBox="0 0 24 24" width="%1$d" height="%1$d" fill="none" stroke="currentColor" stroke-width="%2$s" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="%3$s">%4$s</svg>',
		(int) $size,
		esc_attr( (string) $stroke ),
		esc_attr( $class ),
		$paths[ $name ]
	);
}

/**
 * Echoes an icon.
 *
 * @param string $name   Icon key.
 * @param int    $size   Pixel size.
 * @param float  $stroke Stroke width.
 * @param string $class  Extra class names.
 * @return void
 */
function lumyla_the_icon( $name, $size = 20, $stroke = 1.5, $class = '' ) {
	echo lumyla_icon( $name, $size, $stroke, $class ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

/**
 * The gradient arrow that trails the primary buttons.
 *
 * @return void
 */
function lumyla_arrow() {
	lumyla_the_icon( 'arrow', 18, 1.5, 'icon-arrow' );
}
