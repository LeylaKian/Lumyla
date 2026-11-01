<?php
/**
 * Fallback template: the journal listing.
 *
 * @package Lumyla
 */

get_header();

lumyla_page_hero(
	array(
		'eyebrow'    => 'JOURNAL',
		'title'      => is_home() && ! is_front_page() ? get_the_title( (int) get_option( 'page_for_posts' ) ) : 'مجله لومیلا',
		'lead'       => 'آموزش‌ها، تحلیل‌ها و ایده‌هایی برای رشد در دنیای دیجیتال.',
		'breadcrumb' => array( array( 'label' => 'مقالات' ) ),
	)
);

$lumyla_posts = lumyla_journal_by_category( 'all' );
?>

<section class="section">
	<div class="container container-wide">
		<?php if ( $lumyla_posts ) : ?>
			<div class="blog__grid">
				<?php foreach ( $lumyla_posts as $index => $lumyla_post ) : ?>
					<div <?php echo lumyla_reveal_attrs( 60 * $index ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
						<?php lumyla_post_card( $lumyla_post ); ?>
					</div>
				<?php endforeach; ?>
			</div>
		<?php else : ?>
			<p style="color:var(--text-3)">هنوز مقاله‌ای منتشر نشده است.</p>
		<?php endif; ?>
	</div>
</section>

<?php
lumyla_final_cta();

get_footer();
