from fastapi import HTTPException
from app.database import db
from app.models.sketches import Sketch
from bson import ObjectId
import base64

# adding the sketch to the database
async def add_sketch(sketch_data: Sketch):
    try:
        sketch_dict = sketch_data.dict(by_alias=True)
        sketch_dict['image'] = sketch_data.image
        
        new_sketch = await db.sketches.insert_one(sketch_dict)
        return {"message": "Sketch added successfully!", "sketch_id": str(new_sketch.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


# listing the specific id and the skethc name for a general view
async def get_sketch_list():
    try:
        sketches = await db.sketches.find({}, {"name": 1, "special_id": 1}).to_list(None)
        
        for sketch in sketches:
            sketch["_id"] = str(sketch["_id"])
        
        return sketches
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


# getting detailed overview of the selected sketch from that special_id
async def get_sketch_by_special_id(special_id: str):
    try:
        sketch = await db.sketches.find_one({"special_id": special_id})
        
        if not sketch:
            raise HTTPException(status_code=404, detail="Sketch not found")
        
        sketch["_id"] = str(sketch["_id"])
        
        if "image" in sketch:
            sketch["image"] = base64.b64encode(sketch["image"]).decode('utf-8')
        
        return sketch
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


# listing everything from the sketches collection
async def get_all_sketches():
    try:
        sketches = await db.sketches.find({}).to_list(None)

        for sketch in sketches:
            sketch["_id"] = str(sketch["_id"])

            if "image" in sketch and sketch["image"]:
                sketch["image"] = base64.b64encode(sketch["image"]).decode('utf-8')

        return sketches
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")



# Get all sketches in a specific category
async def get_sketches_by_category(category: str):
    try:
        sketches = await db.sketches.find({"category": category}).to_list(None)

        for sketch in sketches:
            sketch["_id"] = str(sketch["_id"])
            if "image" in sketch and sketch["image"]:
                sketch["image"] = base64.b64encode(sketch["image"]).decode('utf-8')

        return sketches
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")



# Fetch distinct categories
async def get_all_categories():
    try:
        categories = await db.sketches.distinct("category")
        return categories
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")




# Deleting a sketch by special_id
async def delete_sketch_by_special_id(special_id: str):
    try:
        result = await db.sketches.delete_one({"special_id": special_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Sketch not found")
        
        return {"message": "Sketch deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


#filteration by quality[rating]
async def get_sketches_by_quality(quality: int):
    try:
        sketches = await db.sketches.find({"quality": quality}).to_list(None)

        for sketch in sketches:
            sketch["_id"] = str(sketch["_id"])
            if "image" in sketch and sketch["image"]:
                sketch["image"] = base64.b64encode(sketch["image"]).decode('utf-8')

        return sketches
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
