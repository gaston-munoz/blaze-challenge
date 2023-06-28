
export class MockFootballRepository {
  constructor(matches,tournaments) {
    this.tournaments = tournaments
    this.matches = matches
  }

  getAllTournaments() {
    return {
      competitions: this.tournaments,
      count: this.tournaments.length
    } 
  } 

  getByCode(code) {
    return this.tournaments.find(el => el.code === code)
  }

  getAllMatches() {
    return {
      matches: this.matches,
      count: this.matches.length
    } 
  }

  getMatchById(id) {
    return this.matches.find(el => el.id === id)
  }

  getTournamentById(id) {
    return this.tournaments.find(el => el.id === id)
  }

  async getAllPopularTables() {
    return this.tournaments.slice(0, 2)
  }
}