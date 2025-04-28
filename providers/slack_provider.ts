import type { ApplicationService } from '@adonisjs/core/types'
import { Slack } from '../src/slack.js'

export default class SlackProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    this.app.container.singleton('slack', async () => {
      const slack = this.app.config.get<any>('logger.loggers.slack')

      return new Slack(slack.url)
    })
  }

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shut down the app
   */
  async shutdown() {}
}

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    slack: Slack
  }
}
