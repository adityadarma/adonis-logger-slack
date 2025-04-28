import { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { slack } from '../services/main.js'
import { Slack } from './slack.js'

export default class SlackMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    ctx.slack = slack
    ctx.containerResolver.bindValue(Slack, ctx.slack)

    return await next()
  }
}

declare module '@adonisjs/core/http' {
  interface HttpContext {
    slack: Slack
  }
}
