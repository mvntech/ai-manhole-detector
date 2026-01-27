import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Alert } from "@/types/alert"

export function useAlerts() {
    const queryClient = useQueryClient()

    const alertsQuery = useQuery({
        queryKey: ["alerts"],
        queryFn: async () => {
            const response = await api.get<Alert[]>("/alerts/")
            return response.data
        },
    })

    const updateAlertMutation = useMutation({
        mutationFn: async ({ id, ...data }: Partial<Alert> & { id: string }) => {
            const response = await api.put<Alert>(`/alerts/${id}`, data)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["alerts"] })
        },
    })

    return {
        alerts: alertsQuery.data ?? [],
        isLoading: alertsQuery.isLoading,
        isError: alertsQuery.isError,
        updateAlert: updateAlertMutation.mutate,
    }
}
