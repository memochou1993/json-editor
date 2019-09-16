<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>JSON Editor</title>
        <link rel="icon" href="favicon.png">
    </head>
    <body>
        <div id="app"></div>
        <script src="{{ asset('js/manifest.js') }}"></script>
        <script src="{{ asset('js/vendor.js') }}"></script>
        <script src="{{ asset('js/main.js') }}"></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-117292723-6"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-117292723-6');
        </script>
    </body>
</html>
