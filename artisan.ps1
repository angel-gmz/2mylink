#!/usr/bin/env pwsh
# PowerShell script to run Artisan commands through Docker
docker compose exec app php artisan $args
