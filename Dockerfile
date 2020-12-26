FROM php:7.2-fpm

RUN apt-get update \
    && apt-get install -y git zip npm

WORKDIR /var/www

COPY . /var/www

RUN docker-php-ext-install pdo_mysql
RUN apt-get install -y libgmp-dev re2c libmhash-dev libmcrypt-dev file \
    && ln -s /usr/include/x86_64-linux-gnu/gmp.h /usr/local/include/ \
    && docker-php-ext-configure gmp \
    && docker-php-ext-install gmp

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --optimize-autoloader --no-dev --no-scripts \
    && composer update

RUN chown -R www-data:www-data \
    /var/www/storage \
    /var/www/bootstrap/cache

RUN npm install npm@latest -g \
    && npm install \
    && npm update \
    && npm run prod
