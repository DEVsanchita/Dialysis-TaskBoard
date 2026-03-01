import { useState } from "react"
import { useCreateTask } from "../hooks/useTasks"
import type { Task } from "../types"

export function CreateTaskModal({
  patientId,
  onClose,
}: {
  patientId: string
  onClose: () => void
}) {
  const mutation = useCreateTask(patientId)

  const [title, setTitle] = useState("")
  const [role, setRole] = useState<Task["role"]>("nurse")

  const handleSubmit = () => {
    if (!title) return

    mutation.mutate({
      title,
      role,
      patientId,
      status: "pending",
      dueDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      {/* Green Modal Card */}
      <div className="bg-green-200 p-6 rounded-xl w-96 shadow-2xl border-2 border-green-600">
        
        <h2 className="text-xl font-bold mb-4 text-green-900">
          Create Task
        </h2>

        <input
          className="border p-2 w-full mb-3 rounded bg-white"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-4 rounded bg-white"
          value={role}
          onChange={e =>
            setRole(e.target.value as Task["role"])
          }
        >
          <option value="nurse">Nurse</option>
          <option value="dietician">Dietician</option>
          <option value="social_worker">Social Worker</option>
        </select>

        <div className="flex gap-2">
          <button
            className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="flex-1 bg-green-700 text-white py-2 rounded hover:bg-green-800"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}