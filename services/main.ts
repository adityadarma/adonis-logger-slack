import app from '@adonisjs/core/services/app'
import { Slack } from '../src/slack.js'

let slack: Slack

/**
 * Returns slack container
 */
await app.booted(async () => {
  slack = await app.container.make('slack')
})
export { slack }
