/*
 * @adityadarma/adonis-logger-slack
 *
 * (c) Romain Lanz
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
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
    leadingComment: 'Variables for configuring adonis-logger-slack package',
  })

  /**
   * Register middleware
   */
  await codemods.registerMiddleware('router', [
    {
      path: '@adityadarma/adonis-logger-slack/middleware',
      position: 'before',
    },
  ])
}
