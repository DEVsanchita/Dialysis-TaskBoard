import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getPatients, createPatient } from "../api/api"
import type { Patient } from "../types"
import { deletePatient } from "../api/api"
/* ------------------ GET PATIENTS ------------------ */
export const usePatients = () => {
  return useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  })
}

/* ------------------ CREATE PATIENT ------------------ */
export const useCreatePatient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<Patient>) =>
      createPatient(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      })
    },
  })
}
export const useDeletePatient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deletePatient(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      })
    },
  })
}