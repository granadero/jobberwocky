// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app.js'

describe('jobs service', () => {
  it('registered the service', () => {
    const service = app.service('jobs')

    assert.ok(service, 'Registered the service')
  })

  it('save a job and return it', async () => {
    const service = app.service('jobs')
    const result = await service.create({
      name: 'jobberwocky',
      description: 'test job',
      country: 'usa',
      status: 'ACTIVE',
      type: 'FULL TIME',
      seniority: 'MID',
      area: 'software development',
      industry: 'software',
      skills: 'java, OOP, testing',
      currency: 'usd',
      minAnualSalary: 10000,
      maxAnualSalary: 20000,
      benefit: 'health insurance',
      date: '2022-01-01'
    })
    assert.ok(result.name === 'jobberwocky')
  })

  it('patch a job and return it', async () => {
    const service = app.service('jobs')
    const previousPatch = await service.get(1)
    const result = await service.patch(1, {
      name: 'jobberwocky',
      description: 'test job updated ' + Date.now()
    })
    assert.ok(result.name === previousPatch.name && result.description !== previousPatch.description)
  })

  it('returns a list of jobs', async () => {
    const service = app.service('jobs')
    const result = await service.find()
    assert.ok(Array.isArray(result.data))
  })

  it('returns a single job', async () => {
    const service = app.service('jobs')
    const result = await service.get(1)
    assert.ok(result.name === 'jobberwocky')
  })

  it('search a job', async () => {
    const service = app.service('jobs')
    const result = await service.find({
      query: {
        status: 'ON HOLD'
      }
    })
    assert.ok(Array.isArray(result.data))
  })
})
