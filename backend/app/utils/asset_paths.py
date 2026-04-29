import re

EXTERNAL_URL_PATTERN = re.compile(r"^(?:[a-z][a-z0-9+\-.]*:|//)", re.IGNORECASE)


def normalize_public_asset_path(
    value: str | None,
    default_directory: str = "/img",
) -> str:
    path = (value or "").strip().replace("\\", "/")

    if not path:
        return ""

    if EXTERNAL_URL_PATTERN.match(path):
        return path

    if path.startswith("./"):
        path = path[2:]

    if path.startswith("/public/"):
        return path[len("/public") :]

    if path.startswith("public/"):
        return f"/{path[len('public/') :]}"

    if path.startswith("/"):
        return path

    normalized_base = f"/{default_directory.strip('/')}"

    if path.startswith(f"{normalized_base[1:]}/"):
        return f"/{path}"

    return f"{normalized_base}/{path.lstrip('/')}"
