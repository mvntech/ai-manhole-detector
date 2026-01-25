import os
from ultralytics import YOLO
from app.core.config import settings

class YOLODetector:
    def __init__(self, model_path: str = None):
        self.model_path = model_path or settings.YOLO_MODEL_PATH
        self.model = None
        
        if os.path.exists(self.model_path):
            self.model = YOLO(self.model_path)
        else:
            print(f"Warning: Model path {self.model_path} does not exist. Using yolov8n.pt as fallback.")
            self.model = YOLO("yolov8n.pt")

    def detect(self, image_path: str, conf_threshold: float = 0.5):
        if not self.model:
            return []
            
        results = self.model(image_path, conf=conf_threshold)
        detections = []
        
        for result in results:
            for box in result.boxes:
                detections.append({
                    "bbox": box.xywh[0].tolist(),
                    "confidence": float(box.conf[0]),
                    "class_id": int(box.cls[0]),
                    "class_name": result.names[int(box.cls[0])]
                })
                
        return detections

yolo_detector = YOLODetector()
