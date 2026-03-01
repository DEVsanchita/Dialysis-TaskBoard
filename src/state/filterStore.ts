import { create } from "zustand"

type FilterState = {
  role: string
  time: string
  setRole: (role: string) => void
  setTime: (time: string) => void
}

export const useFilterStore = create<FilterState>(set => ({
  role: "all",
  time: "all",

  setRole: role => set({ role }),
  setTime: time => set({ time }),
}))