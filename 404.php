<?php get_header(); ?>

<style type="text/css">
    .page-404 {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        min-height: 75vh !important;
        text-align: center !important;
    }

    .ghost-side-column img {
        opacity: 0.15 !important;
        filter: grayscale(100%) !important;
        display: block !important;
        width: 180px !important;
        height: auto !important;
        animation: ghostFloat 5s ease-in-out infinite !important;
    }

    @media (min-width: 768px) {
        .page-404 {
            flex-direction: row !important;
            gap: 50px !important;
            text-align: left !important;
        }
        .ghost-side-column img {
            width: 300px !important;
            opacity: 0.25 !important;
        }
    }

    @keyframes ghostFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }
</style>

<main class="site-main page-404" role="main">
    
    <div class="error-404-container max-w-xl z-10">
         <h1 class="wp-block-heading text-5xl md:text-7xl font-black uppercase italic leading-none">
            <?php esc_html_e('404', 'little-pumpkin'); ?>
        </h1>
        
        <p class="text-xl mb-10 opacity-90 text-white">
            <?php esc_html_e("Boo! This page has vanished!!", "little-pumpkin"); ?>
        </p>

        <div class="wp-block-button">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="wp-block-button__link wp-element-button">
                <?php esc_html_e('Back to Safety', 'little-pumpkin'); ?>
            </a>
        </div>
    </div>

    <div class="ghost-side-column" aria-hidden="true">
        <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/img/ghost.webp' ); ?>" 
             class="no-lazy ghost-float" alt="">
    </div>

</main>

<?php get_footer(); ?>

