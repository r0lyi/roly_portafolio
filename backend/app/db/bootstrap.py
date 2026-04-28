from sqlalchemy import inspect, text

import app.db.models  # noqa: F401
from app.core.config import get_settings
from app.db.base import Base
from app.db.session import SessionLocal, engine
from app.services import users_service

settings = get_settings()


def init_db() -> None:
    Base.metadata.create_all(bind=engine)
    _migrate_project_images()
    _migrate_technologies_table()
    _migrate_users_table()
    _ensure_default_admin()


def _migrate_project_images() -> None:
    inspector = inspect(engine)
    table_names = inspector.get_table_names()

    if "project" not in table_names or "project_image" not in table_names:
        return

    project_columns = {column["name"] for column in inspector.get_columns("project")}
    if "image_url" not in project_columns:
        return

    with engine.begin() as connection:
        connection.execute(
            text(
                """
                INSERT INTO project_image (project_id, image_url, position)
                SELECT p.id, p.image_url, 0
                FROM project AS p
                WHERE p.image_url IS NOT NULL
                  AND p.image_url <> ''
                  AND NOT EXISTS (
                      SELECT 1
                      FROM project_image AS pi
                      WHERE pi.project_id = p.id
                  )
                """
            )
        )
        connection.execute(text("ALTER TABLE project DROP COLUMN image_url"))


def _migrate_technologies_table() -> None:
    inspector = inspect(engine)
    table_names = inspector.get_table_names()

    if "technology" not in table_names:
        return

    technology_columns = {column["name"] for column in inspector.get_columns("technology")}
    if "img_url" in technology_columns:
        return

    with engine.begin() as connection:
        connection.execute(text("ALTER TABLE technology ADD COLUMN img_url TEXT"))


def _migrate_users_table() -> None:
    inspector = inspect(engine)
    table_names = inspector.get_table_names()

    if "users" not in table_names:
        return

    user_columns = {column["name"] for column in inspector.get_columns("users")}

    with engine.begin() as connection:
        if "password_hash" not in user_columns:
            if "hashed_password" in user_columns:
                connection.execute(
                    text(
                        "ALTER TABLE users RENAME COLUMN hashed_password TO password_hash"
                    )
                )
            else:
                connection.execute(text("ALTER TABLE users ADD COLUMN password_hash TEXT"))

        if "password_hash" in user_columns or "hashed_password" in user_columns:
            connection.execute(
                text("ALTER TABLE users ALTER COLUMN password_hash TYPE TEXT")
            )

        for column_name in ("first_name", "last_name", "username"):
            if column_name in user_columns:
                connection.execute(
                    text(f'ALTER TABLE users ALTER COLUMN "{column_name}" DROP NOT NULL')
                )

        for column_name in ("is_active", "is_superuser"):
            if column_name in user_columns:
                connection.execute(
                    text(
                        f'ALTER TABLE users ALTER COLUMN "{column_name}" SET DEFAULT FALSE'
                    )
                )


def _ensure_default_admin() -> None:
    if not settings.auto_create_default_admin:
        return

    db = SessionLocal()

    try:
        users_service.ensure_default_admin(
            db,
            email=settings.admin_email,
            password=settings.admin_password,
        )
    finally:
        db.close()
