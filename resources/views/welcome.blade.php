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

    <script>
        window.$APP = {
            ENV: "{{ config('app.env') }}",
            BASE_URL: "{{ url('/') }}",
            CSRF_TOKEN: "{{ csrf_token() }}",
        }
    </script>

    @if (hIsEnv('local'))
        <script src="https://js.pusher.com/7.0/pusher.js"></script>
        <script src="https://unpkg.com/axios@0.26.1/dist/axios.js"></script>
        <script src="https://unpkg.com/lodash@4.17.21/lodash.js"></script>
    @else
        <script src="https://js.pusher.com/7.0/pusher.min.js"></script>
        <script src="https://unpkg.com/axios@0.26.1/dist/axios.min.js"></script>
        <script src="https://unpkg.com/lodash@4.17.21/lodash.min.js"></script>
    @endif

</body>

</html>
