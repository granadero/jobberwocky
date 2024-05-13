// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  jobsDataValidator,
  jobsPatchValidator,
  jobsQueryValidator,
  jobsResolver,
  jobsExternalResolver,
  jobsDataResolver,
  jobsPatchResolver,
  jobsQueryResolver
} from './jobs.schema.js'
import { JobsService, getOptions } from './jobs.class.js'
import { SubscriptionService } from '../subscription/subscription.class.js'

export const jobsPath = 'jobs'
export const jobsMethods = ['find', 'get', 'create', 'patch', 'remove']


export * from './jobs.class.js'
export * from './jobs.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const jobs = (app) => {
  // Register our service on the Feathers application
  app.use(jobsPath, new JobsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: jobsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  const sendAlertToSubscribers = (context) => {
    const subscriptionService = app.services.subscription
    subscriptionService.sendJobCreatedEmail(context.result)
  }

  

  // Initialize hooks
  app.service(jobsPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(jobsExternalResolver), schemaHooks.resolveResult(jobsResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(jobsQueryValidator), schemaHooks.resolveQuery(jobsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(jobsDataValidator), schemaHooks.resolveData(jobsDataResolver)],
      patch: [schemaHooks.validateData(jobsPatchValidator), schemaHooks.resolveData(jobsPatchResolver)],
      remove: []
    },
    after: {
      all: [],
      create: [sendAlertToSubscribers]
    },
    error: {
      all: []
    }
  })
}
