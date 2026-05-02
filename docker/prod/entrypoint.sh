#!/bin/sh
set -e

# Ensure required storage directories exist (in case volume is empty/new)
mkdir -p /var/www/html/storage/app/public/avatars
mkdir -p /var/www/html/storage/app/private
mkdir -p /var/www/html/storage/framework/cache/data
mkdir -p /var/www/html/storage/framework/sessions
mkdir -p /var/www/html/storage/framework/views
mkdir -p /var/www/html/storage/logs

# Set correct permissions
chown -R www-data:www-data /var/www/html/storage
chmod -R 755 /var/www/html/storage

# Re-create storage link in case volume replaced it
php artisan storage:link --force 2>/dev/null || true

# Run migrations
php artisan migrate --force

exec "$@"
