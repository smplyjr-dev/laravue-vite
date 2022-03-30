<?php

use Illuminate\Support\HtmlString;

if (!function_exists('hIsEnv')) {
    /**
     * @param String $key String to get
     */
    function hIsEnv($key)
    {
        return config('app.env') == $key;
    }
}

if (!function_exists('hViteAssets')) {
    function hViteAssets(): HtmlString
    {
        if (env('APP_ENV') == 'local') {
            return new HtmlString('
                <script type="module" src="http://localhost:3000/@vite/client"></script>
                <script type="module" src="http://localhost:3000/resources/js/app.js"></script>
            ');
        } else {
            $manifest = json_decode(file_get_contents(
                public_path('build/manifest.json')
            ), true);

            return new HtmlString('
                <script type="module" src="/build/' . $manifest['resources/js/app.js']['file'] . '"></script>
                <link rel="stylesheet" href="/build/' . $manifest['resources/js/app.js']['css'][0] . '" />
            ');
        }
    }
}
