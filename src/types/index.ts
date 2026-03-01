export type Role = "nurse" | "dietician" | "social_worker"

export type TaskStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "overdue"

export interface Patient {
  id: string
  name: string
  age: number
}

export interface Task {
  id: string
  patientId: string
  title: string
  description?: string
  role: Role
  status: TaskStatus
  dueDate: string
  createdAt: string
}