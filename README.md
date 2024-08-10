# Adonis Slack for Logger
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
      ctx.slack.sendException(error)
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
      name: env.get('APP_NAME'),
      level: env.get('LOG_LEVEL'),
      icon: 'boom', 
      url: env.get('LOG_SLACK_WEBHOOK_URL'),
      transport: {
        targets: targets()
          .pushIf(!app.inProduction, targets.pretty())
          .pushIf(app.inProduction, targets.file({ destination: 1 }))
          .toArray(),
      },
    },
```
