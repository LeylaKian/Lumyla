<?php
/**
 * CardVisual — the generative nightscape used wherever the studio needs a
 * cinematic thumbnail without inventing client photography.
 *
 * Ported one to one from the React component so both builds share a look.
 *
 * @package Lumyla
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Palette per tone.
 *
 * @return array<string,array<string,string>>
 */
function lumyla_visual_tones() {
	return array(
		'gold'  => array(
			'a'    => '#CFB2A2',
			'b'    => '#EFE2DA',
			'deep' => '#131a2a',
		),
		'amber' => array(
			'a'    => '#D9A66C',
			'b'    => '#F1D3AC',
			'deep' => '#161a28',
		),
		'rose'  => array(
			'a'    => '#905954',
			'b'    => '#D8B2A4',
			'deep' => '#1a1620',
		),
	);
}

/**
 * The artwork for one variant.
 *
 * @param string               $variant Variant key.
 * @param array<string,string> $tone    Palette.
 * @param string               $id      Unique id for the gradients.
 * @return string
 */
function lumyla_visual_art( $variant, $tone, $id ) {
	$a = $tone['a'];
	$b = $tone['b'];

	switch ( $variant ) {
		case 'grid':
			$lines = '';
			foreach ( range( -6, 6 ) as $i ) {
				$x      = 300 + ( $i * 74 );
				$lines .= sprintf( '<line x1="%1$s" y1="400" x2="300" y2="224" stroke-opacity="0.16"/>', $x );
			}
			$ys = array( 234, 250, 272, 302, 342, 392 );
			foreach ( $ys as $index => $y ) {
				$lines .= sprintf(
					'<line x1="0" y1="%1$s" x2="600" y2="%1$s" stroke-opacity="%2$s"/>',
					$y,
					round( 0.3 - ( $index * 0.038 ), 3 )
				);
			}

			return sprintf(
				'<g stroke="%1$s" fill="none"><ellipse cx="300" cy="224" rx="150" ry="26" fill="url(#%2$s-halo)" stroke="none"/>%3$s<circle cx="300" cy="162" r="26" fill="%4$s" fill-opacity="0.14" stroke="none"/><circle cx="300" cy="162" r="26" stroke-opacity="0.4"/><path d="M0 224 H600" stroke-opacity="0.5"/></g>',
				$a,
				$id,
				$lines,
				$b
			);

		case 'prism':
			return sprintf(
				'<g><path d="M188 300 L286 116 L392 300 Z" fill="%1$s" fill-opacity="0.08" stroke="%1$s" stroke-opacity="0.4"/>' .
				'<path d="M286 116 L392 300 L300 300 Z" fill="%2$s" fill-opacity="0.07" stroke="%1$s" stroke-opacity="0.22"/>' .
				'<path d="M120 306 L246 288 L360 306 L232 330 Z" fill="%1$s" fill-opacity="0.05" stroke="%1$s" stroke-opacity="0.16"/>' .
				'<path d="M286 116 L262 330" stroke="%1$s" stroke-opacity="0.18"/>' .
				'<circle cx="286" cy="116" r="3" fill="%2$s"/><circle cx="286" cy="116" r="12" fill="%2$s" fill-opacity="0.16"/></g>',
				$a,
				$b
			);

		case 'aurora':
			return sprintf(
				'<g fill="none"><g filter="url(#%3$s-blur)">' .
				'<path d="M-40 268 C 110 168, 210 330, 330 214 S 560 138, 660 210" stroke="%1$s" stroke-width="46" stroke-opacity="0.28"/>' .
				'<path d="M-40 320 C 130 236, 250 378, 380 268 S 580 214, 660 262" stroke="%2$s" stroke-width="30" stroke-opacity="0.16"/>' .
				'<path d="M-40 196 C 140 108, 250 244, 400 162 S 590 108, 660 156" stroke="%1$s" stroke-width="20" stroke-opacity="0.18"/>' .
				'</g><g fill="%2$s"><circle cx="120" cy="92" r="1.6" fill-opacity="0.7"/><circle cx="212" cy="140" r="1.1" fill-opacity="0.5"/>' .
				'<circle cx="352" cy="86" r="1.4" fill-opacity="0.6"/><circle cx="470" cy="176" r="1" fill-opacity="0.45"/><circle cx="546" cy="104" r="1.7" fill-opacity="0.6"/></g></g>',
				$a,
				$b,
				$id
			);

		case 'veil':
			$beams = array(
				array(
					'x' => 150,
					'w' => 34,
					'o' => 0.16,
				),
				array(
					'x' => 214,
					'w' => 16,
					'o' => 0.24,
				),
				array(
					'x' => 296,
					'w' => 52,
					'o' => 0.12,
				),
				array(
					'x' => 392,
					'w' => 22,
					'o' => 0.2,
				),
				array(
					'x' => 452,
					'w' => 12,
					'o' => 0.28,
				),
			);
			$rects = '';
			foreach ( $beams as $beam ) {
				$rects .= sprintf(
					'<rect x="%1$d" y="-40" width="%2$d" height="480" fill="%3$s" fill-opacity="%4$s" transform="rotate(9 %1$d 200)"/>',
					$beam['x'],
					$beam['w'],
					$a,
					$beam['o']
				);
			}

			return sprintf(
				'<g>%1$s<path d="M0 318 H600" stroke="%2$s" stroke-opacity="0.28"/><ellipse cx="300" cy="330" rx="230" ry="26" fill="%3$s" fill-opacity="0.1"/><path d="M0 318 H600" stroke="%3$s" stroke-opacity="0.14" transform="translate(0 8)"/></g>',
				$rects,
				$a,
				$b
			);

		case 'ridge':
			return sprintf(
				'<g><circle cx="410" cy="126" r="40" fill="%2$s" fill-opacity="0.1"/><circle cx="410" cy="126" r="40" stroke="%1$s" stroke-opacity="0.3" fill="none"/>' .
				'<circle cx="410" cy="126" r="58" stroke="%1$s" stroke-opacity="0.12" fill="none"/>' .
				'<path d="M0 300 L96 214 L164 262 L246 176 L330 268 L420 212 L508 286 L600 232 L600 400 L0 400 Z" fill="#0d1422" stroke="%1$s" stroke-opacity="0.24"/>' .
				'<path d="M0 340 L88 292 L170 330 L268 268 L372 342 L470 302 L600 352 L600 400 L0 400 Z" fill="#080e1b" stroke="%1$s" stroke-opacity="0.16"/>' .
				'<g fill="%2$s"><circle cx="96" cy="82" r="1.4" fill-opacity="0.7"/><circle cx="188" cy="52" r="1" fill-opacity="0.5"/>' .
				'<circle cx="268" cy="102" r="1.6" fill-opacity="0.6"/><circle cx="520" cy="72" r="1.1" fill-opacity="0.55"/></g></g>',
				$a,
				$b
			);

		case 'orbit':
		default:
			return sprintf(
				'<g fill="none" stroke="%1$s"><ellipse cx="300" cy="205" rx="215" ry="96" transform="rotate(-16 300 205)" stroke-opacity="0.32"/>' .
				'<ellipse cx="300" cy="205" rx="168" ry="74" transform="rotate(-16 300 205)" stroke-opacity="0.22"/>' .
				'<ellipse cx="300" cy="205" rx="120" ry="52" transform="rotate(-16 300 205)" stroke-opacity="0.16"/>' .
				'<circle cx="300" cy="205" r="34" stroke-opacity="0.5"/><circle cx="300" cy="205" r="34" fill="%1$s" fill-opacity="0.1" stroke="none"/>' .
				'<circle cx="470" cy="128" r="3.4" fill="%2$s" stroke="none"/><circle cx="470" cy="128" r="11" fill="%2$s" fill-opacity="0.18" stroke="none"/>' .
				'<circle cx="146" cy="286" r="2.2" fill="%1$s" stroke="none" fill-opacity="0.8"/></g>',
				$a,
				$b
			);
	}
}

