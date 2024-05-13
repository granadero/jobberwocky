// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  subscriptionDataValidator,
  subscriptionPatchValidator,
  subscriptionQueryValidator,
  subscriptionResolver,
  subscriptionExternalResolver,
  subscriptionDataResolver,
  subscriptionPatchResolver,
  subscriptionQueryResolver
} from './subscription.schema.js'
import { SubscriptionService, getOptions } from './subscription.class.js'

export const subscriptionPath = 'subscription'
export const subscriptionMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './subscription.class.js'
export * from './subscription.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const subscription = (app) => {
  // Register our service on the Feathers application
  app.use(subscriptionPath, new SubscriptionService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: subscriptionMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(subscriptionPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(subscriptionExternalResolver),
        schemaHooks.resolveResult(subscriptionResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(subscriptionQueryValidator),
        schemaHooks.resolveQuery(subscriptionQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(subscriptionDataValidator),
        schemaHooks.resolveData(subscriptionDataResolver)
      ],
      patch: [
        schemaHooks.validateData(subscriptionPatchValidator),
        schemaHooks.resolveData(subscriptionPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
