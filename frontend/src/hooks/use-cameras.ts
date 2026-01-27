import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Camera } from "@/types/camera"

export function useCameras() {
    const queryClient = useQueryClient()

    const camerasQuery = useQuery({
        queryKey: ["cameras"],
        queryFn: async () => {
            const response = await api.get<Camera[]>("/cameras/")
            return response.data
        },
    })

    const createCameraMutation = useMutation({
        mutationFn: async (newCamera: Partial<Camera>) => {
            const response = await api.post<Camera>("/cameras/", newCamera)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cameras"] })
        },
    })

    return {
        cameras: camerasQuery.data ?? [],
        isLoading: camerasQuery.isLoading,
        isError: camerasQuery.isError,
        createCamera: createCameraMutation.mutate,
    }
}
