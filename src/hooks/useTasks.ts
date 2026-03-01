import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getTasks, updateTask, createTask, deleteTask } from "../api/api"
import type { Task } from "../types"

/* ------------------ GET TASKS ------------------ */
export const useTasks = (patientId: string) => {
  return useQuery({
    queryKey: ["tasks", patientId],
    queryFn: () => getTasks(patientId),
  })
}

/* ------------------ DELETE TASK ------------------ */
export const useDeleteTask = (patientId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", patientId],
      })
    },
  })
}

/* ------------------ CREATE TASK ------------------ */
export const useCreateTask = (patientId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<Task>) =>
      createTask(patientId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", patientId],
      })
    },
  })
}

/* ------------------ UPDATE TASK ------------------ */
export const useUpdateTask = (patientId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string
      updates: Partial<Task>
    }) => updateTask(id, updates),

    /* Optimistic update */
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", patientId],
      })

      const previous = queryClient.getQueryData<Task[]>([
        "tasks",
        patientId,
      ])

      queryClient.setQueryData<Task[]>(["tasks", patientId], old =>
        old?.map(t =>
          t.id === id ? { ...t, ...updates } : t
        )
      )

      return { previous }
    },

    /* Rollback if error */
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          ["tasks", patientId],
          context.previous
        )
      }
    },

    /* Refetch after mutation */
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", patientId],
      })
    },
  })
}