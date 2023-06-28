import chai from 'chai'
import { MatchService } from '../../services/match.service.js'
import { MockFootballRepository } from '../mocks/repositories/footballRepository.repository.js'
import { tournaments } from '../mocks/data/tournaments.js'
import { MockBaseRepository } from '../mocks/repositories/base.repository.js'
import { matches } from '../mocks/data/matches.js'

const expect = chai.expect

describe('Test MatchService', () => {
  const matchService = new MatchService(
    new MockBaseRepository(tournaments), 
    new MockBaseRepository(matches), 
    new MockFootballRepository(matches,tournaments)
  )
  it('Should be return all matches and count', async () => {
    const result = await matchService.findAll()
    expect(result.count).to.equal(6)
    expect(result.matches).to.be.an('array')
  })

  it('Should be return a specific match', async () => {
    const matchId = 432331
    const { match } = await matchService.findById(matchId)
    expect(match.id).to.equal(matchId)
    expect(match).to.be.an('object')
  })

  it('Should be return not found match', async () => {
    const matchId = 1
    const expectedError = 'Match not exists'
    const result = await matchService.findById(matchId)
    expect(result.id).to.equal(undefined)
    expect(result.match).to.be.an('undefined')
    expect(result.error).to.equal(expectedError)
  })

})

