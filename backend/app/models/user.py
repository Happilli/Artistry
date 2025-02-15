from pydantic import BaseModel, EmailStr
from typing import Optional
from bson import ObjectId

class PyObjectId(ObjectId):
    """Custom ObjectId serializer for Pydantic."""
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return str(v)

class User(BaseModel):
    id: Optional[PyObjectId] = None
    name: str
    email: EmailStr
    hashed_password: str

    class Config:
        json_encoders = {ObjectId: str}
        from_attributes = True
