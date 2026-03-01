import { render, screen } from "@testing-library/react"
import { describe, test, expect } from "vitest"
import { TaskCard } from "../components/TaskCard"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

describe("TaskCard", () => {
  test("renders task title", () => {
    const client = new QueryClient()

    render(
      <QueryClientProvider client={client}>
        <TaskCard
          task={{
            id: "1",
            title: "Test Task",
            role: "nurse",
            status: "pending",
            patientId: "1",
            dueDate: "",
            createdAt: "",
          }}
          patientId="1"
        />
      </QueryClientProvider>
    )

    expect(screen.getByText("Test Task")).toBeTruthy()
  })
})