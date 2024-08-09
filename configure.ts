/*
|--------------------------------------------------------------------------
| Configure hook
|--------------------------------------------------------------------------
|
| The configure hook is called when someone runs "node ace configure <package>"
| command. You are free to perform any operations inside this function to
| configure the package.
|
| To make things easier, you have access to the underlying "ConfigureCommand"
| instance and you can use codemods to modify the source files.
|
*/

import ConfigureCommand from '@adonisjs/core/commands/configure'

export async function configure(command: ConfigureCommand) {
  const codemods = await command.createCodemods()

  /**
   * Define environment variables
   */
  await codemods.defineEnvVariables({ LOG_SLACK_WEBHOOK_URL: '<your_slack_url>' })

  /**
   * Define environment variables validations
   */
  await codemods.defineEnvValidations({
    variables: {
      LOG_SLACK_WEBHOOK_URL: 'Env.schema.string()',
    },
    leadingComment: 'Variables for configuring adonis-slack package',
  })

  /**
   * Register middleware
   */
  await codemods.registerMiddleware('router', [
    {
      path: 'adonis-logger-slack/middleware',
      position: 'before',
    },
  ])
}
