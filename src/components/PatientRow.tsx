import { useState } from "react"
import type{ Patient } from "../types"
import { useTasks } from "../hooks/useTasks"
import { useDeletePatient } from "../hooks/usePatients"
import { useFilterStore } from "../state/filterStore"
import { TaskCard } from "./TaskCard"
import { CreateTaskModal } from "./CreateTaskModel"

export function PatientRow({ patient }: { patient: Patient }) {
  const { data: tasks, isLoading, error } =
    useTasks(patient.id)

  const deleteMutation = useDeletePatient()
  const { role } = useFilterStore()   // ✅ only role now

  const [open, setOpen] = useState(false)

  const handleDeletePatient = () => {
    if (confirm("Delete this patient?")) {
      deleteMutation.mutate(patient.id)
    }
  }

  // Loading
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-4 shadow">
        <p className="text-gray-500">Loading tasks...</p>
      </div>
    )
  }

  // Error
  if (error) {
    return (
      <div className="bg-white rounded-xl p-4 shadow">
        <p className="text-red-500">
          Error loading tasks
        </p>
      </div>
    )
  }

  // ✅ ROLE FILTER ONLY
  const filteredTasks = tasks?.filter(task => {
    return role === "all" || task.role === role
  })

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {patient.name} (Age {patient.age})
        </h3>

        <div className="flex gap-2">
          <button
            className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
            onClick={() => setOpen(true)}
          >
            + Add Task
          </button>

          <button
            className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
            onClick={handleDeletePatient}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Tasks */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredTasks && filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              patientId={patient.id}
            />
          ))
        ) : (
          <p className="text-gray-500">
            No tasks match filters
          </p>
        )}
      </div>

      {/* Modal */}
      {open && (
        <CreateTaskModal
          patientId={patient.id}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}