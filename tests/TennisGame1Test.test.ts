import { expect } from 'chai'
import { TennisGame1 } from '../src/TennisGame1'

describe('TennisGame1', function () {
    it('should correctly increment the score with different player names', function () {
        const tennisGame1 = new TennisGame1('davide', 'giulia')
        tennisGame1.wonPoint('davide')
        expect(tennisGame1.getScore()).to.equal('Fifteen-Love')
    })
})
