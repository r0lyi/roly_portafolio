from . import models
from .database.base import Base
from .database.connection import engine
from sqlalchemy import inspect, text


def init_db() -> None:
    Base.metadata.create_all(bind=engine)
    _migrate_project_images()


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
