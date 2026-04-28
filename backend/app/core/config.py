import os
from dataclasses import dataclass
from enum import Enum
from functools import lru_cache
from pathlib import Path

from dotenv import dotenv_values

BACKEND_DIR = Path(__file__).resolve().parents[2]
FRONTEND_DIR = BACKEND_DIR.parent / "frontend"
TRUE_VALUES = {"1", "true", "yes", "on", "debug", "development", "dev"}
FALSE_VALUES = {"0", "false", "no", "off", "release", "production", "prod"}


class Environment(str, Enum):
    LOCAL = "local"
    PRODUCTION = "production"


def _load_environment_files() -> str:
    original_environment_keys = set(os.environ)

    for key, value in dotenv_values(BACKEND_DIR / ".env").items():
        if value is not None and key not in original_environment_keys:
            os.environ.setdefault(key, value)

    raw_environment = (os.getenv("APP_ENV") or Environment.LOCAL.value).strip().lower()
    environment_name = raw_environment or Environment.LOCAL.value
    environment_file = BACKEND_DIR / f".env.{environment_name}"

    if environment_file.exists():
        for key, value in dotenv_values(environment_file).items():
            if value is not None and key not in original_environment_keys:
                os.environ[key] = value

    return environment_name


_BOOTSTRAPPED_ENVIRONMENT = _load_environment_files()


@dataclass(frozen=True)
class Settings:
    app_name: str
    environment: Environment
    debug: bool
    api_prefix: str
    database_url: str
    database_echo: bool
    auto_create_default_admin: bool
    admin_email: str
    admin_password: str
    backend_dir: Path
    frontend_dir: Path
    public_image_dir: Path
    public_image_url_prefix: str
    technology_image_dir: str
    technology_image_upload_dir: Path
    project_image_dir: str
    project_image_upload_dir: Path


def _read_environment() -> Environment:
    raw_environment = (os.getenv("APP_ENV") or _BOOTSTRAPPED_ENVIRONMENT).strip().lower()

    try:
        return Environment(raw_environment or Environment.LOCAL.value)
    except ValueError as error:
        raise RuntimeError("APP_ENV must be either 'local' or 'production'.") from error


def _read_bool(name: str, *, default: bool) -> bool:
    raw_value = os.getenv(name)
    if raw_value is None:
        return default

    normalized_value = raw_value.strip().lower()
    if not normalized_value:
        return default
    if normalized_value in TRUE_VALUES:
        return True
    if normalized_value in FALSE_VALUES:
        return False

    raise RuntimeError(
        f"{name} must be one of: {sorted(TRUE_VALUES | FALSE_VALUES)}."
    )


def _read_value(name: str, *, default: str | None = None) -> str | None:
    raw_value = os.getenv(name)
    if raw_value is None:
        return default

    normalized_value = raw_value.strip()
    return normalized_value or default


def _build_database_url(environment: Environment) -> str:
    direct_database_url = _read_value("DATABASE_URL")
    if direct_database_url:
        return direct_database_url

    local_defaults = {
        "DB_USER": "portfolio_user",
        "DB_PASSWORD": "usuario1",
        "DB_HOST": "localhost",
        "DB_PORT": "5432",
        "DB_NAME": "portfolio_db",
    }
    defaults = local_defaults if environment is Environment.LOCAL else {}

    components = {
        "DB_USER": _read_value("DB_USER", default=defaults.get("DB_USER")),
        "DB_PASSWORD": _read_value("DB_PASSWORD", default=defaults.get("DB_PASSWORD")),
        "DB_HOST": _read_value("DB_HOST", default=defaults.get("DB_HOST")),
        "DB_PORT": _read_value("DB_PORT", default=defaults.get("DB_PORT")),
        "DB_NAME": _read_value("DB_NAME", default=defaults.get("DB_NAME")),
    }
    missing_values = [name for name, value in components.items() if not value]

    if missing_values:
        missing_fields = ", ".join(missing_values)
        raise RuntimeError(
            f"Database configuration is incomplete. Missing values: {missing_fields}."
        )

    return (
        "postgresql+psycopg2://"
        f"{components['DB_USER']}:{components['DB_PASSWORD']}"
        f"@{components['DB_HOST']}:{components['DB_PORT']}/{components['DB_NAME']}"
    )


def _read_admin_credentials(
    environment: Environment,
    *,
    auto_create_default_admin: bool,
) -> tuple[str, str]:
    local_defaults = {
        "ADMIN_EMAIL": "admin@local.test",
        "ADMIN_PASSWORD": "change-me-local",
    }
    defaults = local_defaults if environment is Environment.LOCAL else {}

    admin_email = _read_value("ADMIN_EMAIL", default=defaults.get("ADMIN_EMAIL")) or ""
    admin_password = (
        _read_value("ADMIN_PASSWORD", default=defaults.get("ADMIN_PASSWORD")) or ""
    )

    if auto_create_default_admin and (not admin_email or not admin_password):
        raise RuntimeError(
            "ADMIN_EMAIL and ADMIN_PASSWORD are required when "
            "AUTO_CREATE_DEFAULT_ADMIN is enabled."
        )

    return admin_email, admin_password


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    environment = _read_environment()
    debug = _read_bool("DEBUG", default=environment is Environment.LOCAL)
    database_echo = _read_bool("DATABASE_ECHO", default=debug)
    auto_create_default_admin = _read_bool(
        "AUTO_CREATE_DEFAULT_ADMIN",
        default=environment is Environment.LOCAL,
    )
    admin_email, admin_password = _read_admin_credentials(
        environment,
        auto_create_default_admin=auto_create_default_admin,
    )

    public_image_url_prefix = _read_value("PUBLIC_IMAGE_URL_PREFIX", default="/img") or "/img"
    technology_image_dir = (
        _read_value("TECHNOLOGY_IMAGE_DIR", default=f"{public_image_url_prefix}/tecnologias")
        or f"{public_image_url_prefix}/tecnologias"
    )
    project_image_dir = (
        _read_value("PROJECT_IMAGE_DIR", default=f"{public_image_url_prefix}/proyectos")
        or f"{public_image_url_prefix}/proyectos"
    )

    public_image_dir = FRONTEND_DIR / "public" / public_image_url_prefix.strip("/")

    return Settings(
        app_name=_read_value("APP_NAME", default="Portfolio API") or "Portfolio API",
        environment=environment,
        debug=debug,
        api_prefix=_read_value("API_PREFIX", default="/api") or "/api",
        database_url=_build_database_url(environment),
        database_echo=database_echo,
        auto_create_default_admin=auto_create_default_admin,
        admin_email=admin_email,
        admin_password=admin_password,
        backend_dir=BACKEND_DIR,
        frontend_dir=FRONTEND_DIR,
        public_image_dir=public_image_dir,
        public_image_url_prefix=public_image_url_prefix,
        technology_image_dir=technology_image_dir,
        technology_image_upload_dir=public_image_dir / "tecnologias",
        project_image_dir=project_image_dir,
        project_image_upload_dir=public_image_dir / "proyectos",
    )
