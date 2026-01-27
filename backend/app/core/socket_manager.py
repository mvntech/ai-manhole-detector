import socketio
from typing import Any

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')

socket_app = socketio.ASGIApp(sio)

@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")

@sio.event
async def join_camera(sid, camera_id):
    await sio.enter_room(sid, f"camera_{camera_id}")
    print(f"Client {sid} joined room camera_{camera_id}")

class SocketManager:
    @staticmethod
    async def broadcast_detection(detection_data: Any):
        await sio.emit("new_detection", detection_data)
        camera_id = detection_data.get("camera_id")
        if camera_id:
            await sio.emit("new_detection", detection_data, room=f"camera_{camera_id}")

    @staticmethod
    async def broadcast_alert(alert_data: Any):
        await sio.emit("new_alert", alert_data)

socket_manager = SocketManager()
