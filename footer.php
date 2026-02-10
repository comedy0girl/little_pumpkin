<?php
/**
 * The template for displaying the footer
 */
?>

    <footer id="colophon" class="site-footer bg-black border-t border-white/10 py-12">
        <div class="cemetery-divider" 
            style="background-image: url('<?php echo get_stylesheet_directory_uri(); ?>/assets/img/spooky-grave.png');">
        </div>
        <div class="container mx-auto px-4">
            
            <?php if (is_active_sidebar('sidebar-footer')) : ?>
                <div class="footer-widgets mb-10">
                    <?php dynamic_sidebar('sidebar-footer'); ?>
                </div>
            <?php endif; ?>
            
            <div class="site-info flex flex-col md:flex-row justify-between items-center gap-6">
                <div class="footer-navigation">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'footer',
                        'menu_class'     => 'footer-menu flex flex-wrap gap-6 justify-center md:justify-start',
                        'depth'          => 1,
                        'fallback_cb'    => false,
                    ));
                    ?>
                </div>
                
                <div class="copyright text-aged-bone/40 text-sm tracking-wide">
                    <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. 
                    <?php _e('All rights reserved.', 'little-pumpkin'); ?></p>
                </div>
            </div>

        </div>
    </footer>
    <div id="bat-container" aria-hidden="true">
    </div>

</div><?php wp_footer(); ?>

</body>
</html>