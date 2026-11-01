<?php
/**
 * Template Name: طراحی گرافیک
 * Template Post Type: page
 *
 * @package Lumyla
 */

get_header();

lumyla_page_hero(
	array(
		'eyebrow'    => 'GRAPHIC',
		'title'      => 'طراحی گرافیک و هویت بصری',
		'lead'       => 'خلق طراحی‌های منسجم و حرفه‌ای برای معرفی بهتر برند و ارتباط مؤثرتر با مخاطبان.',
		'breadcrumb' => array(
			array(
				'label' => 'خدمات',
				'to'    => lumyla_url( 'services' ),
			),
			array( 'label' => 'طراحی گرافیک' ),
		),
		'actions'    => lumyla_button(
			array(
				'label'   => 'درخواست مشاوره طراحی',
				'href'    => lumyla_consult_url( 'graphic' ),
				'variant' => 'primary',
			)
		),
	)
);

$lumyla_art  = array( 'prism', 'veil', 'aurora', 'orbit', 'ridge' );
$lumyla_tone = array( 'gold', 'rose', 'amber', 'gold', 'rose' );
?>

<section class="section" aria-labelledby="graphic-scope-title">
	<div class="container container-wide">
		<div <?php echo lumyla_reveal_attrs(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
			<?php
			lumyla_section_heading(
				array(
					'eyebrow' => 'خدمات گرافیک',
					'title'   => 'از یک قلم چاپی تا نظام بصری کامل',
					'lead'    => 'هر قلم طراحی، بخشی از تصویری است که مخاطب از برند شما می‌سازد؛ به همین دلیل انسجام بصری را جدی می‌گیریم.',
					'id'      => 'graphic-scope-title',
				)
			);
			?>
		</div>

		<div class="card-grid">
			<?php foreach ( lumyla_data( 'graphicScope' ) as $index => $item ) : ?>
				<div <?php echo lumyla_reveal_attrs( 50 * $index ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
					<article class="card card--hover webdesign-card">
						<div class="webdesign-card__visual">
							<?php lumyla_visual( $lumyla_art[ $index % count( $lumyla_art ) ], $lumyla_tone[ $index % count( $lumyla_tone ) ] ); ?>
						</div>
						<h3 class="webdesign-card__title" style="font-size:var(--fs-h4)"><?php echo esc_html( $item['title'] ); ?></h3>
						<p class="webdesign-card__desc"><?php echo esc_html( $item['desc'] ); ?></p>
					</article>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php
lumyla_final_cta();

get_footer();
