# Laravel SPA

Laravel 6.0 + Vue 2.6 + Vuetify 2.0 = Laravel SPA 💥

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

Set a random secure application key.

```BASH
php artisan key:generate
```

Install the Composer dependencies.

```BASH
composer install
```

Install the npm dependencies.

```BASH
npm install
```

Compiles and hot-reloads.

```BASH
npm run watch
```

Compiles for development.

```BASH
npm run dev
```

Compiles for production.

```BASH
npm run prod
```
