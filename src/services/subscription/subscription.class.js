import { KnexService } from '@feathersjs/knex'

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class SubscriptionService extends KnexService {
  constructor(options, app) {
    super(options, app)
  }
  sendJobCreatedEmail(jobCreated) {
    const params = {
      seniority: jobCreated.seniority,
      area: jobCreated.area
    }

    this.find(params)
      .then((result) => {
        if (!result || !result.data) {
          throw new Error('No subscribers found')
        }

        for (let i = 0; i < result.data.length; i++) {
          const subscriber = result.data[i]
          if (!subscriber.email) {
            throw new Error(`Subscriber ${subscriber.name} does not have an email address`)
          }
          console.log(`Sending email to: ${subscriber.email}`)
        }
      })
      .catch((error) => {
        console.error('Error sending job created emails:', error)
      })
  }
}

export const getOptions = (app) => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'subscription'
  }
}
