import google.generativeai as genai
import json
import re
from PIL import Image
from app.core.config import settings

class GeminiClient:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or settings.GEMINI_API_KEY
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel('gemini-flash-latest')
        else:
            self.model = None

    async def verify_detection(self, image_path: str, object_type: str = "manhole"):
        if not self.model:
            print("Gemini API key not configured!")
            return {"verified": False, "reason": "Gemini API key not configured"}
        try:
            img = Image.open(image_path)
            prompt = (
                f"Analyze this image carefully. Is there a {object_type} in this image?\n"
                "Focus specifically on safety hazards. Is the cover missing, displaced, partially open, or damaged?\n"
                "Look for: dark voids where a cover should be, tilted covers, or broken frames.\n"
                "Return a valid JSON object with the following keys:\n"
                "- 'is_target': boolean (true if a manhole is present)\n"
                "- 'is_hazard': boolean (true if the manhole is open, displaced, or significantly damaged)\n"
                "- 'severity': string ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')\n"
                "  - 'LOW': Cover is properly closed and secure.\n"
                "  - 'MEDIUM': Minor cosmetic damage or rust, but secure.\n"
                "  - 'HIGH': Cover is partially displaced or significantly damaged.\n"
                "  - 'CRITICAL': Cover is missing, completely open, or falling into the hole.\n"
                "- 'confidence': number (0.0 to 1.0, representing your certainty in this assessment)\n"
                "- 'description': a brief explanation of the visual evidence (e.g., 'Cover is missing, exposing a 2-foot drop').\n"
                "DO NOT include any explanation or markdown outside the JSON."
            )
            response = await self.model.generate_content_async([prompt, img])
            
            text = response.text
            json_match = re.search(r'\{.*\}', text, re.DOTALL)
            if json_match:
                result = json.loads(json_match.group())
                return {
                    "verified": True,
                    "is_hazard": result.get("is_hazard", False),
                    "severity": result.get("severity", "LOW"),
                    "confidence": result.get("confidence", 0.0),
                    "description": result.get("description", ""),
                    "analysis": text
                }
            is_hazard = "HIGH" in text.upper() or "CRITICAL" in text.upper() or "OPEN" in text.upper()
            return {
                "verified": True,
                "analysis": text,
                "is_hazard": is_hazard,
                "confidence": 0.85 if is_hazard else 0.95,
                "severity": "CRITICAL" if "CRITICAL" in text.upper() else "HIGH" if "HIGH" in text.upper() else "LOW"
            }
        except Exception as e:
            import traceback
            print(f"error: {e}")
            traceback.print_exc()
            return {"verified": False, "error": str(e)}

gemini_client = GeminiClient()
