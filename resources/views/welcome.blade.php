<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    {{ hViteAssets() }}

</head>

<body>

    <div id="app"></div>

    <script src="https://unpkg.com/lodash@4.17.21/lodash.min.js"></script>
    <script>
        window.$APP = {
            ENV: "{{ config('app.env') }}",
            BASE_URL: "{{ url('/') }}",
            CSRF_TOKEN: "{{ csrf_token() }}",
        }
    </script>

</body>

</html>
