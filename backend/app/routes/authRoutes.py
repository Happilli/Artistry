from fastapi import APIRouter, Depends
from app.controllers.auth_controller import register_user
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
async def register(user: User):
    """Registers a new user and returns success message."""
    return await register_user(user)
