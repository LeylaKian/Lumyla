<?php
/**
 * The home page composition, shared by front-page.php and the "خانه" page
 * template so either WordPress front page setting works.
 *
 * @package Lumyla
 */

lumyla_hero();
lumyla_intro();
lumyla_services_section();
lumyla_pricing_section();
lumyla_website_design_section();
lumyla_process_section();
lumyla_why_section();
lumyla_portfolio_section( array( 'limit' => 3 ) );
lumyla_trust_section();
lumyla_blog_section();
lumyla_faq_section();
lumyla_contact_section();
lumyla_final_cta();

// FAQ rich result, exactly as the React build emits it.
$lumyla_schema = array(
	'@context'   => 'https://schema.org',
	'@type'      => 'FAQPage',
	'mainEntity' => array(),
);

foreach ( lumyla_data( 'faq' ) as $lumyla_question ) {
	$lumyla_schema['mainEntity'][] = array(
		'@type'          => 'Question',
		'name'           => $lumyla_question['q'],
		'acceptedAnswer' => array(
			'@type' => 'Answer',
			'text'  => $lumyla_question['a'],
		),
	);
}
?>
<script type="application/ld+json"><?php echo wp_json_encode( $lumyla_schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ); ?></script>
