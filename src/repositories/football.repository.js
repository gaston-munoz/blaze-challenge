import config from 'config'

export class FootballRepository {
  constructor(conf = null) {
    this.config = conf || config.get('footballAPI')
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'X-Auth-Token': this.config.apiKey
    }
  }

  async request(path) {
    const { endpoint } = this.config
    const response = await fetch(`${endpoint}${path}`, {
      method: 'GET',
      headers: this.getHeaders()
    })
    const data = await response.json()

    console.log(data)

    return data
  }

  getAllTournaments() {
    return this.request(this.config.tournamentsPath)
  }

  getByCode(code) {
    return this.request(this.config.tournamentsPath + `/${code}`)
  }

}