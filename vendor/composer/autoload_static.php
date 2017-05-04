<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit95678c5c3786d6308daa758282e6c210
{
    public static $prefixLengthsPsr4 = array (
        'A' => 
        array (
            'AcfExportManager\\' => 17,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'AcfExportManager\\' => 
        array (
            0 => __DIR__ . '/..' . '/helsingborg-stad/acf-export-manager/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit95678c5c3786d6308daa758282e6c210::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit95678c5c3786d6308daa758282e6c210::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
