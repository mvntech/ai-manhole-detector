import os
import shutil
import uuid
from fastapi import UploadFile
from app.core.config import settings

UPLOAD_DIR = "uploads"

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

async def save_upload_file(upload_file: UploadFile, folder: str = "") -> str:
    dest_folder = os.path.join(UPLOAD_DIR, folder)
    if not os.path.exists(dest_folder):
        os.makedirs(dest_folder)
        
    file_extension = os.path.splitext(upload_file.filename)[1]
    file_name = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(dest_folder, file_name)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
        
    return file_path
