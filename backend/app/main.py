from fastapi import FastAPI
from app.database import db
from app.routes import authRoutes

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Database connected successfully!"}


app.include_router(authRoutes.router)