import axios from 'axios'

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class AvatureApiService {
  axiosInstance
  constructor(options) {
    this.options = options
    this.axiosInstance = axios.create({ baseURL: options.app.get('avatureExternalAPI').baseUrl })
  }

  async find(_params) {
    return this.axiosInstance.get('/jobs', { params: _params.query })
  }
}

export const getOptions = (app) => {
  return { app }
}
