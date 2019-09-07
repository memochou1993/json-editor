# Laravel SPA

Laravel 6.0 + Vue + Vuetify 2.0 = Laravel SPA 💥

## Features

- Laravel 6.0
- Vue
- Vuetify 2.0
- Vue Router + Vue I18n + Vue Axios
- Material Design Icons
- ESLint

## Requirements

- PHP ^7.2

## Installation

Download the master branch.

```BASH
git clone git@github.com:memochou1993/laravel-spa.git
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

## Usage

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
