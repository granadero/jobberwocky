// This is a skeleton for a custom service class. Remove or add the methods you need here
export class SearchService {
  axiosInstance
  constructor(options) {
    this.options = options
  }

  formatResult(result) {
    let formattedResult = []
    for (let i = 0; i < result.length; i++) {
      const job = result[i]
      formattedResult.push({
        name: job[0],
        minAnualSalary: job[1] * 12,
        maxAnualSalary: job[1] * 12,
        country: job[2],
        skills: job[3]
      })
    }
    return formattedResult
  }

  async find(_params) {
    try {
      let promises = []
      const jobs = this.options.app.services.jobs
      const avatureApi = this.options.app.services['avature-api']
      promises.push(jobs.find(_params) || Promise.resolve([]))
      promises.push(avatureApi.find(_params) || Promise.resolve([]))
      const result = await Promise.all(promises)
      const formattedResult = this.formatResult(result[1].data || [])
      return [].concat(result[0]?.data || [], formattedResult)
    } catch (error) {
      console.error('Error in find method of SearchService:', error)
      throw error
    }
  }
}

export const getOptions = (app) => {
  return { app }
}
