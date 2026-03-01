import { useState } from "react"
import { usePatients } from "../hooks/usePatients"
import { PatientRow } from "./PatientRow"
import { AddPatientModal } from "./AddPatientModel"
import { Filters } from "./Filters"

export function TaskBoard() {
  const { data, isLoading, error } = usePatients()
  const [open, setOpen] = useState(false)

  if (isLoading) return <p>Loading patients...</p>
  if (error) return <p>Error loading patients</p>

  return (
    <div className="space-y-6">

      {/* ✅ FILTERS ADDED HERE */}
      <Filters />

      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => setOpen(true)}
      >
        + Add Patient
      </button>

      {data?.map(p => (
        <PatientRow key={p.id} patient={p} />
      ))}

      {open && (
        <AddPatientModal onClose={() => setOpen(false)} />
      )}
    </div>
  )
}