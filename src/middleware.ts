import { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { slack } from '../services/main.js'
import { Slack } from './slack.js'
import app from '@adonisjs/core/services/app'

export default class SlackMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const configApp = app.config.get<any>('logger.loggers.default')
    if (configApp === 'slack') {
      ctx.slack = slack
      ctx.containerResolver.bindValue(Slack, ctx.slack)
    }

    return await next()
  }
}

declare module '@adonisjs/core/http' {
  interface HttpContext {
    slack: Slack
  }
}
