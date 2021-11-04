<?php

if (function_exists('acf_add_local_field_group')) {
  acf_add_local_field_group([
    'key' => 'group_618441cae5724',
    'title' => __('Email confirmation', 'event-integration'),
    'fields' => [
      [
        'key' => 'field_618441dc596f5',
        'label' => __('Subject', 'event-integration'),
        'name' => 'email_confirmation_subject',
        'type' => 'text',
        'required' => 1,
      ],
      [
        'key' => 'field_61844270596f6',
        'label' => __('Body', 'event-integration'),
        'name' => 'email_confirmation_body',
        'type' => 'wysiwyg',
        'media_upload' => 0,
        'tabs' => 'all',
        'toolbar' => 'full',
        'delay' => 0,
        'required' => 1,
      ],
    ],
    'location' => [
      [
        [
          'param' => 'options_page',
          'operator' => '==',
          'value' => 'event-options',
        ],
      ],
    ],
    'menu_order' => 1,
  ]);
}