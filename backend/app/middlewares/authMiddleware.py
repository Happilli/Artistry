from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import JSONResponse
import jwt
from app.config import SECRET_KEY, ALGORITHM

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

async def verify_jwt_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return JSONResponse(status_code=401, content={"message": "Token has expired"})
    except jwt.InvalidTokenError:
        return JSONResponse(status_code=401, content={"message": "Invalid token"})
