<?php
/**
 * The page sections, ported one to one from the studio's React build so the
 * WordPress theme renders the same design.
 *
 * @package Lumyla
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Pinned, scroll-scrubbed hero.
 *
 * The section ships in its static form and theme.js upgrades it to the pinned
 * runway once the video metadata is available — so a visitor without
 * JavaScript, with reduced motion, or without video support still gets a
 * complete, readable hero.
 *
 * @return void
 */
function lumyla_hero() {
	$signals = array(
		array(
			'icon'  => 'search',
			'label' => 'سئو و رشد ارگانیک',
		),
		array(
			'icon'  => 'layout',
			'label' => 'طراحی سایت با وردپرس',
		),
		array(
			'icon'  => 'pen',
			'label' => 'هویت بصری و گرافیک',
		),
	);
	?>
	<section class="hero-scroll hero-scroll--static" data-hero aria-labelledby="hero-title">
		<div class="hero">
			<div class="hero__media" aria-hidden="true">
				<div class="hero__plate"></div>
				<video class="hero__video" data-hero-video poster="<?php echo esc_url( LUMYLA_URI . '/assets/media/hero-poster.jpg' ); ?>" preload="auto" muted playsinline disablepictureinpicture tabindex="-1" data-src-desktop="<?php echo esc_url( LUMYLA_URI . '/assets/media/hero-scrub-1600.mp4' ); ?>" data-src-mobile="<?php echo esc_url( LUMYLA_URI . '/assets/media/hero-scrub-960.mp4' ); ?>">
					<source src="<?php echo esc_url( LUMYLA_URI . '/assets/media/hero-scrub-1600.mp4' ); ?>" type="video/mp4">
				</video>
			</div>

			<div class="hero__veil" role="presentation"></div>

			<div class="container container-wide hero__inner">
				<div class="hero__content" data-hero-content>
					<p class="hero__eyebrow">LUMYLA CREATIVE DIGITAL STUDIO</p>

					<h1 class="hero__title" id="hero-title">
						لومیلا، جایی که <em>خلاقیت</em> به رشد تبدیل می‌شود
					</h1>

					<p class="hero__subtitle">راهکارهای خلاقانه برای رشد آنلاین کسب‌وکار شما</p>

					<p class="hero__desc">
						از سئو و طراحی سایت با وردپرس تا طراحی گرافیک، کمک می‌کنیم حضوری حرفه‌ای، هدفمند و
						متمایز در فضای آنلاین داشته باشید.
					</p>

					<div class="hero__actions">
						<?php
						echo lumyla_button( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
							array(
								'label'   => 'دریافت مشاوره',
								'href'    => lumyla_consult_url( 'general' ),
								'variant' => 'primary',
								'size'    => 'lg',
							)
						);
						echo lumyla_button( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
							array(
								'label'   => 'آشنایی با خدمات',
								'href'    => lumyla_url( 'services' ),
								'variant' => 'ghost',
								'size'    => 'lg',
								'icon'    => false,
							)
						);
						?>
					</div>

					<div class="hero__meta">
						<?php foreach ( $signals as $signal ) : ?>
							<span class="hero__meta-item">
								<?php lumyla_the_icon( $signal['icon'] ); ?>
								<?php echo esc_html( $signal['label'] ); ?>
							</span>
						<?php endforeach; ?>
					</div>
				</div>
			</div>

			<div class="hero__loader" data-hero-loader aria-hidden="true">
				<span class="hero__loader-text">آماده‌سازی صحنه</span>
				<span class="hero__loader-line"></span>
			</div>

			<div class="hero__cue" data-hero-cue aria-hidden="true">
				<span class="hero__cue-text">برای حرکت در صحنه اسکرول کنید</span>
				<span class="hero__cue-track"></span>
			</div>
		</div>
	</section>
	<?php
}

/**
 * About / intro band.
 *
 * @return void
 */
