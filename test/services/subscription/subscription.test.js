// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app.js'

describe('subscription service', () => {
  it('registered the service', () => {
    const service = app.service('subscription')

    assert.ok(service, 'Registered the service')
  })

  it('create a new subscriber', async () => {
    const service = app.service('subscription')
    const result = await service.create({
      name: 'test',
      email: 'test@email.com',
      seniority: 'SENIOR',
      area: 'software development'
    })
  })

  
})
