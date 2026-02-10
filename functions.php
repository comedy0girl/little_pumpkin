<?php
/**
 * Little Pumpkin Theme Functions
 */

function my_pumpkin_setup() {
    add_theme_support( 'custom-logo' );
    add_theme_support( 'align-wide' );
    add_theme_support( 'post-thumbnails' );
    
    // Add custom gallery image size for Halloween Mode
    add_image_size( 'gallery', 175, 175, true ); 

    add_theme_support( 'editor-styles' );
    add_editor_style( 'style.css' );

    // Custom Logo (Note: consolidated your two custom-logo calls into one)
    add_theme_support('custom-logo', array(
        'height'               => 100,
        'width'                => 400,
        'flex-height'          => true,
        'flex-width'           => true,
        'unlink-homepage-logo' => true, 
    ));

    // Menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'little-pumpkin'),
        'footer'  => __('Footer Menu', 'little-pumpkin'),
    ));
}
add_action( 'after_setup_theme', 'my_pumpkin_setup' );

function add_aria_current_to_nav($atts, $item) {
    if (in_array('current-menu-item', $item->classes)) {
        $atts['aria-current'] = 'page';
    }
    return $atts;
}
add_filter('nav_menu_link_attributes', 'add_aria_current_to_nav', 10, 2);

function halloween_load_fonts() {
    // Loading Special Elite for headers and Inter for clean body text
    wp_enqueue_style('halloween-fonts', 'https://fonts.googleapis.com/css2?family=Special+Elite&family=Inter:wght@400;700&display=swap', array(), null);
}
add_action('wp_enqueue_scripts', 'halloween_load_fonts');

//Block Registration
function halloween_mode_register_blocks() {
    register_block_type( get_template_directory() . '/build/blocks/cards' );
    register_block_type( get_template_directory() . '/build/blocks/hero' );
}
add_action( 'init', 'halloween_mode_register_blocks' );

//Frontend Styles & Scripts
function my_pumpkin_scripts() {
    // Styles
    wp_enqueue_style( 'my-pumpkin-style', get_stylesheet_uri(), array(), '1.1' );

    // Enqueue Main JS
    wp_enqueue_script( 
        'my-pumpkin-main', 
        get_template_directory_uri() . '/assets/js/main.js', 
        array(), 
        time(), 
        true 
    );
}
add_action( 'wp_enqueue_scripts', 'my_pumpkin_scripts' );

function halloween_enqueue_reveal_script() {
    wp_enqueue_script(
        'halloween-reveal', 
        get_template_directory_uri() . '/assets/js/reveal.js', 
        array(), 
        time(),
        true
    );
}
add_action('wp_enqueue_scripts', 'halloween_enqueue_reveal_script');

function halloween_enqueue_bat_particles() {
    wp_enqueue_script('p5-js', 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js', array(), null, true);

    wp_enqueue_script(
        'halloween-bats', 
        get_template_directory_uri() . '/assets/js/bat-particles.js', 
        array('p5-js'), 
        time(), 
        true
    );
    wp_localize_script('halloween-bats', 'halloweenData', array(
        'batPath' => get_template_directory_uri() . '/assets/img/small-bat.png'
    ));
}
add_action('wp_enqueue_scripts', 'halloween_enqueue_bat_particles');

