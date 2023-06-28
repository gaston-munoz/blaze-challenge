import chai from 'chai'
import { MockFootballRepository } from '../mocks/repositories/footballRepository.repository.js'
import { tournaments } from '../mocks/data/tournaments.js'
import { MockBaseRepository } from '../mocks/repositories/base.repository.js'
import { matches } from '../mocks/data/matches.js'
import { TournamentService } from '../../services/tournament.service.js'

const expect = chai.expect

describe('Test TournamentService', () => {
  const tournamentService = new TournamentService(
    new MockBaseRepository(tournaments), 
    new MockFootballRepository(matches,tournaments)
  )
  it('Should be return all tournaments and count', async () => {
    const result = await tournamentService.findAll()
    expect(result.count).to.equal(13)
    expect(result.tournaments).to.be.an('array')
  })

  it('Should be return a specific tournament', async () => {
    const tournamentId = 2013
    const { tournament } = await tournamentService.findById(tournamentId)
    expect(tournament.id).to.equal(tournamentId)
    expect(tournament).to.be.an('object')
  })

  it('Should be return not found match', async () => {
    const tournamentId = 1
    const expectedError = 'Tournament not exists'
    const result = await tournamentService.findById(tournamentId)
    expect(result.id).to.equal(undefined)
    expect(result.tournament).to.be.an('undefined')
    expect(result.error).to.equal(expectedError)
  })

})

