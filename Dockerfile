FROM composer:2.0 as vendor

WORKDIR /app

COPY database database
COPY composer.json composer.lock  ./

RUN composer install --optimize-autoloader --no-dev --no-scripts
RUN composer update --no-scripts

FROM node:lts-alpine as node

WORKDIR /app

COPY . .

RUN npm install \
    && npm run production

FROM php:7.2-fpm

WORKDIR /var/www

RUN docker-php-ext-install pdo_mysql
RUN apt-get update \
    && apt-get install -y libgmp-dev re2c libmhash-dev libmcrypt-dev file \
    && ln -s /usr/include/x86_64-linux-gnu/gmp.h /usr/local/include/ \
    && docker-php-ext-configure gmp \
    && docker-php-ext-install gmp

RUN apt-get update \
    && apt-get install -y nginx

RUN rm -rf /var/www/html \
    && rm /etc/nginx/sites-enabled/default

COPY . .
COPY docker/nginx/conf.d /etc/nginx/conf.d
COPY --from=vendor /app/vendor vendor
COPY --from=node /app/public public
COPY docker/entrypoint.sh /etc/entrypoint.sh

RUN chown -R www-data:www-data \
    /var/www/storage \
    /var/www/bootstrap/cache

EXPOSE 80

ENTRYPOINT ["sh", "/etc/entrypoint.sh"]
