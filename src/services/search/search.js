import { SearchService, getOptions } from './search.class.js'

export const searchPath = 'search'
export const searchMethods = ['find']

export * from './search.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const search = (app) => {
  // Register our service on the Feathers application
  app.use(searchPath, new SearchService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: searchMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
}
