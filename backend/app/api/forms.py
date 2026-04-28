from fastapi import HTTPException, status


def normalize_required_text(value: str, *, field_name: str) -> str:
    normalized_value = (value or "").strip()

    if not normalized_value:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"{field_name} es obligatorio.",
        )

    return normalized_value


def normalize_optional_text(value: str | None) -> str | None:
    normalized_value = (value or "").strip()
    return normalized_value or None


def parse_optional_int(value: str | None, *, field_name: str) -> int | None:
    normalized_value = (value or "").strip()

    if not normalized_value:
        return None

    try:
        return int(normalized_value)
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"{field_name} debe ser un numero entero.",
        ) from error
