import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Detection } from "@/types/detection"

export function useDetections() {
    const queryClient = useQueryClient()

    const detectionsQuery = useQuery({
        queryKey: ["detections"],
        queryFn: async () => {
            const response = await api.get<Detection[]>("/detections/")
            return response.data
        },
    })

    const uploadDetectionMutation = useMutation({
        mutationFn: async ({ cameraId, file }: { cameraId: string; file: File }) => {
            const formData = new FormData()
            formData.append("camera_id", cameraId)
            formData.append("file", file)
            const response = await api.post<Detection>("/detections/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["detections"] })
            queryClient.invalidateQueries({ queryKey: ["alerts"] })
        },
    })

    return {
        detections: detectionsQuery.data ?? [],
        isLoading: detectionsQuery.isLoading,
        isError: detectionsQuery.isError,
        uploadDetection: uploadDetectionMutation.mutate,
    }
}
