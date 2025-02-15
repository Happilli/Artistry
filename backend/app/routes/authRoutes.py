from fastapi import APIRouter, Depends
from app.controllers.auth_controller import register_user, login_user
from app.models.user import User
from pydantic import BaseModel
router = APIRouter(prefix="/auth", tags=["Auth"])

class LoginRequest(BaseModel):
    email: str
    password: str

#register
@router.post("/register")
async def register(user: User):
    """Registers a new user and returns success message."""
    return await register_user(user)

#login
@router.post("/login")
async def login(login_data: LoginRequest):
    return await login_user(login_data.email, login_data.password)