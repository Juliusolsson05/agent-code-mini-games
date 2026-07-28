import { defineExtension } from 'agent-code-extension-api'
import type { ExtensionContext } from 'agent-code-extension-api'

import { router } from './router'
import { mountMiniGames } from './view/mount'

/**
 * Mini Games — entry point (iframe model). Registers the modal hub view and the
 * per-game commands. `games.open` opens the launcher (a host-routed view open);
 * `games.blackjack` runs INSIDE the frame (unified command model) and flips the
 * router straight to Blackjack — if no frame is open, the host opens the view first
 * and flushes this command once it is ready. Tier-0 only (storage for bankroll/stats).
 */
export const { activate, deactivate } = defineExtension({
  async activate(context: ExtensionContext): Promise<void> {
    context.subscriptions.push(
      context.registerView('mini-games.main', mountMiniGames(context.api)),
      context.registerCommand('mini-games.blackjack', () => router.show('blackjack')),
      context.registerCommand('mini-games.snake', () => router.show('snake')),
    )
  },

  deactivate(): void {
    // Next open starts at the launcher.
    router.show('launcher')
  },
})
