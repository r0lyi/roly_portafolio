from app.schemas.base import AppSchema


class AuthStatusRead(AppSchema):
    admin_configured: bool
