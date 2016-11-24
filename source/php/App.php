<?php

namespace EventManagerIntegration;

class App
{

    public function __construct()
    {
        /* Activation hooks */
        register_activation_hook(plugin_basename(__FILE__), '\EventManagerIntegration\App::addCronJob');
        register_deactivation_hook(plugin_basename(__FILE__), '\EventManagerIntegration\App::removeCronJob');

        add_action('wp_enqueue_scripts', array($this, 'enqueueStyles'));
        add_action('admin_enqueue_scripts', array($this, 'enqueueScripts'));

        /* Register cron action */
        add_action('import_events_daily', array($this, 'importEventsCron'));

        /* Init Post types */
        $this->eventsPostType = new PostTypes\Events();

        new \EventManagerIntegration\Helper\Acf();
        new \EventManagerIntegration\Widget\DisplayEvents();
        new \EventManagerIntegration\Admin\Options();

        add_action( 'widgets_init', function(){
            register_widget( 'EventManagerIntegration\Widget\DisplayEvents' );
        });

        // TA BORT
        add_action('admin_menu', array($this, 'createParsePage'));
    }

    /**
     * Enqueue required style
     * @return void
     */
    public function enqueueStyles()
    {
        wp_enqueue_style('event-manager-integration', EVENTMANAGERINTEGRATION_URL . '/dist/css/event-manager-integration.min.css', null, '1.0.0');
    }

    /**
     * Enqueue required scripts
     * @return void
     */
    public function enqueueScripts()
    {
        wp_enqueue_script('event-manager-integration', EVENTMANAGERINTEGRATION_URL . '/dist/js/event-manager-integration.min.js', null, '1.0.0', true);
        wp_localize_script('event-manager-integration', 'eventintegration', array(
            'loading'           => __("Loading", 'eventintegration'),
        ));
    }

    /**
     * Start cron jobs
     * @return void
     */
    public function importEventsCron()
    {
        if (get_field('event_daily_import', 'option') == true) {
            $days_ahead = ! empty(get_field('days_ahead', 'options')) ? get_field('days_ahead', 'options'): 30;
            $from_date = strtotime("midnight now");
            $to_date = date('Y-m-d', strtotime("+ {$days_ahead} days", $from_date));
            $api_url = 'http://eventmanager.dev/json/wp/v2/event/time?start='.date('Y-m-d').'&end='.$to_date;
            $importer = new \EventManagerIntegration\Parser\HbgEventApi($api_url);
        }
    }

    public static function addCronJob()
    {
        wp_schedule_event(time(), 'hourly', 'import_events_daily');
    }

    public static function removeCronJob()
    {
        wp_clear_scheduled_hook('import_events_daily');
    }

    // TA BORT
    /**
     * Creates a admin page to trigger update data function
     * @return void
     */
    public function createParsePage()
    {
        add_submenu_page(
            null,
            __('Import events', 'event-integration'),
            __('Import events', 'event-integration'),
            'edit_posts',
            'import-events',
            function () {
            $days_ahead = ! empty(get_field('days_ahead', 'options')) ? get_field('days_ahead', 'options'): 30;
            $from_date = strtotime("midnight now");
            $to_date = date('Y-m-d', strtotime("+ {$days_ahead} days", $from_date));

            $api_url = 'http://eventmanager.dev/json/wp/v2/event/time?start='.date('Y-m-d').'&end='.$to_date;
            //$api_url = 'http://eventmanager.dev/json/wp/v2/event/time?start='.date('2016-09-01').'&end='.$to_date;

            $importer = new \EventManagerIntegration\Parser\HbgEventApi($api_url);
            });

            add_submenu_page(
            null,
            __('Delete all events', 'event-integration'),
            __('Delete all events', 'event-integration'),
            'edit_posts',
            'delete-all-events',
            function () {
                global $wpdb;
                $delete = $wpdb->query("TRUNCATE TABLE `event_postmeta`");
                $delete = $wpdb->query("TRUNCATE TABLE `event_posts`");
                $delete = $wpdb->query("TRUNCATE TABLE `event_stream`");
                $delete = $wpdb->query("TRUNCATE TABLE `event_stream_meta`");
                $delete = $wpdb->query("TRUNCATE TABLE `event_term_relationships`");
                $delete = $wpdb->query("TRUNCATE TABLE `event_term_taxonomy`");
                $delete = $wpdb->query("TRUNCATE TABLE `event_termmeta`");
                $delete = $wpdb->query("TRUNCATE TABLE `event_terms`");
            });
    }

}
