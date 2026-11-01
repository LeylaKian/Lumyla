<?php
/**
 * Template Name: مجله لومیلا
 * Template Post Type: page
 *
 * @package Lumyla
 */

get_header();

lumyla_page_hero(
	array(
		'eyebrow'    => 'JOURNAL',
		'title'      => 'مجله لومیلا',
		'lead'       => 'آموزش‌ها، تحلیل‌ها و ایده‌هایی برای رشد در دنیای دیجیتال.',
		'breadcrumb' => array( array( 'label' => 'مقالات' ) ),
	)
);

$lumyla_posts      = lumyla_journal_by_category( 'all' );
$lumyla_categories = array();
foreach ( get_categories( array( 'hide_empty' => true ) ) as $lumyla_term ) {
	$lumyla_categories[] = array(
		'key'   => $lumyla_term->slug,
		'label' => $lumyla_term->name,
	);
}
?>

<section class="section" aria-label="فهرست مقالات">
	<div class="container container-wide">
		<?php if ( $lumyla_categories ) : ?>
			<div class="filter-bar" role="group" aria-label="دسته‌بندی مقالات" data-filter-group="journal">
				<button type="button" class="filter-chip" aria-pressed="true" data-filter="all">همه</button>
				<?php foreach ( $lumyla_categories as $lumyla_category ) : ?>
					<button type="button" class="filter-chip" aria-pressed="false" data-filter="<?php echo esc_attr( $lumyla_category['key'] ); ?>">
						<?php echo esc_html( $lumyla_category['label'] ); ?>
					</button>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>

		<?php if ( $lumyla_posts ) : ?>
			<div class="blog__grid" data-filter-target="journal" style="margin-top:2rem">
				<?php foreach ( $lumyla_posts as $index => $lumyla_post ) : ?>
					<div <?php echo lumyla_reveal_attrs( 60 * $index ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> data-category="<?php echo esc_attr( $lumyla_post['category'] ); ?>">
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
