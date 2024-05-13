import { subscription } from './subscription/subscription.js'

import { avatureApi } from './avature-api/avature-api.js'

import { search } from './search/search.js'

import { jobs } from './jobs/jobs.js'

export const services = (app) => {
  app.configure(subscription)

  app.configure(avatureApi)

  app.configure(search)

  app.configure(jobs)

  // All services will be registered here
}
