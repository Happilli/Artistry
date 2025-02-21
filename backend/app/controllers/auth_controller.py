from datetime import datetime, timedelta
import jwt
from fastapi import HTTPException
from passlib.context import CryptContext
from app.database import db
from app.models.user import User
from app.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


#accessing token
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# #registering user [commenting un used fucntions]
# async def register_user(user_data: User):
#     existing_user = await db.users.find_one({"email": user_data.email})
#     if existing_user:
#         raise HTTPException(status_code=400, detail="Email already registered")

#     hashed_password = pwd_context.hash(user_data.hashed_password)
#     user_data.hashed_password = hashed_password

#     try:
#         new_user = await db.users.insert_one(user_data.dict(by_alias=True))
#         return {"message": "User registered successfully!", "user_id": str(new_user.inserted_id)}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


#loggingin-User
async def authenticate_user(email: str, password: str):
    user = await db.users.find_one({"email": email})
    if not user or not pwd_context.verify(password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    return user

async def login_user(email: str, password: str):
    user = await authenticate_user(email, password)
    access_token = create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}
