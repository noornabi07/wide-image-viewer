<?php

/**
 * Plugin Name: Wide Image Viewer 
 * Description: Embed ultra-wide format of panoramas in your website.
 * Version: 1.0.0
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: b-blocks
 */

// ABS PATH
if (!defined('ABSPATH')) {
	exit;
}

// Constant
define('BPLWIV_VERSION', isset($_SERVER['HTTP_HOST']) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0');
define('BPLWIV_DIR_URL', plugin_dir_url(__FILE__));
define('BPLWIV_DIR_PATH', plugin_dir_path(__FILE__));

if (!class_exists('BPLWIVPlugin')) {
	class BPLWIVPlugin
	{
		function __construct()
		{
			add_action('init', [$this, 'onInit']);
			add_action('enqueue_block_assets', [$this, 'bplwiv_enqueue_scripts']);

			add_action('init', [$this, 'bplwiv_register_viewport_post_type']);
			// Shortcode create here
			add_shortcode('viewport_shortcode', [$this, 'bplwiv_viewport_shortcode_handler']);


			add_filter('manage_viewport_posts_columns', [$this, 'viewportManageColumns'], 10);
			add_action('manage_viewport_posts_custom_column', [$this, 'viewportManageCustomColumns'], 10, 2);

			// If I want backend style or js for using this
			add_action('admin_enqueue_scripts', [$this, 'bplwiv_admin_enqueue_script']);


		}


		function onInit()
		{
			register_block_type(__DIR__ . '/build');
		}

		// shortcode copy js and css file register
		function bplwiv_admin_enqueue_script()
		{
			wp_register_style('checking-admin-style', plugins_url('admin/css/admin.css', __FILE__), array(), 'all');
			wp_enqueue_style('checking-admin-style');

			wp_register_script('checking-admin-script', plugins_url('admin/js/admin.js', __FILE__), '', '', true);
			wp_enqueue_script('checking-admin-script');
		}

		function bplwiv_enqueue_scripts()
		{
			// Register CSS
			wp_register_style(
				'bplwiv-paver-style',
				BPLWIV_DIR_URL . './assets/css/paver.min.css',
				[],
				BPLWIV_VERSION
			);

			// Register JavaScript
			wp_register_script(
				'bplwiv-throttle-debounce-js',
				BPLWIV_DIR_URL . './assets/js/jquery.ba-throttle-debounce.min.js',
				['jquery'], // jQuery dependency
				BPLWIV_VERSION,
				true
			);

			wp_register_script(
				'bplwiv-paver-js',
				BPLWIV_DIR_URL . './assets/js/jquery.paver.min.js',
				['jquery', 'bplwiv-throttle-debounce-js'], // Dependencies
				BPLWIV_VERSION,
				true
			);

		}

		// Custom Post type
		function bplwiv_register_viewport_post_type()
		{
			register_post_type('viewport', [
				'label' => 'Wide Image Viewer',
				'labels' => [
					'add_new' => 'Add New', // Global page
					'add_new_item' => 'Add New Viewport', // When click on new post
					'edit_item' => 'Edit viewport',
					'not_found' => 'There is no viewport please add one'
				],
				'public' => false,
				'show_ui' => true,
				'show_in_rest' => true,
				'menu_icon' => 'dashicons-cover-image',
				'template' => [['b-blocks/wide-image-viewer']],
				'template_lock' => 'all',
			]);
		}

		// shortcode registration here 
		function bplwiv_viewport_shortcode_handler($attributes)
		{
			$postID = $attributes['id'];
			$post = get_post($postID);
			$blocks = parse_blocks($post->post_content);
			ob_start();
			echo render_block($blocks[0]);
			return ob_get_clean();
		}

		// colum create function here 
		function viewportManageColumns($defaults)
		{
			unset($defaults['date']);
			$defaults['shortcode'] = 'ShortCode';
			$defaults['details'] = 'Details';
			return $defaults;
		}

		function viewportManageCustomColumns($column_name, $post_ID)
		{
			if ($column_name == 'shortcode') {
				echo '<div class="bPlAdminShortcode" id="bPlAdminShortcode-' . esc_attr($post_ID) . '">
            <input value="[viewport_shortcode id=' . esc_attr($post_ID) . ']" onclick="copyBPlAdminShortcode(\'' . esc_attr($post_ID) . '\')" readonly>
            <span class="tooltip">Copy To Clipboard</span>
        </div>';
			} elseif ($column_name == 'details') {
				echo '<div class="bPlAdminDetails">';
				echo '<strong>Details: Wide Image Viewer</strong> ';
				echo '</div>';
			}
		}



	}
	new BPLWIVPlugin();
}

// Custom page content for preview or redirect 
add_action('admin_menu', 'bplwiv_add_viewport_submenu');
function bplwiv_add_viewport_submenu()
{
	add_submenu_page(
		'edit.php?post_type=viewport', // Parent slug (linked to your custom post type)
		'Viewer Demo',                       // Page title
		'Viewer Demo',                       // Menu title
		'manage_options',                    // Capability
		'image-viewer',                       // Slug for the submenu
		'bplwiv_viewer_demo_page_html'         // Callback function to display the page content
	);
}

function bplwiv_viewer_demo_page_html()
{
	?>
	<h1 class="heading">
		<?php esc_html_e('Welcome To Our Wide Image Viewer Super Plugin', 'b-blocks'); ?>
	</h1>

	<div class="panorama">
		<img src="https://terrymun.github.io/paver/demo/images/p1.jpg" alt="Panorama Image" title="Panorama Image" />
	</div>

	<style>
		.heading {
			text-align: center;
			margin: 40px 40px;
		}

		.panorama {
			height: 500px;
			width: 1000px;
			overflow-y: hidden;
			margin: 0 auto;
			border-radius: 5px;

			img {
				height: 100%;
			}
		}

		.details {
			width: 70%;
			margin: 0 auto;
			margin-top: 40px;
		}

		.detail {
			font-size: 18px;
		}

		.bold {
			font-weight: bold;
		}
	</style>

	<script type="text/javascript">
		jQuery(document).ready(function ($) {
			$('.panorama').paver({
				startPosition: 0.5,
				gracefulFailure: true,
				minimumOverflow: 200,
				cursorThrottle: 60,
				gyroscopeThrottle: 60,
				resizeThrottle: 500
			});
		});
	</script>

	<div class="details">
		<p class="detail"><strong class="bold">Description:</strong> Wide Image Viewer is a robust, easy-to-use plugin
			designed for showcasing ultra-wide panorama images on your website. Perfect for photographers, designers, real
			estate professionals, and anyone who wants to provide immersive, full-width image experiences, this plugin enables
			you to display high-quality panoramas that visitors can scroll through smoothly.</p>

		<p class="detail"><strong class="bold">Follow Us:</strong> Please go to <span class="bold">"wide image viewer"</span>
			dashboard
			page and where
			you add our block. You will do all customization our block as your choose. And you will get here shortcode for your
			using themes. You can easily copied shortcode and just you past any page and will show case your customable wide
			image viewer. Thank you! </p>
	</div>

	<?php
}


// Preview library file registration here 
add_action('admin_enqueue_scripts', 'bplwiv_admin_preview_script');

function bplwiv_admin_preview_script($hook)
{
	if ($hook != 'viewport_page_image-viewer') {
		return;
	}

	wp_enqueue_script('jquery');

	// Enqueue Image Viewer Css File
	wp_enqueue_style(
		'paver-css',
		'https://terrymun.github.io/paver/dist/css/paver.min.css',
		array(),
		'4.2.17'
	);

	// Enqueue Image Viewer throttle Js File
	wp_enqueue_script(
		'throttle-js',
		'https://cdnjs.cloudflare.com/ajax/libs/jquery-throttle-debounce/1.1/jquery.ba-throttle-debounce.min.js',
		array('jquery'), // Ensure jQuery is a dependency
		'4.2.17',
		true // Load in the footer
	);

	// Enqueue Image Viewer Js File
	wp_enqueue_script(
		'paver-js',
		'https://terrymun.github.io/paver/dist/js/jquery.paver.min.js',
		array('jquery', 'throttle-js'), // Ensure jQuery is a dependency
		'4.2.17', // Version
		true // Load in the footer
	);
}


// -------------------- Redirect custom page after the activation plugin  --------------

register_activation_hook(__FILE__, 'my_plugin_activate');

function my_plugin_activate()
{
	set_transient('my_plugin_redirect', true, 30); // Lasts for 30 seconds
}

add_action('admin_init', 'my_plugin_redirect_after_activation');

function my_plugin_redirect_after_activation()
{
	if (get_transient('my_plugin_redirect')) {
		delete_transient('my_plugin_redirect');

		if (is_admin() && current_user_can('manage_options')) {
			wp_redirect(admin_url('edit.php?post_type=viewport&page=image-viewer'));
			exit;
		}
	}
}

add_action('wp_head', 'bplwiv_add_viewport_meta_tag');

function bplwiv_add_viewport_meta_tag()
{
	echo '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">';
}


