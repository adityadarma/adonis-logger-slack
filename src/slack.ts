import config from '@adonisjs/core/services/config'
import * as slack from '@slack/webhook'

export class Slack extends slack.IncomingWebhook {
  sendException(error: any) {
    const configSlack = config.get<any>('logger.loggers.slack')

    this.send({
      username: configSlack.name,
      icon_emoji: 'boom',
      attachments: [
        {
          mrkdwn_in: ['text'],
          color: 'danger',
          pretext: error.message,
          author_icon: 'boom',
          title: 'Message',
          text: error.stack,
        },
      ],
    })
  }
}
