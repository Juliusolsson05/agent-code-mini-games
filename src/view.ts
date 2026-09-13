import { defineView } from 'agent-code-extension-api'

import { mountMiniGames } from './view/mount'

export default defineView({
  mount: mountMiniGames,
})
