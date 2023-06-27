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

  getQueryParams(season) {
    const cleanSeason = Number(season) || new Date().getFullYear()
    return `?season=${Number(cleanSeason)}`
  }

  getPopularTournamentsCodes() {
    return [
      'SA',
      'PD',
    ]
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

  getAllMatchesByTournament(code, season) {
    return this.request(this.config.tournamentsPath + `/${code}/` + this.config.matchesPath + this.getQueryParams(season))
  }


  async getAllPopularTables() {
    const pr = this.getPopularTournamentsCodes().map(code => this.request(this.config.tournamentsPath + `/${code}/standings`))
    const result = await Promise.all(pr)
    const dataResult = result.map(({ competition, standings }) => ({ competition, standings }))
    return dataResult
  }


}