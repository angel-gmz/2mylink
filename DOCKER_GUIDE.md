# 🚀 Guía Rápida - Docker

## Comandos Esenciales

### Iniciar la aplicación
```bash
docker compose up -d
```

### Detener la aplicación
```bash
docker compose down
```

### Ver logs
```bash
docker compose logs -f app
```

---

## Ejecutar Comandos Artisan

### Opción 1: Directamente con Docker
```bash
docker compose exec app php artisan [comando]
```

### Opción 2: Con scripts PowerShell
```bash
.\artisan.ps1 [comando]
.\composer.ps1 [comando]
.\npm.ps1 [comando]
```

### Opción 3: Con scripts Batch (cmd)
```bash
.\artisan.bat [comando]
.\composer.bat [comando]
.\npm.bat [comando]
```

---

## Ejemplos Comunes

```bash
# Migraciones
.\artisan.ps1 migrate
.\artisan.ps1 migrate:fresh --seed

# Cache
.\artisan.ps1 cache:clear
.\artisan.ps1 config:clear

# Crear archivos
.\artisan.ps1 make:controller UserController
.\artisan.ps1 make:model Post -m

# Composer
.\composer.ps1 install
.\composer.ps1 require laravel/sanctum

# NPM
.\npm.ps1 install
.\npm.ps1 run dev
```

---

## Acceso a la Aplicación

- **Web**: http://localhost:8080
- **Base de datos**: localhost:5432
  - Database: `2mylink`
  - User: `2mylink_user`
  - Password: `2mylink_password`

---

## Solución de Problemas

### Si los contenedores no inician
```bash
docker compose down
docker compose up -d
```

### Si hay cambios en el Dockerfile
```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Ver estado de contenedores
```bash
docker compose ps
```

### Entrar al contenedor
```bash
docker compose exec app sh
```
