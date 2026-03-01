import { useFilterStore } from "../state/filterStore"

export function Filters() {
  const { role, setRole } = useFilterStore()

  return (
    <div className="flex gap-4 mb-6">
      <select
        value={role}
        onChange={e => setRole(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="all">All Roles</option>
        <option value="nurse">Nurse</option>
        <option value="dietician">Dietician</option>
        <option value="social_worker">
          Social Worker
        </option>
      </select>
    </div>
  )
}