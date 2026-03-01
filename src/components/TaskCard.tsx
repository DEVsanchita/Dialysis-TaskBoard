import type { Task } from "../types"
import { useUpdateTask, useDeleteTask } from "../hooks/useTasks"

export function TaskCard({ task, patientId }: { task: Task; patientId: string }) {
  const updateMutation = useUpdateTask(patientId)
  const deleteMutation = useDeleteTask(patientId)

  return (
    <div className="bg-gray-50 border rounded-xl p-4 shadow-sm">
      <h4 className="font-semibold text-lg">{task.title}</h4>

      <p className="text-sm text-gray-600">Role: {task.role}</p>

      <p className="text-xs mt-1">Status: {task.status}</p>

      <div className="flex gap-2 mt-3">
        <button
          className="flex-1 bg-blue-600 text-white py-1 rounded"
          onClick={() =>
            updateMutation.mutate({
              id: task.id,
              updates: {
                status: task.status === "completed" ? "pending" : "completed",
              },
            })
          }
        >
          {task.status === "completed" ? "Undo" : "Complete"}
        </button>

        <button
          className="flex-1 bg-red-500 text-white py-1 rounded"
          onClick={() => deleteMutation.mutate(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}