/**
 * Prints one card visual.
 *
 * @param string $variant orbit|grid|prism|aurora|veil|ridge.
 * @param string $tone    gold|amber|rose.
 * @param string $label   Small uppercase label inside the artwork.
 * @param string $sub     Sub label, defaults to LUMYLA.
 * @return void
 */
function lumyla_visual( $variant = 'orbit', $tone = 'gold', $label = '', $sub = 'LUMYLA' ) {
	static $counter = 0;

	$counter++;
	$id    = 'lv' . $counter;
	$tones = lumyla_visual_tones();
	$pal   = isset( $tones[ $tone ] ) ? $tones[ $tone ] : $tones['gold'];
	$art   = lumyla_visual_art( $variant, $pal, $id );

	echo '<div class="visual">';
	echo '<svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" role="presentation" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%">';
	echo '<defs>';
	printf(
		'<radialGradient id="%1$s-sky" cx="52%%" cy="10%%" r="90%%"><stop offset="0%%" stop-color="%2$s" stop-opacity="0.2"/><stop offset="42%%" stop-color="%3$s" stop-opacity="0.9"/><stop offset="100%%" stop-color="#060a12"/></radialGradient>',
		esc_attr( $id ),
		esc_attr( $pal['a'] ),
		esc_attr( $pal['deep'] )
	);
	printf(
		'<radialGradient id="%1$s-halo" cx="50%%" cy="50%%" r="50%%"><stop offset="0%%" stop-color="%2$s" stop-opacity="0.4"/><stop offset="100%%" stop-color="%2$s" stop-opacity="0"/></radialGradient>',
		esc_attr( $id ),
		esc_attr( $pal['b'] )
	);
	printf(
		'<linearGradient id="%1$s-vig" x1="0" y1="0" x2="0" y2="1"><stop offset="0%%" stop-color="#050810" stop-opacity="0.15"/><stop offset="70%%" stop-color="#050810" stop-opacity="0.05"/><stop offset="100%%" stop-color="#050810" stop-opacity="0.72"/></linearGradient>',
		esc_attr( $id )
	);
	printf(
		'<filter id="%s-blur" x="-20%%" y="-40%%" width="140%%" height="180%%"><feGaussianBlur stdDeviation="14"/></filter>',
		esc_attr( $id )
	);
	echo '</defs>';
	printf( '<rect width="600" height="400" fill="url(#%s-sky)"/>', esc_attr( $id ) );
	echo lumyla_visual_art( $variant, $pal, $id ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	printf( '<rect width="600" height="400" fill="url(#%s-vig)"/>', esc_attr( $id ) );
	echo '</svg>';
	echo '<div class="visual__grain"></div>';

	if ( $label ) {
		echo '<div class="visual__label"><strong>' . esc_html( $label ) . '</strong><span>' . esc_html( $sub ) . '</span></div>';
	}

	echo '</div>';
}
