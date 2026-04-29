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
2. `.env.local` o `.env.production` segun `APP_ENV`
3. Variables reales del sistema si existen

### Local

- `APP_ENV=local`
- `DEBUG=true` por defecto
- Si no defines `DATABASE_URL`, usa las variables `DB_*`
- `AUTO_CREATE_DEFAULT_ADMIN=true` por defecto

Ejemplo rapido:

```bash
cp .env.local.example .env.local
uv run uvicorn app.main:app --reload
```

### Produccion

- `APP_ENV=production`
- `DEBUG=false` recomendado
- Debes configurar `DATABASE_URL` o todas las variables `DB_*`
- `AUTO_CREATE_DEFAULT_ADMIN` queda desactivado por defecto
- `PUBLIC_IMAGE_DIR` te permite cambiar donde se guardan y sirven imagenes
- Si usas un proveedor como Supabase con `DB_*`, puedes necesitar `DB_SSLMODE=require`

Ejemplo rapido:

```bash
cp .env.production.example .env.production
uv run uvicorn app.main:app --host 0.0.0.0 --port 8000
```

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
- Los archivos de ejemplo `.env*.example` sirven como plantilla; evita versionar credenciales reales.
