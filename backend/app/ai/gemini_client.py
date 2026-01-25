import google.generativeai as genai
from PIL import Image
from app.core.config import settings

class GeminiClient:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or settings.GEMINI_API_KEY
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
        else:
            self.model = None

    async def verify_detection(self, image_path: str, object_type: str = "manhole"):
        if not self.model:
            return {"verified": False, "reason": "Gemini API key not configured"}
        try:
            img = Image.open(image_path)
            prompt = f"Analyze this image. Is there a {object_type} in this image? Is it open or damaged? " \
                     f"Provide a JSON response with keys 'is_target', 'is_hazard', 'severity' (LOW, MEDIUM, HIGH, CRITICAL), and 'description'."
            response = await self.model.generate_content_async([prompt, img])
            return {
                "verified": True,
                "analysis": response.text,
                "raw_response": str(response)
            }
        except Exception as e:
            return {"verified": False, "error": str(e)}

gemini_client = GeminiClient()
