from fastapi import FastAPI
from app.database import db
from app.routes import authRoutes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


# cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

@app.get("/")
async def root():
    return {"message": "Database connected successfully!"}

app.include_router(authRoutes.router)
