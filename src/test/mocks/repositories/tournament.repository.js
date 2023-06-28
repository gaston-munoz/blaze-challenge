// import { tournaments } from '../data/tournaments'

export class MockTournamentRepository {
  constructor(tournaments) {
    this.data = tournaments
  }

  searchComparator(search) {
    return el => {
      const keys = Object.keys(search)
      for (let key in keys) {
        if (el[key] !== search[key]) return false
      }

      return true
    }
  }
  
  findById(id) {
    return this.data.find(el => el.id === id)
  }
      
  findOne(search) {
    if (search) {
      return this.data.find(this.searchComparator(search))
    } 
    return null
  }
  
      
  findAndCount(search) {
    const tournaments = this.data.filter(this.searchComparator(search))
    return {
      count: tournaments.length,
      tournaments,
    }
  }
  
  deleteById(id) {
    return this.data.filter(el => el.id !== id)
  }
  
  create(entity) {
    return this.data.push(entity)
  }
} 