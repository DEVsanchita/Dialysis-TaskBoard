import { TaskBoard } from "./components/TaskBoard"

export default function App() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          🏥 Dialysis Care Taskboard
        </h1>

        <TaskBoard />
      </div>
    </div>
  )
}