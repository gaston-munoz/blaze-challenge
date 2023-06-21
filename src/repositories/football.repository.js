import config from 'config'
import fetch from 'node-fetch'

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
      method: this.config.method,
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

  getAllMatches() {
    return this.request(this.config.matchesPath)
  }

  getMatchById(id) {
    return this.request(this.config.matchesPath + `/${id}`)
  }

  getAllMatchesByTournament(code) {
    return this.request(this.config.tournamentsPath + `/${code}/` + this.config.matchesPath)
  }
}