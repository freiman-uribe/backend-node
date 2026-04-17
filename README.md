# backend-node

API REST con Node 21, TypeScript, Express y arquitectura hexagonal que consume la API publica de CoinGecko.

## Que hace este proyecto

Expone un endpoint propio `GET /external-data` que:

1. Consulta la API externa de CoinGecko (mercados de criptomonedas).
2. Transforma los datos crudos a un contrato propio.
3. Persiste el resultado en SQLite usando TypeORM con Entities.
4. Retorna JSON limpio y consistente.

## Stack tecnico

- Node.js 21
- TypeScript
- Express
- TypeORM
- SQLite
- Axios

## Arquitectura

Separacion clara por modulos y capas (hexagonal):

```
src/
  config/            → variables de entorno
  domain/
    models/          → interfaces de dominio
    ports/           → contratos (puertos)
    errors/          → errores de dominio
  application/
    services/        → servicio de transformacion
    use-cases/       → caso de uso principal
  infrastructure/
    external/        → cliente CoinGecko (adaptador)
    http/
      controllers/   → controller del endpoint
      routes/        → definicion de rutas
      modules/       → ensamblado de dependencias
      middlewares/   → manejo global de errores
    persistence/
      typeorm/
        entities/    → entidad ORM
        repositories/→ repositorio TypeORM
```

Flujo: Route → Controller → Use Case → Service + CoinGecko Client + Repository → Response JSON.

## Como ejecutar localmente

Requisitos: Node 21, npm.

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo de entorno
cp .env.example .env

# 3. Iniciar en desarrollo
npm run dev

# 4. Compilar
npm run build

# 5. Ejecutar compilado
npm start
```

## Endpoint

**GET /external-data**

Query opcional: `limit` (1-50, default 5)

```json
[
  {
    "id": "bitcoin",
    "symbol": "BTC",
    "name": "Bitcoin",
    "priceUsd": 74089,
    "marketCapRank": 1,
    "source": "coingecko",
    "fetchedAt": "2026-04-17T12:00:00.000Z"
  }
]
```

**GET /health** → `{ "status": "ok" }`

## API externa utilizada

- CoinGecko API publica: https://api.coingecko.com/api/v3
- Endpoint consumido: `/coins/markets`

## Variables de entorno

| Variable | Descripcion | Default |
|---|---|---|
| PORT | Puerto del servidor | 3000 |
| NODE_ENV | Entorno | development |
| EXTERNAL_API_URL | URL base CoinGecko | https://api.coingecko.com/api/v3 |
| EXTERNAL_API_TIMEOUT_MS | Timeout HTTP | 8000 |
| EXTERNAL_DATA_LIMIT | Limite por defecto | 5 |
| SQLITE_PATH | Ruta archivo SQLite | ./db/backend-node.sqlite |
| AZURE_STORAGE_ACCOUNT_NAME | Cuenta storage Azure | |
| AZURE_STORAGE_CONTAINER | Contenedor blob | |
| AZURE_STORAGE_SAS_TOKEN | Token SAS | |

## Azure: como desplegar esta API

### 1. Azure App Service

- Crear App Service Linux con Node 21.
- Crear Resource Group y App Service Plan.

### 2. Variables de entorno en Azure

En App Service → Configuration, agregar todas las variables de la tabla anterior con `NODE_ENV=production`.

### 3. Despliegue desde GitHub

- Conectar el repositorio de GitHub al App Service.
- Al hacer push a `main`, Azure despliega automaticamente.
- La aplicacion queda accesible por URL publica: `https://<app-name>.azurewebsites.net`

### 4. Carga de archivos a Azure Storage con SAS

1. En Storage Account, generar un token SAS con permisos acotados (create, write, list).
2. Guardar el token como variable `AZURE_STORAGE_SAS_TOKEN`.
3. URL de subida: `https://<storage-account>.blob.core.windows.net/<container>/<archivo>?<sas-token>`
4. Recomendaciones:
   - Expiracion corta y permisos minimos.
   - Rotar periodicamente el token.
