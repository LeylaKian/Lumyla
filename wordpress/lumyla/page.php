<?php
/**
 * Default page template — any page that has no LUMYLA template of its own.
 *
 * @package Lumyla
 */

get_header();

while ( have_posts() ) :
	the_post();

	lumyla_page_hero(
		array(
			'eyebrow'    => '',
			'title'      => get_the_title(),
			'lead'       => has_excerpt() ? get_the_excerpt() : '',
			'breadcrumb' => array( array( 'label' => get_the_title() ) ),
		)
	);
	?>
	<section class="section">
		<div class="container container-wide">
			<div class="article">
				<div <?php echo lumyla_reveal_attrs( 0, 'prose' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
					<?php the_content(); ?>
				</div>
			</div>
		</div>
	</section>
	<?php
endwhile;

lumyla_final_cta();

get_footer();
