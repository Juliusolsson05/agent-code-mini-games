import { defineRuntime } from 'agent-code-extension-api'

// Mini Games has no background engine: simulation and audio belong to the visible
// modal document and must stop when it closes. API v2 still gives every view one
// managed runtime identity; keeping this activation empty makes that ownership
// explicit without moving frame-bound animation work into a hidden window.
export default defineRuntime({
  activate() {},
})
