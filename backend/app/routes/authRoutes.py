from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from app.controllers.auth_controller import register_user, login_user
from app.middlewares.authMiddleware import verify_jwt_token
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


##testing reusable middleware
@router.get("/protected")
async def protected_route(payload: dict = Depends(verify_jwt_token)):
    if isinstance(payload, JSONResponse):
        return payload  
    
    return {"message": "You have access to this protected route", "user": payload}