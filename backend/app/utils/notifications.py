import os
from typing import Optional
from twilio.rest import Client as TwilioClient
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from app.core.config import settings

class NotificationService:
    @staticmethod
    def send_sms(message: str) -> bool:
        if not all([settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN, settings.TWILIO_FROM_NUMBER, settings.TO_PHONE_NUMBER]):
            print("Twilio settings not fully configured.")
            return False
        
        try:
            client = TwilioClient(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
            client.messages.create(
                body=message,
                from_=settings.TWILIO_FROM_NUMBER,
                to=settings.TO_PHONE_NUMBER
            )
            print(f"SMS sent successfully: {message[:50]}...")
            return True
        except Exception as e:
            print(f"Failed to send SMS: {e}")
            return False

    @staticmethod
    def send_email(subject: str, content: str) -> bool:
        if not all([settings.SENDGRID_API_KEY, settings.FROM_EMAIL, settings.TO_EMAIL]):
            print("SendGrid settings not fully configured.")
            return False
        
        try:
            message = Mail(
                from_email=settings.FROM_EMAIL,
                to_emails=settings.TO_EMAIL,
                subject=subject,
                plain_text_content=content
            )
            sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
            sg.send(message)
            print(f"Email sent successfully: {subject}")
            return True
        except Exception as e:
            print(f"Failed to send Email: {e}")
            return False

    @staticmethod
    def trigger_alerts(severity: str, location: str, description: str):
        if severity not in ["HIGH", "CRITICAL"]:
            return

        subject = f"ALERT: {severity} Manhole Hazard Detected"
        body = f"A {severity} hazard has been detected at {location}.\n\nDescription: {description}\n\nPlease check the dashboard immediately."
        
        # in production, we can probably queue these
        NotificationService.send_sms(f"{subject}. {location}")
        NotificationService.send_email(subject, body)

notification_service = NotificationService()
