FROM node:24.2.0-alpine3.22 AS frontend

WORKDIR /frontend

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY tsconfig.json ./
COPY vite.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY resources ./resources

RUN npm run build

FROM php:8.2.28-fpm-alpine3.22

RUN apk add oniguruma-dev libzip-dev curl && docker-php-ext-install pdo pdo_mysql mbstring zip

WORKDIR /var/www

COPY . ./
COPY --from=frontend /frontend/public/build ./public/build

COPY --from=composer:2.8.9 /usr/bin/composer /usr/bin/composer

RUN composer install --no-interaction --no-dev --optimize-autoloader

RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]