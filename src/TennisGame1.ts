import { TennisGame } from './TennisGame'

export class TennisGame1 implements TennisGame {
    private firstPlayer: Player
    private secondPlayer: Player

    constructor(firstPlayerName: string, secondPlayerName: string) {
        this.firstPlayer = new Player(firstPlayerName)
        this.secondPlayer = new Player(secondPlayerName)
    }

    getScore(): string {
        if (this.isDraw()) {
            return this.drawResult()
        }
        if (this.isAdvantage()) {
            return this.advantageResult()
        }
        if (this.isWin()) {
            return this.winResult()
        }

        return this.ongoingResult()
    }

    wonPoint(playerName: string): void {
        this.getPlayerBy(playerName).incrementScore()
    }

    getPlayerBy(playerName) {
        return this.firstPlayer.name === playerName
            ? this.firstPlayer
            : this.secondPlayer
    }

    isDraw() {
        return this.firstPlayer.score === this.secondPlayer.score
    }

    drawResult() {
        switch (this.firstPlayer.score) {
            case 0:
                return 'Love-All'
            case 1:
                return 'Fifteen-All'
            case 2:
                return 'Thirty-All'
            default:
                return 'Deuce'
        }
    }

    isAdvantage() {
        return (
            this.hasPlayerReachedFourPoints() &&
            (this.getScoreDifference() === 1 ||
                this.getScoreDifference() === -1)
        )
    }

    isWin() {
        return (
            this.hasPlayerReachedFourPoints() &&
            (this.getScoreDifference() >= 2 || this.getScoreDifference() <= -2)
        )
    }

    hasPlayerReachedFourPoints() {
        return this.firstPlayer.score >= 4 || this.secondPlayer.score >= 4
    }

    getScoreDifference() {
        return this.firstPlayer.score - this.secondPlayer.score
    }

    advantageResult() {
        return 'Advantage ' + this.playerWithHighestScore()
    }
    winResult() {
        return 'Win for ' + this.playerWithHighestScore()
    }

    playerWithHighestScore() {
        return this.firstPlayer.score > this.secondPlayer.score
            ? this.firstPlayer.name
            : this.secondPlayer.name
    }

    ongoingResult() {
        return (
            this.ongoingResultTerms(this.firstPlayer.score) +
            '-' +
            this.ongoingResultTerms(this.secondPlayer.score)
        )
    }

    ongoingResultTerms(score) {
        switch (score) {
            case 0:
                return 'Love'
            case 1:
                return 'Fifteen'
            case 2:
                return 'Thirty'
            case 3:
                return 'Forty'
        }
    }
}

class Player {
    private _score: number = 0
    private _name: string

    constructor(name) {
        this._name = name
    }

    get name() {
        return this._name
    }

    get score() {
        return this._score
    }

    incrementScore() {
        this._score++
    }
}
