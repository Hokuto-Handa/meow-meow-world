FROM php:7.4.4-apache
RUN apt-get update && docker-php-ext-install pdo_mysql
ADD ./app /var/www/html/
ADD ./credentials  /.aws/
