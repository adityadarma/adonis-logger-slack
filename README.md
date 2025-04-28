# Adonis Slack for Logger

[![gh-workflow-image]][gh-workflow-url] [![npm-image]][npm-url] [![npm-downloads]][npm-downloads] ![][typescript-image] [![license-image]][license-url]

Adonis Slack Logger is a feature that allows developers to store application logger to slack. This feature provides a structured and organized approach to managing application logs, making it easier to query and analyze them.

## Installation

```sh
node ace add @adityadarma/adonis-logger-slack
```

## Usage

### Capturing Errors

You can capture errors by calling the `sendException` method on the instance of slack inside your exception handler.

```ts
export default class HttpExceptionHandler extends ExceptionHandler {
  // ...

  async report(error: unknown, ctx: HttpContext) {
    if (this.shouldReport(error as any)) {
      ctx?.slack?.sendException(error)
    }

    return super.report(error, ctx)
  }
}
```

### Adding Integrations

Logger provides multiple integrations to enhance the data captured by driver. You can add integrations by changing the `config` inside the configuration `config/logger.ts`.

```ts
// config/logger.ts

slack: {
  enabled: true,
  name: env.get('APP_NAME', 'AdonisJS'),
  level: env.get('LOG_LEVEL', 'error'),
  url: env.get('LOG_SLACK_WEBHOOK_URL'),
  redact: {
    paths: ['password', '*.password']
  },
  transport: {
    targets: targets()
      .pushIf(!app.inProduction, targets.pretty())
      .pushIf(app.inProduction, targets.file({ destination: 1 }))
      // Optional to send log anyware
      .push({
        target: '@youngkiu/pino-slack-webhook',
        level: 'error',
        options: {
          webhookUrl: env.get('LOG_SLACK_WEBHOOK_URL'),
          channel: '#error_notifications',
          username: 'webhookbot',
          icon_emoji: ':ghost:'
        }
      })
      .toArray()
  }
},
```

\*Note: please install `@youngkiu/pino-slack-webhook` if you want send slack anyware

### Create log anyware

#### via service

```ts
import logger from '@adonisjs/core/services/logger'

router.get('/logger', async () => {
  logger.info('dfdgdg')
  ......
})
```

#### via HttpContext

```ts
router.get('/logger', async ({logger}: HttpContext) => {
  logger.info('dfdgdg')
  .....
})
```

## License

This package is open-sourced software licensed under the [MIT license](LICENSE.md).

[gh-workflow-image]: https://img.shields.io/github/actions/workflow/status/adityadarma/adonis-logger-slack/release.yml?style=for-the-badge
[gh-workflow-url]: https://github.com/adityadarma/adonis-logger-slack/actions/workflows/release.yml 'Github action'
[npm-image]: https://img.shields.io/npm/v/@adityadarma/adonis-logger-slack/latest.svg?style=for-the-badge&logo=npm
[npm-url]: https://www.npmjs.com/package/@adityadarma/adonis-logger-slack/v/latest 'npm'
[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[license-url]: LICENSE.md
[license-image]: https://img.shields.io/github/license/adityadarma/adonis-logger-slack?style=for-the-badge
[npm-downloads]: https://img.shields.io/npm/dm/@adityadarma/adonis-logger-slack.svg?style=for-the-badge
[count-downloads]: https://npmcharts.com/compare/@adityadarma/adonis-logger-slack?minimal=true
