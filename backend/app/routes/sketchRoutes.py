from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from app.controllers.sketch_controller import add_sketch, get_sketch_list, get_sketch_by_special_id, get_all_sketches, get_all_categories, get_sketches_by_category
from app.models.sketches import Sketch
from app.middlewares.authMiddleware import verify_jwt_token
from fastapi.responses import JSONResponse

router = APIRouter(prefix="/sketches", tags=["Sketches"])

# Route to add a sketch (with image upload)
@router.post("/add")
async def add_sketch_route(
    name: str = Form(...),
    description: str = Form(None),
    quality: int = Form(...),
    category: str = Form(...),
    special_id: str = Form(...),
    image: UploadFile = File(...), 
    payload: dict = Depends(verify_jwt_token)  
):
    if isinstance(payload, JSONResponse):
        return payload  
    
    sketch = Sketch(
        name=name,
        description=description,
        quality=quality,
        category=category,
        special_id=special_id
    )
    
    image_bytes = await image.read()

    sketch.image = image_bytes 

    return await add_sketch(sketch)




#publicly accessing these
@router.get("/listsketch")
async def list_sketch_route():
    sketches = await get_sketch_list()
    return {"sketches": sketches}

@router.get("/getsketch/{special_id}")
async def get_sketch_route(special_id: str):
    sketch = await get_sketch_by_special_id(special_id)
    return {"sketch": sketch}


@router.get("/pollute")
async def get_all_sketches_route():
    sketches = await get_all_sketches()
    return {"sketches": sketches}


#implement category listing route
@router.get("/categories")
async def list_categories():
    categories = await get_all_categories()
    return {"categories": categories}


#implement searching one group of sketches matching that catogory
@router.get("/category/{category}")
async def list_sketches_by_category(category: str):
    sketches = await get_sketches_by_category(category)
    return {"sketches": sketches}
