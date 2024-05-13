import { AvatureApiService, getOptions } from './avature-api.class.js'

export const avatureApiPath = 'avature-api'
export const avatureApiMethods = ['find']

export * from './avature-api.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const avatureApi = (app) => {
  // Register our service on the Feathers application
  app.use(avatureApiPath, new AvatureApiService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: avatureApiMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
}
