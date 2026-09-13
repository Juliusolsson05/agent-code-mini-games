import type { AgentCodeApiV1 } from 'agent-code-extension-api'

// The games only persist local scores and preferences. Naming that narrow
// dependency keeps the UI compatible with both the frozen v1 view API and the
// v2 view context, whose extension identity deliberately has a different major.
// Expanding this alias is therefore a real host-power decision, not a side effect
// of migrating how the modal is mounted.
export type MiniGamesApi = Pick<AgentCodeApiV1, 'storage'>
