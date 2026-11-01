<?php
/**
 * Template Name: درباره لومیلا
 * Template Post Type: page
 *
 * @package Lumyla
 */

get_header();

lumyla_page_hero(
	array(
		'eyebrow'    => 'ABOUT LUMYLA',
		'title'      => 'از ایده تا درخشش در دنیای دیجیتال',
		'lead'       => 'لومیلا یک استودیوی خلاق دیجیتال است که با ترکیب استراتژی، طراحی و بهینه‌سازی، به کسب‌وکارها کمک می‌کند مسیر رشد آنلاین خود را حرفه‌ای‌تر و هدفمندتر طی کنند.',
		'breadcrumb' => array( array( 'label' => 'درباره لومیلا' ) ),
		'actions'    => lumyla_button(
			array(
				'label'   => 'گفتگو با لومیلا',
				'href'    => lumyla_consult_url( 'general' ),
				'variant' => 'primary',
			)
		),
	)
);
?>

<section class="section" aria-labelledby="story-title">
	<div class="container container-wide">
		<div class="intro__grid">
			<div <?php echo lumyla_reveal_attrs( 0, 'intro__content' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
				<p class="eyebrow eyebrow--fa">داستان ما</p>
				<h2 class="intro__title" id="story-title">نور از دل شب زاده می‌شود</h2>
				<div class="body-copy lead">
					<p>
						نام لومیلا از مفهوم «نور» می‌آید؛ نوری که در دل شب شکل می‌گیرد و مسیر را روشن
						می‌کند. برای ما این استعاره‌ای است از کاری که یک برند در فضای دیجیتال انجام
						می‌دهد: در میان انبوه اطلاعات و انتخاب‌ها، خودش را روشن و قابل تشخیص می‌کند.
					</p>
					<p>
						لومیلا با این باور کار می‌کند که طراحی زیبا بدون استراتژی، و سئوی فنی بدون تجربه
						کاربری، ناقص است. به همین دلیل خدمات را در کنار هم می‌بینیم: سئو، طراحی سایت،
						طراحی گرافیک و تجربه کاربری همه بخشی از یک مسیر واحد برای رشد هستند.
					</p>
					<p>
						تجربه اجرایی ما در سئو و طراحی، در حوزه‌های مختلف شکل گرفته است؛ از سایت‌های
						خدماتی تا فروشگاه‌های کوچک و متوسط. همین تنوع باعث شده هر پروژه را با شرایط و
						محدودیت‌های خودش ببینیم، نه با یک نسخه آماده برای همه.
					</p>
				</div>
			</div>

			<figure <?php echo lumyla_reveal_attrs( 100, 'intro__visual' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
				<img src="<?php echo esc_url( LUMYLA_URI . '/assets/brand/lumyla-hero.jpg' ); ?>" alt="نور طلایی در دل شب؛ نمادی از برند لومیلا" loading="lazy" decoding="async" width="1672" height="941">
				<span class="intro__visual-frame" aria-hidden="true"></span>
				<figcaption class="intro__visual-quote">
					<span>LUMYLA STUDIO</span>
					<strong>استراتژی، طراحی و بهینه‌سازی در یک مسیر منسجم.</strong>
				</figcaption>
			</figure>
		</div>
	</div>
</section>

<?php
lumyla_trust_section();
lumyla_process_section();
lumyla_why_section();
lumyla_final_cta();

get_footer();
