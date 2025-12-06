#!/usr/bin/env pwsh
# PowerShell script to run NPM commands through Docker
docker compose exec app npm $args
