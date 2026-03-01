import type{ Patient, Task } from "../types"

let patients: Patient[] = [
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
    dueDate: "",
    createdAt: new Date().toISOString(),
  },
]

export const getPatients = async (): Promise<Patient[]> =>
  patients

export const createPatient = async (
  data: Partial<Patient>
): Promise<Patient> => {
  const newPatient: Patient = {
    id: Math.random().toString(),
    name: data.name || "",
    age: data.age || 0,
  }

  patients.push(newPatient)
  return newPatient
}

export const getTasks = async (
  patientId: string
): Promise<Task[]> =>
  tasks.filter(t => t.patientId === patientId)

export const createTask = async (
  patientId: string,
  task: Partial<Task>
): Promise<Task> => {
  const newTask: Task = {
    id: Math.random().toString(),
    patientId,
    title: task.title || "",
    role: task.role || "nurse",
    status: "pending",
    dueDate: "",
    createdAt: new Date().toISOString(),
  }

  tasks.push(newTask)
  return newTask
}

export const updateTask = async (
  taskId: string,
  updates: Partial<Task>
): Promise<Task> => {
  tasks = tasks.map(t =>
    t.id === taskId ? { ...t, ...updates } : t
  )

  return tasks.find(t => t.id === taskId)!
}

export const deleteTask = async (
  taskId: string
): Promise<void> => {
  tasks = tasks.filter(t => t.id !== taskId)
}

export const deletePatient = async (
  patientId: string
): Promise<void> => {
  // remove patient
  patients = patients.filter(p => p.id !== patientId)

  // remove all tasks of that patient
  tasks = tasks.filter(t => t.patientId !== patientId)
}