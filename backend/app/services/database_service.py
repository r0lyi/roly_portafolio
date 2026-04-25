import os

from sqlalchemy import inspect, text

from app.database.base import Base
from app.database.connection import engine
from app.database.session import SessionLocal
from app.services import users_service

DEFAULT_ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "rolysilvestre2@gmail.com")
DEFAULT_ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "WEB%rsg2005")


def init_db() -> None:
    _load_models()
    Base.metadata.create_all(bind=engine)
    _migrate_project_images()
    _migrate_technologies_table()
    _migrate_users_table()
    _ensure_default_admin()


def _load_models() -> None:
    import app.models.contact_message  # noqa: F401
    import app.models.experience  # noqa: F401
    import app.models.project  # noqa: F401
    import app.models.project_image  # noqa: F401
    import app.models.technology  # noqa: F401
    import app.models.user  # noqa: F401


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
                connection.execute(text("ALTER TABLE users RENAME COLUMN hashed_password TO password_hash"))
            else:
                connection.execute(text("ALTER TABLE users ADD COLUMN password_hash TEXT"))

        if "password_hash" in user_columns or "hashed_password" in user_columns:
            connection.execute(text("ALTER TABLE users ALTER COLUMN password_hash TYPE TEXT"))

        for column_name in ("first_name", "last_name", "username"):
            if column_name in user_columns:
                connection.execute(
                    text(f'ALTER TABLE users ALTER COLUMN "{column_name}" DROP NOT NULL')
                )

        for column_name in ("is_active", "is_superuser"):
            if column_name in user_columns:
                connection.execute(
                    text(f'ALTER TABLE users ALTER COLUMN "{column_name}" SET DEFAULT FALSE')
                )


def _ensure_default_admin() -> None:
    db = SessionLocal()

    try:
        users_service.ensure_default_admin(
            db,
            email=DEFAULT_ADMIN_EMAIL,
            password=DEFAULT_ADMIN_PASSWORD,
        )
    finally:
        db.close()
