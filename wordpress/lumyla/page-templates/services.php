<?php
/**
 * Template Name: خدمات
 * Template Post Type: page
 *
 * @package Lumyla
 */

get_header();

lumyla_page_hero(
	array(
		'eyebrow'    => 'خدمات',
		'title'      => 'راهکارهایی برای ساختن، دیده‌شدن و رشد کردن',
		'lead'       => 'در لومیلا خدمات را جدا از هم نمی‌بینیم؛ سئو، طراحی و هویت بصری در کنار هم یک مسیر منسجم برای رشد دیجیتال می‌سازند.',
		'breadcrumb' => array( array( 'label' => 'خدمات' ) ),
		'actions'    => lumyla_button(
			array(
				'label'   => 'دریافت مشاوره',
				'href'    => lumyla_consult_url( 'general' ),
				'variant' => 'primary',
			)
		) . lumyla_button(
			array(
				'label'   => 'تعرفه سئو',
				'href'    => lumyla_url( 'pricing' ),
				'variant' => 'ghost',
				'icon'    => false,
			)
		),
	)
);
?>

<section class="section" aria-labelledby="all-services-title">
	<div class="container container-wide">
		<div <?php echo lumyla_reveal_attrs(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
			<?php
			lumyla_section_heading(
				array(
					'eyebrow' => 'چهار حوزه',
					'title'   => 'خدمات لومیلا',
					'lead'    => 'هر خدمت با یک هدف مشخص آغاز می‌شود و با شاخص‌های قابل اندازه‌گیری پیش می‌رود.',
					'id'      => 'all-services-title',
				)
			);
			?>
		</div>
		<div class="card-grid card-grid--two">
			<?php foreach ( lumyla_data( 'services' ) as $index => $service ) : ?>
				<div <?php echo lumyla_reveal_attrs( 60 * $index ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
					<?php lumyla_service_card( $service ); ?>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="section section--inset" aria-labelledby="seo-scope-title">
	<div class="container container-wide">
		<div <?php echo lumyla_reveal_attrs(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
			<?php
			lumyla_section_heading(
				array(
					'eyebrow' => 'SEO',
					'title'   => 'در سئو چه کاری انجام می‌دهیم؟',
					'lead'    => 'از تحقیق کلمات کلیدی و استراتژی تا اجرای فنی، محتوا و گزارش‌گیری؛ چهار مرحله پیوسته که دیده‌شدن هدفمند را ممکن می‌کند.',
					'id'      => 'seo-scope-title',
					'wide'    => true,
					'action'  => '<a class="btn btn--ghost btn--sm" href="' . esc_url( lumyla_url( 'services/seo' ) ) . '">جزئیات خدمات سئو' . lumyla_icon( 'arrow', 18, 1.5, 'icon-arrow' ) . '</a>',
				)
			);
			?>
		</div>
		<div class="card-grid">
			<?php foreach ( lumyla_data( 'seoScope' ) as $index => $item ) : ?>
				<div <?php echo lumyla_reveal_attrs( 60 * $index ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
					<?php lumyla_info_card( $index, $item['title'], $item['desc'], $item['items'] ); ?>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php lumyla_website_design_section(); ?>

<section class="section section--inset" aria-labelledby="graphic-title">
	<div class="container container-wide">
		<div <?php echo lumyla_reveal_attrs(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
			<?php
			lumyla_section_heading(
				array(
					'eyebrow' => 'GRAPHIC',
					'title'   => 'طراحی گرافیک و هویت بصری',
					'lead'    => 'از اقلام چاپی تا نظام بصری کامل برند؛ طراحی‌هایی که پیام شما را روشن‌تر منتقل می‌کنند.',
					'id'      => 'graphic-title',
					'wide'    => true,
					'action'  => '<a class="btn btn--ghost btn--sm" href="' . esc_url( lumyla_url( 'services/graphic-design' ) ) . '">جزئیات طراحی گرافیک' . lumyla_icon( 'arrow', 18, 1.5, 'icon-arrow' ) . '</a>',
				)
			);
			?>
		</div>
		<div class="card-grid">
			<?php foreach ( lumyla_data( 'graphicScope' ) as $index => $item ) : ?>
				<div <?php echo lumyla_reveal_attrs( 50 * $index ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
					<article class="card card--hover info-card">
						<h3><?php echo esc_html( $item['title'] ); ?></h3>
						<p><?php echo esc_html( $item['desc'] ); ?></p>
					</article>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php lumyla_process_section(); ?>

<section class="section">
	<div class="container container-wide">
		<?php
		lumyla_cta_band(
			array(
				'title' => 'نمی‌دانید کدام خدمت برای کسب‌وکار شما مناسب است؟',
				'desc'  => 'در یک گفتگوی کوتاه، وضعیت فعلی سایت و اهداف شما را بررسی می‌کنیم.',
				'link'  => lumyla_button(
					array(
						'label'   => 'دریافت مشاوره',
						'href'    => lumyla_consult_url( 'general' ),
						'variant' => 'primary',
					)
				),
			)
		);
		?>
	</div>
</section>

<?php
get_footer();
