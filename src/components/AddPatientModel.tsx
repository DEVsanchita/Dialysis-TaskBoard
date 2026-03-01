import { useState } from "react"
import { useCreatePatient } from "../hooks/usePatients"

export function AddPatientModal({ onClose }: { onClose: () => void }) {
  const mutation = useCreatePatient()

  const [name, setName] = useState("")
  const [age, setAge] = useState("")

  const handleSubmit = () => {
    if (!name || !age) return

    mutation.mutate({
      name,
      age: Number(age),
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
        <h2 className="text-lg font-bold mb-4">Add Patient</h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Patient name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-4 rounded"
          placeholder="Age"
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            className="flex-1 bg-gray-300 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="flex-1 bg-blue-600 text-white py-2 rounded"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}