import { setupWorker } from "msw/browser"
import { handlers } from "./handelers"

export const worker = setupWorker(...handlers)