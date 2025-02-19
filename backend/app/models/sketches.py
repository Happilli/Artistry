from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId
from io import BytesIO
from fastapi import UploadFile

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


class Sketch(BaseModel):
    id: Optional[PyObjectId] = None
    name: str
    description: Optional[str] = None
    quality: int = Field(..., ge=1, le=5, description="Quality rating out of 5")
    category: str
    special_id: str  
    image: Optional[bytes] = None  #
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {ObjectId: str}
        from_attributes = True






