# Backend Portfolio API

Backend en FastAPI organizado para que sea facil de navegar, mantener y desplegar.

## Estructura

```text
app/
├── api/
│   ├── dependencies.py
│   ├── forms.py
│   └── v1/
│       ├── endpoints/
│       └── router.py
├── core/
│   ├── application.py
│   └── config.py
├── db/
│   ├── base.py
│   ├── bootstrap.py
│   ├── models.py
│   └── session.py
├── models/
├── schemas/
├── services/
└── main.py
```

## Responsabilidades

- `app/core`: configuracion global, perfiles de entorno y creacion de la app.
- `app/db`: engine, sesiones, carga de modelos y bootstrap de base de datos.
- `app/api/v1/endpoints`: endpoints HTTP agrupados y listos para versionado.
- `app/services`: logica de negocio y acceso a datos a nivel de caso de uso.
- `app/models` y `app/schemas`: contratos de persistencia y de entrada/salida.

## Modos de ejecucion

La configuracion se carga en este orden:

1. `.env`
2. Variables reales del sistema si existen

### Local

- `APP_ENV=local`
- `DEBUG=true` por defecto
- `CORS_ALLOW_ORIGINS` permite llamadas desde el frontend en otro origen
- Si no defines `DATABASE_URL`, usa las variables `DB_*`
- `AUTO_CREATE_DEFAULT_ADMIN=true` por defecto

Ejemplo rapido:

```bash
cp .env.example .env
uv run uvicorn app.main:app --reload
```

### Produccion

- `APP_ENV=production`
- `DEBUG=false` recomendado
- Puedes usar `CORS_ALLOW_ORIGINS=*` si quieres aceptar cualquier frontend; `0.0.0.0` no sirve como origen CORS para navegador
- Debes configurar `DATABASE_URL` o todas las variables `DB_*`
- `AUTO_CREATE_DEFAULT_ADMIN` queda desactivado por defecto
- `PUBLIC_IMAGE_DIR` te permite cambiar donde se guardan y sirven imagenes
- Si usas un proveedor como Supabase con `DB_*`, puedes necesitar `DB_SSLMODE=require`

Ejemplo rapido:

```bash
cp .env.example .env
uv run uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Railway

- Usa [`.env.example`](/home/jelen/Documentos/roly_portafolio/backend/.env.example:1) como referencia unica para las variables
- `PORT` no hace falta configurarlo manualmente porque Railway lo inyecta
- Si vas a subir imagenes desde el backend, monta un volumen y apunta `PUBLIC_IMAGE_DIR` a una ruta persistente como `/data/img`
- Si conectas una base de datos externa o una variable que Railway te expone con otro nombre, copia su valor a `DATABASE_URL`

### Koyeb

- Usa el `Procfile` del repo para arrancar con `gunicorn` enlazado a `0.0.0.0:$PORT`
- Si despliegas solo el subdirectorio `backend` de un monorepo, configura `PUBLIC_IMAGE_DIR`
- Si quieres persistir uploads, monta un volumen y apunta `PUBLIC_IMAGE_DIR` a esa ruta

## Endpoints base

- `GET /` estado basico de la aplicacion
- `GET /api/health/` healthcheck
- `GET /api/auth/status` estado del admin

## Notas de equipo

- Los imports antiguos de `app/api/routes` y `app/database` siguen funcionando como compatibilidad.
- Para codigo nuevo, usa siempre `app.api.v1`, `app.core` y `app.db`.
- Usa solo `.env` como archivo local de configuracion y evita versionar credenciales reales.
