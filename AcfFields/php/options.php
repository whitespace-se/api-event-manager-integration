<?php 

if (function_exists('acf_add_local_field_group')) {
    acf_add_local_field_group(array(
    'key' => 'group_583557753bd73',
    'title' => __('Event Manager Integration', 'event-integration'),
    'fields' => array(
        0 => array(
            'key' => 'field_588f3ef76094c',
            'label' => __('API url', 'event-integration'),
            'name' => 'event_api_url',
            'type' => 'url',
            'instructions' => __('Url to Event Manager API wp/v2 namespace. <br> E.g. https://host/wp-json/wp/v2', 'event-integration'),
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
        ),
        1 => array(
            'key' => 'field_5835579f883ff',
            'label' => __('Days ahead', 'event-integration'),
            'name' => 'days_ahead',
            'type' => 'number',
            'instructions' => __('Import events that occurs within given number of days.', 'event-integration'),
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '50',
                'class' => '',
                'id' => '',
            ),
            'default_value' => 30,
            'placeholder' => '',
            'prepend' => '',
            'append' => __(__('days', 'event-integration'), 'event-integration'),
            'min' => 1,
            'max' => 365,
            'step' => '',
        ),
        2 => array(
            'key' => 'field_5835581488400',
            'label' => __('Daily import', 'event-integration'),
            'name' => 'event_daily_import',
            'type' => 'true_false',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '50',
                'class' => '',
                'id' => '',
            ),
            'message' => __('Enable daily automatic import from Event Manager API', 'event-integration'),
            'default_value' => 0,
        ),
        3 => array(
            'key' => 'field_587f86dc8f7b7',
            'label' => __('Post status', 'event-integration'),
            'name' => 'event_post_status',
            'type' => 'radio',
            'instructions' => __('Select status of imported events.', 'event-integration'),
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '50',
                'class' => '',
                'id' => '',
            ),
            'choices' => array(
                'draft' => __('Draft', 'event-integration'),
                'publish' => __('Published', 'event-integration'),
            ),
            'allow_null' => 0,
            'other_choice' => 0,
            'save_other_choice' => 0,
            'default_value' => 'publish',
            'layout' => 'vertical',
            'return_format' => 'value',
        ),
        4 => array(
            'key' => 'field_58feee2f256cd',
            'label' => __('Unpublish long lasting events', 'event-integration'),
            'name' => 'event_unpublish_limit',
            'type' => 'number',
            'instructions' => __('Automatically unpublish events lasting longer than given limit. Set to -1 to set no limit.', 'event-integration'),
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '50',
                'class' => '',
                'id' => '',
            ),
            'default_value' => 5,
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'min' => -1,
            'max' => '',
            'step' => '',
        ),
        5 => array(
            'key' => 'field_586bc598f2777',
            'label' => __('Import from selected user groups', 'event-integration'),
            'name' => 'event_filter_group',
            'type' => 'taxonomy',
            'instructions' => __('Select the user groups that you want to import events from. Leave empty to import from all groups.', 'event-integration'),
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'taxonomy' => 'event_groups',
            'field_type' => 'checkbox',
            'allow_null' => 0,
            'add_term' => 0,
            'save_terms' => 1,
            'load_terms' => 0,
            'return_format' => 'object',
            'multiple' => 0,
        ),
        6 => array(
            'key' => 'field_5846ca031ffcb',
            'label' => __('Import from selected categories', 'event-integration'),
            'name' => 'event_filter_cat',
            'type' => 'text',
            'instructions' => __('Enter the name of the categories that you want to import events from. Separate with commas. Leave blank to import from all categories.', 'event-integration'),
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'maxlength' => '',
        ),
        7 => array(
            'key' => 'field_5846db8b3cf78',
            'label' => __('Import from selected tags', 'event-integration'),
            'name' => 'event_filter_tag',
            'type' => 'text',
            'instructions' => __('Enter the name of the tags that you want to import events from. Separate with commas. Leave blank to import from all tags.', 'event-integration'),
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'maxlength' => '',
        ),
        8 => array(
            'key' => 'field_58e380646fa6f',
            'label' => __('Show update button on edit event page', 'event-integration'),
            'name' => 'event_update_button',
            'type' => 'true_false',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'message' => __('Show update button', 'event-integration'),
            'default_value' => 0,
        ),
        9 => array(
            'key' => 'field_58a56eaa0c2ad',
            'label' => __('OAuth1 end point root url', 'event-integration'),
            'name' => 'event_api_oauth_url',
            'type' => 'url',
            'instructions' => __('Url can be found under section "authentication" in your API root.<br> E.g. https://host/oauth1<br> <br> Authorization is only needed when you want to post data to the API.', 'event-integration'),
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
        ),
        10 => array(
            'key' => 'field_58aaf2615abcb',
            'label' => __('Google Maps JavaScript API key', 'event-integration'),
            'name' => 'google_geocode_key',
            'type' => 'text',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'maxlength' => '',
        ),
        11 => array(
            'key' => 'field_58aaeaa46781b',
            'label' => __('Import from location', 'event-integration'),
            'name' => 'event_import_geographic',
            'type' => 'google_map',
            'instructions' => __('Import events that occurs at a specified location.', 'event-integration'),
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'center_lat' => '56.046467',
            'center_lng' => '12.694512',
            'zoom' => 16,
            'height' => '',
        ),
        12 => array(
            'key' => 'field_58aaec066781c',
            'label' => __('Distance from location', 'event-integration'),
            'name' => 'event_geographic_distance',
            'type' => 'number',
            'instructions' => __('To get events occurring nearby the given location, enter maximum distance in km. Leave blank to only get events from the exact position.', 'event-integration'),
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'min' => '',
            'max' => '',
            'step' => '',
        ),
        13 => array(
            'key' => 'field_5812eee2085a8',
            'label' => __('Internal events', 'event-manager'),
            'name' => 'internal_event',
            'type' => 'true_false',
            'instructions' => __('Import only internal events?', 'event-manager'),
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'choices' => array(
                'internal' => __('Internal', 'event-manager'),
                'public' => __('Public', 'event-manager'),
            ),
            'allow_null' => 0,
            'other_choice' => 0,
            'save_other_choice' => 0,
            'default_value' => 0,
            'layout' => 'vertical',
            'return_format' => 'value',
            'ui'          => 1,
        ),
    ),
    'location' => array(
        0 => array(
            0 => array(
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'acf-options-options',
            ),
        ),
    ),
    'menu_order' => 0,
    'position' => 'normal',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => 1,
    'description' => '',
    'local' => 'php',
));
}