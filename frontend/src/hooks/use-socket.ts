import { useEffect, useCallback } from "react"
import { io, Socket } from "socket.io-client"
import { useAuthStore } from "@/store/auth-store"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"

let socket: Socket | null = null

export function useSocket() {
    const token = useAuthStore((state) => state.token)
    const queryClient = useQueryClient()

    const connect = useCallback(() => {
        if (!socket && token) {
            const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "http://localhost:8000"
            socket = io(API_URL, {
                path: "/socket.io",
                auth: { token },
            })

            socket.on("connect", () => {
                print("Connected to WebSocket")
            })

            socket.on("new_detection", (data) => {
                print("New detection received:", data)
                queryClient.invalidateQueries({ queryKey: ["detections"] })
            })

            socket.on("new_alert", (data) => {
                print("New alert received:", data)
                toast.error(`CRITICAL: ${data.title}`, {
                    duration: 5000,
                    icon: '🚨'
                })
                queryClient.invalidateQueries({ queryKey: ["alerts"] })
            })
        }
    }, [token, queryClient])

    useEffect(() => {
        connect()
        return () => {
            // keep the socket alive during the session
            // or disconnect if the component unmounts depending on the use case
        }
    }, [connect])

    return { socket }
}

function print(message: string, ...args: any[]) {
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Socket] ${message}`, ...args)
    }
}
