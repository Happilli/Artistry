from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from app.controllers.sketch_controller import add_sketch, get_sketch_list, get_sketch_by_special_id
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




# Route to get list of sketches with name and special_id
@router.get("/listsketch")
async def list_sketch_route(payload: dict = Depends(verify_jwt_token)):
    if isinstance(payload, JSONResponse):
        return payload

    sketches = await get_sketch_list()
    return {"sketches": sketches}





# Route to get a sketch by special_id
@router.get("/getsketch/{special_id}")
async def get_sketch_route(special_id: str, payload: dict = Depends(verify_jwt_token)):
    if isinstance(payload, JSONResponse):
        return payload
    
    sketch = await get_sketch_by_special_id(special_id)
    return {"sketch": sketch}