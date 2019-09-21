# JSON Editor

A tool built with [Laravel SPA](https://github.com/memochou1993/laravel-spa) and [JSON Editor](https://github.com/josdejong/jsoneditor) to view, edit, format, and validate JSON.

## Requirements

- PHP ^7.2

## Installation

Download the master branch.

```BASH
git clone git@github.com:memochou1993/json-editor.git
```

Copy `.env.example` to `.env`.

```BASH
cp .env.example .env
```

Install the Composer dependencies.

```BASH
composer install
```

Set a random secure application key.

```BASH
php artisan key:generate
```

Install the npm dependencies.

```BASH
npm install
```

## Compiling Assets

Watch assets for changes.

```BASH
npm run watch
```

Run all Mix tasks.

```BASH
npm run dev
```

Run all Mix tasks and minify output.

```BASH
npm run prod
```
