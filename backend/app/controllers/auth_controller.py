from fastapi import HTTPException
from app.database import db
from app.models.user import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def register_user(user_data: User):
    """Registers a new user in the database."""
    
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password
    hashed_password = pwd_context.hash(user_data.hashed_password)
    user_data.hashed_password = hashed_password

    # Insert into database
    new_user = await db.users.insert_one(user_data.model_dump(by_alias=True))
    return {"message": "User registered successfully!", "user_id": str(new_user.inserted_id)}