function lumyla_intro() {
	$pillars = array(
		array(
			'title' => 'استراتژی',
			'desc'  => 'تصمیم‌ها بر پایه داده و اهداف واقعی کسب‌وکار.',
		),
		array(
			'title' => 'طراحی',
			'desc'  => 'زبان بصری منسجم و متناسب با هویت برند.',
		),
		array(
			'title' => 'بهینه‌سازی',
			'desc'  => 'ساختار فنی و محتوایی آماده برای دیده‌شدن.',
		),
		array(
			'title' => 'رشد',
			'desc'  => 'پایش مستمر و بهبود تدریجی مسیر دیجیتال.',
		),
	);
	?>
	<section class="section intro" aria-labelledby="intro-title">
		<div class="section-glow" style="inset-inline-start:-8%;top:10%" aria-hidden="true"></div>
		<div class="container container-wide">
			<div class="intro__grid">
				<div <?php echo lumyla_reveal_attrs( 0, 'intro__content' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
					<p class="eyebrow eyebrow--fa">درباره لومیلا</p>
					<h2 class="intro__title" id="intro-title">از ایده تا درخشش در دنیای دیجیتال</h2>
					<p class="lead">
						لومیلا یک استودیوی خلاق دیجیتال است که با ترکیب استراتژی، طراحی و بهینه‌سازی، به
						کسب‌وکارها کمک می‌کند مسیر رشد آنلاین خود را حرفه‌ای‌تر و هدفمندتر طی کنند.
					</p>

					<div class="intro__pillars">
						<?php foreach ( $pillars as $pillar ) : ?>
							<div class="intro__pillar">
								<strong><?php echo esc_html( $pillar['title'] ); ?></strong>
								<span><?php echo esc_html( $pillar['desc'] ); ?></span>
							</div>
						<?php endforeach; ?>
					</div>

					<div class="btn-group" style="margin-top:.5rem">
						<a class="btn btn--ghost" href="<?php echo esc_url( lumyla_url( 'about' ) ); ?>">
							بیشتر درباره لومیلا
							<?php lumyla_arrow(); ?>
						</a>
					</div>
				</div>

				<figure <?php echo lumyla_reveal_attrs( 120, 'intro__visual' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
					<img src="<?php echo esc_url( LUMYLA_URI . '/assets/brand/deep-space.jpg' ); ?>" alt="آسمان شب و قوس‌های طلایی؛ استعاره‌ای از نور و رشد" loading="lazy" decoding="async" width="1024" height="409">
					<span class="intro__visual-frame" aria-hidden="true"></span>
					<figcaption class="intro__visual-quote">
						<span>LIGHT BORN FROM THE NIGHT</span>
						<strong>نور از دل شب زاده می‌شود؛ همان‌طور که ایده‌ای روشن از دل یک مسئله.</strong>
					</figcaption>
				</figure>
			</div>
		</div>
	</section>
	<?php
}

/**
 * Services band with the SEO feature card first.
 *
 * @return void
 */
function lumyla_services_section() {
	$services = lumyla_data( 'services' );
	$seo      = array_shift( $services );
	?>
	<section class="section section--raised" aria-labelledby="services-title">
		<div class="container container-wide">
			<div <?php echo lumyla_reveal_attrs(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
				<?php
				lumyla_section_heading(
					array(
						'eyebrow' => 'خدمات',
						'title'   => 'خدمات لومیلا',
						'lead'    => 'راهکارهایی برای ساختن، دیده‌شدن و رشد کردن',
						'id'      => 'services-title',
						'wide'    => true,
						'action'  => '<a class="btn btn--ghost btn--sm" href="' . esc_url( lumyla_url( 'services' ) ) . '">همه خدمات' . lumyla_icon( 'arrow', 18, 1.5, 'icon-arrow' ) . '</a>',
					)
				);
				?>
			</div>

			<div class="services__grid">
				<div <?php echo lumyla_reveal_attrs( 0, 'card card--hover service-feature' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> style="margin:0">
					<div class="service-feature__body">
						<div style="display:flex;align-items:center;gap:.75rem">
							<span class="service-card__icon"><?php lumyla_the_icon( $seo['icon'] ); ?></span>
							<p class="eyebrow"><?php echo esc_html( $seo['kicker'] ); ?></p>
						</div>
						<h3 class="service-feature__title"><?php echo esc_html( $seo['title'] ); ?></h3>
						<p class="service-card__desc" style="font-size:var(--fs-sm)"><?php echo esc_html( $seo['desc'] ); ?></p>
						<div class="btn-group">
							<a class="btn btn--primary btn--sm" href="<?php echo esc_url( lumyla_url( 'pricing' ) ); ?>">
								مشاهده تعرفه سئو
								<?php lumyla_arrow(); ?>
							</a>
							<a class="btn btn--ghost btn--sm" href="<?php echo esc_url( lumyla_url( 'services/seo' ) ); ?>">جزئیات خدمات سئو</a>
						</div>
					</div>

					<ul class="service-feature__list">
						<?php foreach ( $seo['features'] as $feature ) : ?>
							<li><?php lumyla_the_icon( 'check', 20, 2 ); ?><?php echo esc_html( $feature ); ?></li>
						<?php endforeach; ?>
					</ul>
				</div>

				<?php foreach ( $services as $index => $service ) : ?>
					<div <?php echo lumyla_reveal_attrs( 80 * ( $index + 1 ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
						<?php lumyla_service_card( $service ); ?>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</section>
	<?php
}

/**
 * SEO pricing packages.
 *
 * @param array $args Optional eyebrow/title/lead/id overrides.
 * @return void
 */
function lumyla_pricing_section( $args = array() ) {
	$args = wp_parse_args(
		$args,
		array(
			'eyebrow' => 'تعرفه',
			'title'   => 'تعرفه خدمات سئو لومیلا',
			'lead'    => 'پکیج‌های متناسب با اهداف، میزان رقابت و مرحله رشد کسب‌وکار شما',
			'id'      => 'pricing-title',
		)
	);
	?>
	<section class="section section--inset" aria-labelledby="<?php echo esc_attr( $args['id'] ); ?>">
		<div class="container container-wide">
			<div <?php echo lumyla_reveal_attrs(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
				<?php
				lumyla_section_heading(
					array(
						'eyebrow' => $args['eyebrow'],
						'title'   => $args['title'],
						'lead'    => $args['lead'],
						'align'   => 'center',
						'id'      => $args['id'],
					)
				);
				?>
			</div>

			<div class="pricing__grid">
				<?php foreach ( lumyla_data( 'pricingPackages' ) as $index => $pkg ) : ?>
					<div <?php echo lumyla_reveal_attrs( 60 * $index ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
						<?php lumyla_pricing_card( $pkg ); ?>
					</div>
				<?php endforeach; ?>
			</div>

			<ul class="pricing__notes">
				<?php foreach ( lumyla_data( 'pricingNotes' ) as $note ) : ?>
					<li><?php echo esc_html( $note ); ?></li>
				<?php endforeach; ?>
			</ul>
		</div>
	</section>
	<?php
}

/**
 * Website design solutions band.
 *
 * @return void
 */
function lumyla_website_design_section() {
	?>
	<section class="section" aria-labelledby="webdesign-title">
		<div class="container container-wide">
			<div <?php echo lumyla_reveal_attrs(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
				<?php
				lumyla_section_heading(
					array(
						'eyebrow' => 'طراحی سایت',
						'title'   => 'طراحی سایت، متناسب با هویت و آینده کسب‌وکار شما',
						'lead'    => 'هزینه طراحی سایت ثابت نیست؛ محدوده پروژه، پیچیدگی طراحی و امکانات مورد نیاز، مسیر و بودجه را مشخص می‌کند. هر پروژه با یک جلسه مشاوره آغاز می‌شود.',
						'id'      => 'webdesign-title',
					)
				);
				?>
			</div>

			<div class="webdesign__grid">
				<?php foreach ( lumyla_data( 'websiteSolutions' ) as $index => $solution ) : ?>
					<div <?php echo lumyla_reveal_attrs( 70 * $index ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
						<article class="card card--hover webdesign-card">
							<div class="webdesign-card__visual">
								<?php lumyla_visual( $solution['art'], 'gold', $solution['kicker'] ); ?>
							</div>
							<h3 class="webdesign-card__title"><?php echo esc_html( $solution['title'] ); ?></h3>
							<p class="webdesign-card__desc"><?php echo esc_html( $solution['desc'] ); ?></p>
							<ul class="webdesign-card__list">
								<?php foreach ( $solution['features'] as $feature ) : ?>
									<li><?php echo esc_html( $feature ); ?></li>
								<?php endforeach; ?>
							</ul>
							<div style="margin-top:auto;padding-top:.4rem">
								<?php
								lumyla_consult_button(
									array(
										'label'   => $solution['cta']['label'],
										'service' => $solution['cta']['intent']['service'],
										'variant' => 'quiet',
									)
								);
								?>
							</div>
						</article>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</section>
	<?php
}

/**
 * Collaboration process rail.
 *
 * @return void
 */
function lumyla_process_section() {
	?>
	<section class="section section--raised process" aria-labelledby="process-title">
		<div class="container container-wide">
			<div <?php echo lumyla_reveal_attrs(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
				<?php
				lumyla_section_heading(
					array(
						'eyebrow' => 'مسیر همکاری',
						'title'   => 'مسیر همکاری با لومیلا',
						'lead'    => 'یک فرایند روشن، از اولین گفتگو تا توسعه پایدار.',
						'id'      => 'process-title',
						'wide'    => true,
					)
				);
				?>
			</div>

			<ol class="process__rail">
				<?php foreach ( lumyla_data( 'process' ) as $index => $item ) : ?>
					<li <?php echo lumyla_reveal_attrs( 90 * $index, 'process__step' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
						<span class="process__dot num"><?php echo esc_html( $item['step'] ); ?></span>
						<h3 class="process__title"><?php echo esc_html( $item['title'] ); ?></h3>
						<p class="process__desc"><?php echo esc_html( $item['desc'] ); ?></p>
					</li>
				<?php endforeach; ?>
			</ol>
		</div>
	</section>
	<?php
}

/**
 * "Why LUMYLA" split band.
 *
 * @return void
 */
function lumyla_why_section() {
	?>
	<section class="section" aria-labelledby="why-title">
		<div class="container container-wide">
			<div class="why__grid">
				<div <?php echo lumyla_reveal_attrs( 0, 'why__aside' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
					<p class="eyebrow eyebrow--fa">چرا لومیلا؟</p>
					<h2 class="section-head__title" id="why-title">چرا لومیلا؟</h2>
					<p class="section-head__lead">
						ما به جای ارائه یک نسخه ثابت برای همه، مسیر همکاری را بر اساس شرایط واقعی هر پروژه
						می‌سازیم.
					</p>
					<div class="btn-group">
						<?php
						lumyla_consult_button(
							array(
								'label'   => 'گفتگو درباره پروژه',
								'service' => 'general',
								'variant' => 'ghost',
							)
						);
						?>
					</div>
				</div>

				<div class="why__list">
					<?php foreach ( lumyla_data( 'advantages' ) as $index => $item ) : ?>
						<div <?php echo lumyla_reveal_attrs( 60 * $index, 'why__item' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
							<span class="why__num num"><?php echo esc_html( '۰' . lumyla_fa_number( $index + 1 ) ); ?></span>
							<div>
								<h3><?php echo esc_html( $item['title'] ); ?></h3>
								<p><?php echo esc_html( $item['desc'] ); ?></p>
							</div>
						</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>
	</section>
	<?php
}

/**
 * Portfolio grid.
 *
 * @param array $args {
 *     @type int  $limit       How many projects to show; 0 for all.
 *     @type bool $showFilters Render the category filter bar.
 * }
 * @return void
 */
function lumyla_portfolio_section( $args = array() ) {
	$args = wp_parse_args(
		$args,
		array(
			'limit'       => 0,
			'showFilters' => false,
		)
	);

	$projects = lumyla_projects( $args['limit'] );
	?>
	<section class="section" id="portfolio" aria-labelledby="portfolio-title">
		<div class="container container-wide">
			<div <?php echo lumyla_reveal_attrs(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
				<?php
				lumyla_section_heading(
					array(
						'eyebrow' => 'نمونه‌کارها',
						'title'   => 'نمونه‌کارهای لومیلا',
						'lead'    => 'منطق طراحی، ساختار و اجرا در هر پروژه؛ نمونه‌های زیر برای نمایش ساختار و زبان بصری بخش نمونه‌کارها آماده شده‌اند و با پروژه‌های واقعی جایگزین می‌شوند.',
						'id'      => 'portfolio-title',
						'wide'    => true,
						'action'  => $args['showFilters'] ? '' : '<a class="btn btn--ghost btn--sm" href="' . esc_url( lumyla_url( 'portfolio' ) ) . '">همه نمونه‌کارها' . lumyla_icon( 'arrow', 18, 1.5, 'icon-arrow' ) . '</a>',
					)
				);
				?>
			</div>

			<?php if ( $args['showFilters'] ) : ?>
				<div class="filter-bar" role="group" aria-label="دسته‌بندی نمونه‌کارها" style="margin-top:1.75rem" data-filter-group="portfolio">
					<?php foreach ( lumyla_data( 'portfolioCategories' ) as $index => $category ) : ?>
						<button type="button" class="filter-chip" aria-pressed="<?php echo 0 === $index ? 'true' : 'false'; ?>" data-filter="<?php echo esc_attr( $category['key'] ); ?>">
							<?php echo esc_html( $category['label'] ); ?>
						</button>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>

			<div class="portfolio__grid" data-filter-target="portfolio">
				<?php foreach ( $projects as $index => $project ) : ?>
					<?php $wide = 0 === $index && ! $args['showFilters']; ?>
					<div <?php echo lumyla_reveal_attrs( 70 * $index, $wide ? 'portfolio-card--wide' : '' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> style="display:block" data-category="<?php echo esc_attr( $project['category'] ); ?>">
						<?php lumyla_portfolio_card( $project, $wide ); ?>
					</div>
				<?php endforeach; ?>
			</div>

			<p class="portfolio__note">
				<?php lumyla_the_icon( 'sparkles', 15 ); ?>
				موارد نشان‌دار «نمونه نمایشی» فاقد ادعای نتیجه واقعی هستند و قابل جایگزینی با پروژه‌های شما
				هستند.
			</p>
		</div>
	</section>
	<?php
}

/**
 * Principles band (real testimonials would replace it when they exist).
 *
 * @return void
 */
function lumyla_trust_section() {
	$testimonials = lumyla_data( 'testimonials' );
	$has          = ! empty( $testimonials );
	?>
	<section class="section" aria-labelledby="trust-title">
		<div class="container container-wide">
			<div <?php echo lumyla_reveal_attrs(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
				<?php
				lumyla_section_heading(
					array(
						'eyebrow' => $has ? 'تجربه همکاری' : 'اصول همکاری',
						'title'   => $has ? 'تجربه همکاری با لومیلا' : 'همکاری با لومیلا چگونه است؟',
						'lead'    => $has ? 'بازخورد واقعی کارفرمایان درباره روند همکاری با استودیو.' : 'سه اصلی که در تمام پروژه‌ها ثابت می‌ماند؛ مستقل از اندازه یا نوع کسب‌وکار.',
						'id'      => 'trust-title',
						'align'   => 'center',
					)
				);
				?>
			</div>

			<div class="trust__grid">
				<?php if ( $has ) : ?>
					<?php foreach ( $testimonials as $index => $item ) : ?>
						<div <?php echo lumyla_reveal_attrs( 70 * $index ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
							<figure class="card trust-card">
								<blockquote style="color:var(--text-2);line-height:1.95;font-size:var(--fs-sm)">«<?php echo esc_html( $item['quote'] ); ?>»</blockquote>
								<figcaption style="color:var(--gold);font-size:var(--fs-xs)">
									<?php echo esc_html( $item['name'] ); ?><?php echo ! empty( $item['role'] ) ? esc_html( ' — ' . $item['role'] ) : ''; ?>
								</figcaption>
							</figure>
						</div>
					<?php endforeach; ?>
				<?php else : ?>
					<?php foreach ( lumyla_data( 'principles' ) as $index => $item ) : ?>
						<div <?php echo lumyla_reveal_attrs( 70 * $index ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
							<article class="card card--hover trust-card">
								<span class="trust-card__icon"><?php lumyla_the_icon( $item['icon'] ); ?></span>
								<h3><?php echo esc_html( $item['title'] ); ?></h3>
								<p><?php echo esc_html( $item['desc'] ); ?></p>
							</article>
						</div>
					<?php endforeach; ?>
				<?php endif; ?>
			</div>
		</div>
	</section>
	<?php
}

/**
 * Journal teaser: one featured article plus three more.
 *
 * @return void
 */
function lumyla_blog_section() {
	$posts = lumyla_journal_posts( 4 );

	if ( ! $posts ) {
		return;
	}

	$featured = array_shift( $posts );
	?>
	<section class="section section--inset" aria-labelledby="blog-title">
		<div class="container container-wide">
			<div <?php echo lumyla_reveal_attrs(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
				<?php
				lumyla_section_heading(
					array(
						'eyebrow' => 'مجله لومیلا',
						'title'   => 'مجله لومیلا',
						'lead'    => 'آموزش‌ها، تحلیل‌ها و ایده‌هایی برای رشد در دنیای دیجیتال',
						'id'      => 'blog-title',
						'wide'    => true,
						'action'  => '<a class="btn btn--ghost btn--sm" href="' . esc_url( lumyla_url( 'blog' ) ) . '">همه مقالات' . lumyla_icon( 'arrow', 18, 1.5, 'icon-arrow' ) . '</a>',
					)
				);
				?>
			</div>

			<div <?php echo lumyla_reveal_attrs( 0, 'blog__featured' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
				<?php lumyla_post_card( $featured, true ); ?>
			</div>

			<div class="blog__grid">
				<?php foreach ( $posts as $index => $post ) : ?>
					<div <?php echo lumyla_reveal_attrs( 70 * $index ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
						<?php lumyla_post_card( $post ); ?>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</section>
	<?php
}

/**
 * FAQ accordion.
 *
 * @return void
 */
function lumyla_faq_section() {
	?>
	<section class="section section--raised" aria-labelledby="faq-title">
		<div class="container container-wide">
			<div class="faq__grid">
				<div <?php echo lumyla_reveal_attrs( 0, 'faq__aside' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
					<p class="eyebrow eyebrow--fa">پرسش‌های پرتکرار</p>
					<h2 class="section-head__title" id="faq-title">سؤالات متداول</h2>
					<p class="section-head__lead">
						اگر پاسخ سؤال خود را پیدا نکردید، در یک گفتگوی کوتاه درباره پروژه‌تان صحبت می‌کنیم.
					</p>
					<div class="btn-group" style="justify-self:start">
						<?php
						lumyla_consult_button(
							array(
								'label'   => 'پرسش دیگری دارم',
								'service' => 'general',
								'variant' => 'ghost',
								'size'    => 'sm',
							)
						);
						?>
					</div>
				</div>

				<div <?php echo lumyla_reveal_attrs( 100, 'accordion' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> data-accordion>
					<?php foreach ( lumyla_data( 'faq' ) as $index => $item ) : ?>
						<?php $open = 0 === $index; ?>
						<div class="accordion__item" data-open="<?php echo $open ? 'true' : 'false'; ?>">
							<h3 style="margin:0">
								<button type="button" class="accordion__trigger" aria-expanded="<?php echo $open ? 'true' : 'false'; ?>" aria-controls="faq-panel-<?php echo (int) $index; ?>" id="faq-trigger-<?php echo (int) $index; ?>">
									<span class="accordion__index num"><?php echo esc_html( '۰' . lumyla_fa_number( $index + 1 ) ); ?></span>
									<span class="accordion__label"><?php echo esc_html( $item['q'] ); ?></span>
									<span class="accordion__icon" aria-hidden="true"></span>
								</button>
							</h3>
							<div class="accordion__panel" id="faq-panel-<?php echo (int) $index; ?>" role="region" aria-labelledby="faq-trigger-<?php echo (int) $index; ?>" aria-hidden="<?php echo $open ? 'false' : 'true'; ?>">
								<div class="accordion__panel-inner">
									<p class="accordion__content"><?php echo esc_html( $item['a'] ); ?></p>
								</div>
							</div>
						</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>
	</section>
	<?php
}

/**
 * Consultation band: form plus the supporting cards.
 *
 * @param array $args {
 *     @type bool $showSteps Toggle the "what happens next" card.
 *     @type bool $standalone Wrap in its own section element.
 * }
 * @return void
 */
function lumyla_contact_section( $args = array() ) {
	$args = wp_parse_args(
		$args,
		array( 'showSteps' => true )
	);

	$steps = array(
		'فرم را تکمیل کنید و نوع خدمت یا پکیج موردنظر را انتخاب کنید.',
		'درخواست شما بررسی می‌شود و برای هماهنگی جلسه مشاوره با شما تماس می‌گیریم.',
		'پس از شناخت نیازها، پیشنهاد و برنامه اجرایی شفاف ارائه می‌شود.',
	);
	?>
	<section class="section-lg contact" id="consultation" aria-labelledby="consultation-title">
		<div class="contact__bg" role="presentation"></div>
		<div class="contact__veil"></div>
		<div class="container container-wide">
			<div class="contact__grid">
				<div <?php echo lumyla_reveal_attrs( 0, 'contact__panel' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
					<div style="display:grid;gap:.75rem;margin-bottom:1.35rem">
						<p class="eyebrow eyebrow--fa">درخواست مشاوره</p>
						<h2 id="consultation-title" style="font-size:var(--fs-h2);font-weight:800;line-height:1.4">
							برای شروع یک همکاری حرفه‌ای آماده‌اید؟
						</h2>
						<p style="color:var(--text-3);font-size:var(--fs-sm);line-height:1.9">
							فرم زیر را تکمیل کنید تا در اولین فرصت برای بررسی نیازهای کسب‌وکار و ارائه مشاوره با
							شما تماس بگیریم.
						</p>
					</div>
					<?php lumyla_consultation_form(); ?>
				</div>

				<div <?php echo lumyla_reveal_attrs( 100, 'contact__aside' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
					<div class="contact__card">
						<p class="contact__card-title">
							<?php lumyla_the_icon( 'send' ); ?>
							ارتباط سریع در تلگرام
						</p>
						<p>اگر ترجیح می‌دهید مستقیم پیام بدهید، تلگرام سریع‌ترین راه ارتباط با لومیلاست.</p>
						<?php if ( lumyla_telegram_url() ) : ?>
							<?php lumyla_telegram_button( array( 'size' => 'sm' ) ); ?>
							<span class="num" style="color:var(--text-3);font-size:var(--fs-xs)">@<?php echo esc_html( trim( (string) lumyla_site( 'telegramUsername' ), '@' ) ); ?></span>
						<?php else : ?>
							<span class="badge badge--muted">به‌زودی فعال می‌شود</span>
							<p style="font-size:var(--fs-xs)">
								تا زمان فعال‌شدن تلگرام، از فرم مشاوره استفاده کنید؛ درخواست شما ثبت و بررسی
								می‌شود.
							</p>
						<?php endif; ?>
					</div>

					<?php if ( $args['showSteps'] ) : ?>
						<div class="contact__card">
							<p class="contact__card-title">
								<?php lumyla_the_icon( 'compass' ); ?>
								بعد از ارسال درخواست چه اتفاقی می‌افتد؟
							</p>
							<div class="contact__steps">
								<?php foreach ( $steps as $index => $step ) : ?>
									<div class="contact__step">
										<span class="num"><?php echo esc_html( '۰' . lumyla_fa_number( $index + 1 ) ); ?></span>
										<span><?php echo esc_html( $step ); ?></span>
									</div>
								<?php endforeach; ?>
							</div>
						</div>
					<?php endif; ?>

					<div class="contact__card">
						<p class="contact__card-title">
							<?php lumyla_the_icon( 'shield' ); ?>
							حریم خصوصی
						</p>
						<p>
							اطلاعات تماس شما فقط برای پاسخ به همین درخواست استفاده می‌شود و در هیچ صفحه عمومی
							منتشر نخواهد شد.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	<?php
}

/**
 * Closing call to action.
 *
 * @return void
 */
function lumyla_final_cta() {
	?>
	<section class="final-cta" aria-labelledby="final-cta-title">
		<div class="final-cta__bg" role="presentation"></div>
		<div class="final-cta__stars stars" aria-hidden="true"></div>
		<div class="container container-wide">
			<div <?php echo lumyla_reveal_attrs( 0, 'final-cta__inner' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
				<p class="eyebrow eyebrow--fa">آغاز مسیر</p>
				<h2 class="final-cta__title" id="final-cta-title">وقت آن رسیده که کسب‌وکار شما بدرخشد</h2>
				<p class="final-cta__desc">
					برای طراحی یک مسیر حرفه‌ای در دنیای دیجیتال، از همین امروز با لومیلا در ارتباط باشید.
				</p>
				<div class="final-cta__actions">
					<?php
					lumyla_consult_button(
						array(
							'label'   => 'دریافت مشاوره',
							'service' => 'general',
							'variant' => 'primary',
							'size'    => 'lg',
						)
					);
					lumyla_telegram_button( array( 'size' => 'lg' ) );
					?>
				</div>
			</div>
		</div>
	</section>
	<?php
}
