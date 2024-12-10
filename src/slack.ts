import config from '@adonisjs/core/services/config'
import * as slack from '@slack/webhook'

export class Slack extends slack.IncomingWebhook {
  sendException(error: any) {
    const configSlack = config.get<any>('logger.loggers.slack')

    this.send({
      attachments: [
        {
          mrkdwn_in: ['text'],
          color: this.setColor(configSlack.level),
          pretext: error.message,
          author_icon: configSlack.icon,
          title: 'Message',
          text: error.stack,
        },
      ],
    })
  }

  private setColor(level: string) {
    switch (level) {
      case 'success':
        return 'good'
      case 'warning':
        return 'warning'
      case 'error':
        return 'danger'
      default:
        return 'gray'
    }
  }
}
