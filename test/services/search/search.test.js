// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app.js'

describe('search service', () => {
  it('registered the service', () => {
    const service = app.service('search')

    assert.ok(service, 'Registered the service')
  })

  it('return a list of jobs', async () => {
    const service = app.service('search')
    const result = await service.find()
    assert.ok(Array.isArray(result))
  })

})
