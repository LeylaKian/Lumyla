<?php
/**
 * Search results.
 *
 * @package Lumyla
 */

get_header();

$lumyla_query = get_search_query();

lumyla_page_hero(
	array(
		'eyebrow'    => 'SEARCH',
		'title'      => $lumyla_query ? 'نتایج جست‌وجو برای: ' . $lumyla_query : 'جست‌وجو در سایت',
		'lead'       => $lumyla_query ? 'نتیجه‌های مرتبط با کلمه جست‌وجو شده در سایت لومیلا.' : 'عبارت مورد نظر خود را جست‌وجو کنید.',
		'breadcrumb' => array( array( 'label' => 'جست‌وجو' ) ),
		'actions'    => '<form role="search" method="get" action="' . esc_url( home_url( '/' ) ) . '" class="search-dialog__field" style="max-width:420px">' . lumyla_icon( 'search', 18 ) . '<input type="search" name="s" value="' . esc_attr( $lumyla_query ) . '" placeholder="جست‌وجو در سایت…" aria-label="عبارت جست‌وجو"></form>',
	)
);
?>

<section class="section">
	<div class="container container-wide">
		<?php if ( have_posts() ) : ?>
			<div class="blog__grid">
				<?php
				$lumyla_index = 0;
				while ( have_posts() ) :
					the_post();
					?>
					<div <?php echo lumyla_reveal_attrs( 60 * $lumyla_index ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
						<?php
						if ( 'post' === get_post_type() ) {
							lumyla_post_card( lumyla_post_to_card( get_post() ) );
						} else {
							?>
							<a class="post-card" href="<?php the_permalink(); ?>">
								<div style="display:grid;gap:.7rem;align-content:start">
									<div class="post-card__meta"><span><?php echo esc_html( get_post_type_object( get_post_type() )->labels->singular_name ); ?></span></div>
									<h3 class="post-card__title"><?php the_title(); ?></h3>
									<p class="post-card__excerpt"><?php echo esc_html( get_the_excerpt() ); ?></p>
								</div>
							</a>
							<?php
						}
						?>
					</div>
					<?php
					$lumyla_index++;
				endwhile;
				?>
			</div>
		<?php else : ?>
			<p style="color:var(--text-3)">نتیجه‌ای برای این جست‌وجو پیدا نشد. عبارت دیگری را امتحان کنید.</p>
		<?php endif; ?>
	</div>
</section>

<?php
lumyla_final_cta();

get_footer();
