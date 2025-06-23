FROM node:24.2.0-alpine3.22 AS frontend

WORKDIR /frontend

# copy package json untuk memuat deps
COPY package.json ./
COPY package-lock.json ./

# install deps yang dibutuhkan
RUN npm install

# copy semua resource yang dibutuhkan untuk build
COPY tsconfig.json ./
COPY resources ./resources
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY vite.config.js ./

# build react inertia
RUN npm run build

# stage untuk php
FROM php:8.2.28-fpm-alpine3.22

# install deps yang dibutuhkan untuk linux 
RUN apk add oniguruma-dev libzip-dev curl nginx && docker-php-ext-install pdo pdo_mysql mbstring zip

WORKDIR /var/www

# copy semua file yang dibutuhkan oleh laravel 
COPY . ./

# copy hasil build react inertia dari stage sebelumnya
COPY --from=frontend /frontend/public/build ./public/build

COPY --from=composer:2.8.9 /usr/bin/composer /usr/bin/composer

RUN composer install --no-interaction --no-dev --optimize-autoloader
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# copy konfigurasi nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 
CMD ["/bin/sh", "-c", "php-fpm -D && nginx -g 'daemon off;'"]

# FROM node:24.2.0-alpine3.22 AS frontend

# WORKDIR /frontend

# COPY package.json ./
# COPY package-lock.json ./

# RUN npm install

# COPY tsconfig.json ./
# COPY vite.config.js ./
# COPY tailwind.config.js ./
# COPY postcss.config.js ./
# COPY resources ./resources

# RUN npm run build

# FROM php:8.2.28-fpm-alpine3.22

# RUN apk add oniguruma-dev libzip-dev curl && docker-php-ext-install pdo pdo_mysql mbstring zip

# WORKDIR /var/www

# COPY . ./
# COPY --from=frontend /frontend/public/build ./public/build

# COPY --from=composer:2.8.9 /usr/bin/composer /usr/bin/composer

# RUN composer install --no-interaction --no-dev --optimize-autoloader

# RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# EXPOSE 9000
# CMD ["php-fpm"]