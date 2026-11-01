<?php
/**
 * Journal article.
 *
 * @package Lumyla
 */

get_header();

while ( have_posts() ) :
	the_post();

	$lumyla_categories = get_the_category();
	$lumyla_label      = $lumyla_categories ? $lumyla_categories[0]->name : 'مجله';
	$lumyla_reading    = get_post_meta( get_the_ID(), 'lumyla_reading_time', true );
	$lumyla_related    = lumyla_journal_posts( 3, get_the_ID() );

	lumyla_page_hero(
		array(
			'eyebrow'    => $lumyla_label,
			'title'      => get_the_title(),
			'lead'       => get_the_excerpt(),
			'breadcrumb' => array(
				array(
					'label' => 'مقالات',
					'to'    => lumyla_url( 'blog' ),
				),
				array( 'label' => $lumyla_label ),
			),
		)
	);
	?>
	<article class="section" aria-label="<?php echo esc_attr( get_the_title() ); ?>">
		<div class="container container-wide">
			<div class="article">
				<div <?php echo lumyla_reveal_attrs( 0, 'prose' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
					<div class="meta-row" style="margin-bottom:1.5rem">
						<span><?php echo esc_html( $lumyla_label ); ?></span>
						<?php if ( $lumyla_reading ) : ?>
							<span><?php echo esc_html( $lumyla_reading ); ?> مطالعه</span>
						<?php endif; ?>
						<span><?php echo esc_html( get_the_date() ); ?></span>
					</div>

					<?php the_content(); ?>

					<?php
					lumyla_cta_band(
						array(
							'title' => 'درباره پروژه خودتان صحبت کنیم',
							'desc'  => 'اگر می‌خواهید این موضوع را برای کسب‌وکار خودتان بررسی کنیم، درخواست مشاوره بدهید.',
							'link'  => lumyla_button(
								array(
									'label'   => 'دریافت مشاوره',
									'href'    => lumyla_consult_url( 'general' ),
									'variant' => 'primary',
									'size'    => 'sm',
								)
							),
						)
					);
					?>
				</div>

				<aside class="article__aside" aria-label="مقالات مرتبط">
					<h3>مقالات مرتبط</h3>
					<ul>
						<?php foreach ( $lumyla_related as $lumyla_post ) : ?>
							<li><a href="<?php echo esc_url( $lumyla_post['permalink'] ); ?>"><?php echo esc_html( $lumyla_post['title'] ); ?></a></li>
						<?php endforeach; ?>
					</ul>
					<a class="btn btn--quiet" href="<?php echo esc_url( lumyla_url( 'blog' ) ); ?>" style="justify-self:start;font-size:var(--fs-xs)">
						همه مقالات
						<?php lumyla_the_icon( 'arrow', 14 ); ?>
					</a>
				</aside>
			</div>
		</div>
	</article>
	<?php
endwhile;

lumyla_final_cta();

get_footer();
