import { Exception } from '@adonisjs/core/exceptions'
import config from '@adonisjs/core/services/config'
import * as slack from '@slack/webhook'

export class Slack extends slack.IncomingWebhook {
  sendException(error: Exception) {
    const configSlack = config.get<any>('logger.loggers.slack')

    this.send({
      attachments: [
        {
          color: this.color(configSlack.level),
          blocks: [
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: `${error.message}`,
              },
            },
            {
              type: 'context',
              elements: [
                {
                  type: 'plain_text',
                  text: `${error.stack}`,
                },
              ],
            },
          ],
        },
      ],
    })
  }

  color(level: string) {
    switch (level) {
      case 'success':
        return 'good'
      case 'warning':
        return 'warning'
      case 'error':
        return 'danger'
    }
  }
}
