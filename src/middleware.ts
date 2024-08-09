import { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import config from '@adonisjs/core/services/config'
import { Slack } from './slack.js'

export default class SlackMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const slack = config.get<any>('logger.loggers.slack')
    ctx.slack = new Slack(slack.url, {
      username: slack.name,
      icon_emoji: slack.icon,
    })
    ctx.containerResolver.bindValue(Slack, ctx.slack)

    return await next()
  }
}

declare module '@adonisjs/core/http' {
  interface HttpContext {
    slack: Slack
  }
}
