<?php 

if (function_exists('acf_add_local_field_group')) {
    acf_add_local_field_group(array(
    'key' => 'group_591c150dd4562',
    'title' => 'Summaries',
    'fields' => array(
        0 => array(
            'key' => 'field_591c15305ade1',
            'label' => __('Send summaries to', 'event-integration'),
            'name' => 'event_form_summaries',
            'type' => 'repeater',
            'instructions' => __('Send summaries of event submissions to the following email addresses', 'event-integration'),
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'sub_fields' => array(
                0 => array(
                    'key' => 'field_591c155a5ade2',
                    'label' => __('Email address', 'event-integration'),
                    'name' => 'email_address',
                    'type' => 'email',
                    'instructions' => '',
                    'required' => 1,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '50',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                ),
                1 => array(
                    'key' => 'field_591c50317fdbc',
                    'label' => __('Interval', 'event-integration'),
                    'name' => 'interval',
                    'type' => 'select',
                    'instructions' => '',
                    'required' => 1,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'multiple' => 0,
                    'allow_null' => 0,
                    'choices' => array(
                        'monthly' => __('Monthly', 'event-integration'),
                        'weekly' => __('Weekly', 'event-integration'),
                        'daily' => __('Daily', 'event-integration'),
                    ),
                    'default_value' => array(
                        0 => 'weekly',
                    ),
                    'ui' => 0,
                    'ajax' => 0,
                    'placeholder' => '',
                    'return_format' => 'value',
                ),
            ),
            'min' => 0,
            'max' => 0,
            'layout' => 'table',
            'button_label' => '',
            'collapsed' => '',
        ),
    ),
    'location' => array(
        0 => array(
            0 => array(
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'event-options',
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
));
}