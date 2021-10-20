import { TennisGame } from './TennisGame'

export class TennisGame1 implements TennisGame {
    private firstPlayer: Player
    private secondPlayer: Player
    private pointsDescriptions = new Map<number, string>([
        [0, 'Love'],
        [1, 'Fifteen'],
        [2, 'Thirty'],
        [3, 'Forty'],
    ])

    constructor(firstPlayerName: string, secondPlayerName: string) {
        this.firstPlayer = new Player(firstPlayerName)
        this.secondPlayer = new Player(secondPlayerName)
    }

    public getScore(): string {
        if (this.isDraw()) {
            return this.drawResult()
        }
        if (this.isAPlayerInAdvantage()) {
            return this.advantageResult()
        }
        if (this.isWin()) {
            return this.winResult()
        }

        return this.ongoingResult()
    }

    private isDraw() {
        return this.firstPlayer.isDrawWith(this.secondPlayer)
    }

    private isAPlayerInAdvantage() {
        return (
            this.firstPlayer.isInAdvantageOver(this.secondPlayer) ||
            this.secondPlayer.isInAdvantageOver(this.firstPlayer)
        )
    }

    public wonPoint(playerName: string): void {
        this.getPlayerBy(playerName).incrementScore()
    }

    private getPlayerBy(playerName) {
        return this.firstPlayer.isCalled(playerName)
            ? this.firstPlayer
            : this.secondPlayer
    }

    private drawResult() {
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

    private isWin() {
        return (
            this.firstPlayer.hasWonOver(this.secondPlayer) ||
            this.secondPlayer.hasWonOver(this.firstPlayer)
        )
    }

    private advantageResult() {
        return 'Advantage ' + this.playerWithHighestScore()
    }
    private winResult() {
        return 'Win for ' + this.playerWithHighestScore()
    }

    private playerWithHighestScore() {
        return this.firstPlayer.hasHigherScoreThan(this.secondPlayer)
            ? this.firstPlayer.name
            : this.secondPlayer.name
    }

    private ongoingResult() {
        return (
            this.getPointsDescription(this.firstPlayer.score) +
            '-' +
            this.getPointsDescription(this.secondPlayer.score)
        )
    }

    private getPointsDescription(score) {
        return this.pointsDescriptions.get(score)
    }
}

class Player {
    private _score: number = 0
    private _name: string

    constructor(name) {
        this._name = name
    }

    public hasHigherScoreThan(opponentPlayer: Player) {
        return this._score > opponentPlayer.score
    }

    public hasWonOver(opponentPlayer: Player) {
        return (
            this.hasReachedFourPoints() &&
            this.hasAtLeastTwoPointsAdvantage(opponentPlayer)
        )
    }

    private hasAtLeastTwoPointsAdvantage(opponentPlayer: Player) {
        return this._score - opponentPlayer.score >= 2
    }

    public isInAdvantageOver(opponentPlayer: Player) {
        return (
            this.hasReachedFourPoints() &&
            this.hasOnePointAdvantageOver(opponentPlayer)
        )
    }

    private hasOnePointAdvantageOver(opponentPlayer: Player) {
        return this._score - opponentPlayer.score === 1
    }

    public isDrawWith(opponentPlayer: Player) {
        return this._score === opponentPlayer.score
    }

    public isCalled(playerName) {
        return this._name === playerName
    }

    public hasReachedFourPoints() {
        return this._score >= 4
    }

    public incrementScore() {
        this._score++
    }

    get name() {
        return this._name
    }

    get score() {
        return this._score
    }
}
