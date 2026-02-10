<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>

<body <?php body_class('bg-void text-aged-bone'); ?>>
<?php wp_body_open(); ?>

<header class="border-b border-white/10 py-4 relative"> <a class="skip-link screen-reader-text" href="#main"><?php _e('Skip to content', 'little-pumpkin'); ?></a>
    
    <div class="container mx-auto px-4 flex items-center justify-between">
        <div class="site-logo flex-shrink-0">
            <?php 
            if ( has_custom_logo() ) {
                the_custom_logo();
            } else {
                echo '<a href="' . esc_url( home_url( '/' ) ) . '" class="text-2xl font-bold text-pumpkin">' . get_bloginfo( 'name' ) . '</a>';
            }
            ?>
        </div>

      <nav id="site-navigation" class="main-navigation md:flex items-center">
            <?php
            wp_nav_menu( array(
                'theme_location' => 'primary', 
                'menu_id'        => 'primary-menu',
                'container'      => false,
                'menu_class'     => 'flex items-center gap-8', 
                'fallback_cb'    => false,
            ) );
            ?>
        </nav>

        <button class="mobile-menu-toggle md:hidden flex flex-col gap-1.5 z-50" aria-label="Open Menu">
            <span class="w-6 h-0.5 bg-pumpkin"></span>
            <span class="w-6 h-0.5 bg-pumpkin"></span>
            <span class="w-6 h-0.5 bg-pumpkin"></span>
        </button>
    </div>
</header>