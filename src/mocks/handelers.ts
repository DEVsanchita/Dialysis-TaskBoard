import { http, HttpResponse } from "msw"
import type { Task } from "../types"

let patients = [
  { id: "1", name: "Ramesh Kumar", age: 52 },
  { id: "2", name: "Sita Devi", age: 45 },
]

let tasks: Task[] = [
  {
    id: "t1",
    patientId: "1",
    title: "Monthly Labs",
    role: "nurse",
    status: "pending",
    dueDate: "2026-03-10",
    createdAt: new Date().toISOString(),
  },
]

export const handlers = [
  http.get("/patients", () => {
    return HttpResponse.json(patients)
  }),

  http.get("/patients/:id/tasks", ({ params }) => {
    const data = tasks.filter(
      t => t.patientId === params.id
    )
    return HttpResponse.json(data)
  }),

  http.patch("/tasks/:id", async ({ params, request }) => {
    const body = (await request.json()) as Partial<Task>

    tasks = tasks.map(t =>
      t.id === params.id ? { ...t, ...body } : t
    )

    return HttpResponse.json(
      tasks.find(t => t.id === params.id)
    )
  }),
]