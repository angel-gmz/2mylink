# Configuración de PostgreSQL con Docker

Esta guía te ayudará a configurar PostgreSQL usando Docker para tu aplicación Laravel.

## Requisitos Previos

- Docker Desktop instalado y en ejecución
- PHP con extensión `pdo_pgsql` habilitada

## Paso 1: Levantar PostgreSQL con Docker

El proyecto incluye un archivo `docker-compose.yml` configurado para PostgreSQL.

```bash
# Levantar el contenedor de PostgreSQL
docker-compose up -d

# Verificar que el contenedor está corriendo
docker-compose ps
```

El contenedor se llama `2mylink_postgres` y expone PostgreSQL en el puerto `5432`.

## Paso 2: Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env` si aún no lo has hecho:

```bash
cp .env.example .env
```

Las credenciales de PostgreSQL ya están configuradas en `.env.example`:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=2mylink
DB_USERNAME=2mylink_user
DB_PASSWORD=2mylink_password
```

> [!NOTE]
> Si ya tienes un archivo `.env`, actualiza solo las variables de base de datos.

## Paso 3: Verificar Extensión PHP

Asegúrate de que la extensión `pdo_pgsql` esté habilitada en tu `php.ini`:

```ini
extension=pdo_pgsql
extension=pgsql
```

Verifica con:

```bash
php -m | findstr pgsql
```

## Paso 4: Ejecutar Migraciones

```bash
# Ejecutar todas las migraciones
php artisan migrate

# O si quieres empezar desde cero
php artisan migrate:fresh
```

## Paso 5: Verificar la Conexión

```bash
# Mostrar información de la base de datos
php artisan db:show

# Ver estructura de una tabla específica
php artisan db:table users
```

## Migrar Datos desde SQLite (Opcional)

Si tienes datos en SQLite que quieres migrar:

### Opción 1: Exportar/Importar manualmente

1. **Exportar datos de SQLite:**
   ```bash
   php artisan tinker
   ```
   ```php
   // Exportar usuarios como ejemplo
   $users = DB::connection('sqlite')->table('users')->get();
   file_put_contents('users.json', $users->toJson());
   ```

2. **Importar a PostgreSQL:**
   ```bash
   php artisan tinker
   ```
   ```php
   $users = json_decode(file_get_contents('users.json'));
   foreach ($users as $user) {
       DB::table('users')->insert((array) $user);
   }
   ```

### Opción 2: Usar paquete de migración

Instala un paquete como `doctrine/dbal`:

```bash
composer require doctrine/dbal
```

Luego crea un comando personalizado para migrar los datos.

## Comandos Útiles de Docker

```bash
# Ver logs del contenedor
docker-compose logs postgres

# Acceder al contenedor PostgreSQL
docker-compose exec postgres psql -U 2mylink_user -d 2mylink

# Detener el contenedor
docker-compose down

# Detener y eliminar volúmenes (¡CUIDADO! Esto borra todos los datos)
docker-compose down -v

# Reiniciar el contenedor
docker-compose restart postgres
```

## Comandos Útiles de PostgreSQL

Dentro del contenedor (`docker-compose exec postgres psql -U 2mylink_user -d 2mylink`):

```sql
-- Listar todas las tablas
\dt

-- Describir una tabla
\d users

-- Ver todas las bases de datos
\l

-- Salir
\q
```

## Solución de Problemas

### Error: "could not connect to server"

Verifica que el contenedor esté corriendo:
```bash
docker-compose ps
```

### Error: "SQLSTATE[08006] [7]"

Espera unos segundos después de `docker-compose up -d` para que PostgreSQL termine de inicializarse.

### Error: "extension pdo_pgsql not found"

Instala la extensión PHP:
- **Windows (XAMPP)**: Descomenta `extension=pdo_pgsql` en `php.ini`
- **Linux**: `sudo apt-get install php-pgsql`
- **Mac**: `brew install php-pgsql`

## Volver a SQLite

Si necesitas volver a SQLite, simplemente cambia en `.env`:

```env
DB_CONNECTION=sqlite
```

Y comenta las demás variables de base de datos.
