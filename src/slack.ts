import config from '@adonisjs/core/services/config'
import * as slack from '@slack/webhook'

export class Slack extends slack.IncomingWebhook {
  sendException(error: any) {
    const slack = config.get<any>('logger.loggers.slack')

    this.send({
      attachments: [
        {
          color: this.setColor(slack.level),
          blocks: [this.setHeader(error.message), this.setContent(error.stack)],
        },
      ],
    })
  }

  private setColor(level: string) {
    switch (level) {
      case 'info':
        return 'good'
      case 'success':
        return 'good'
      case 'warning':
        return 'warning'
      case 'error':
        return 'danger'
    }
  }

  private setHeader(text: string) {
    return {
      type: 'header',
      text: {
        type: 'plain_text',
        text: text,
      },
    }
  }

  private setContent(text: string) {
    return {
      type: 'context',
      elements: [
        {
          type: 'plain_text',
          text: text,
        },
      ],
    }
  }
}
