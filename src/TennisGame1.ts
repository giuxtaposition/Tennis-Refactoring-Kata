import { TennisGame } from './TennisGame'

export class TennisGame1 implements TennisGame {
    private firstPlayer: Player
    private secondPlayer: Player
    private scoreBoard: ScoreBoard

    constructor(firstPlayerName: string, secondPlayerName: string) {
        this.firstPlayer = new Player(firstPlayerName)
        this.secondPlayer = new Player(secondPlayerName)
        this.scoreBoard = new ScoreBoard(this.firstPlayer, this.secondPlayer)
    }

    public getScore(): string {
        return this.scoreBoard.getScore()
    }

    public wonPoint(playerName: string): void {
        this.getPlayerBy(playerName).incrementScore()
    }

    private getPlayerBy(playerName) {
        return this.firstPlayer.isCalled(playerName)
            ? this.firstPlayer
            : this.secondPlayer
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

class ScoreBoard {
    private firstPlayer: Player
    private secondPlayer: Player
    private scoreRules: ScoreRule[]

    constructor(firstPlayer: Player, secondPlayer: Player) {
        this.firstPlayer = firstPlayer
        this.secondPlayer = secondPlayer
        this.scoreRules = [
            new DrawScoreRule(this.firstPlayer, this.secondPlayer),
            new AdvantageScoreRule(this.firstPlayer, this.secondPlayer),
            new WinScoreRule(this.firstPlayer, this.secondPlayer),
            new OngoingScoreRule(this.firstPlayer, this.secondPlayer),
        ]
    }

    public getScore() {
        for (let rule of this.scoreRules) {
            if (rule.isValid()) {
                return rule.getResult()
            }
        }
    }
}

interface ScoreRule {
    isValid(): boolean
    getResult(): string
}

abstract class BaseScoreRule {
    protected firstPlayer: Player
    protected secondPlayer: Player

    constructor(firstPlayer: Player, secondPlayer: Player) {
        this.firstPlayer = firstPlayer
        this.secondPlayer = secondPlayer
    }
}

class DrawScoreRule extends BaseScoreRule implements ScoreRule {
    public isValid() {
        return this.firstPlayer.isDrawWith(this.secondPlayer)
    }

    public getResult() {
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
}

class AdvantageScoreRule extends BaseScoreRule implements ScoreRule {
    public isValid() {
        return (
            this.firstPlayer.isInAdvantageOver(this.secondPlayer) ||
            this.secondPlayer.isInAdvantageOver(this.firstPlayer)
        )
    }

    public getResult() {
        return 'Advantage ' + this.playerWithHighestScore()
    }

    private playerWithHighestScore() {
        return this.firstPlayer.hasHigherScoreThan(this.secondPlayer)
            ? this.firstPlayer.name
            : this.secondPlayer.name
    }
}

class WinScoreRule extends BaseScoreRule implements ScoreRule {
    public isValid() {
        return (
            this.firstPlayer.hasWonOver(this.secondPlayer) ||
            this.secondPlayer.hasWonOver(this.firstPlayer)
        )
    }

    public getResult() {
        return 'Win for ' + this.playerWithHighestScore()
    }

    private playerWithHighestScore() {
        return this.firstPlayer.hasHigherScoreThan(this.secondPlayer)
            ? this.firstPlayer.name
            : this.secondPlayer.name
    }
}

class OngoingScoreRule extends BaseScoreRule implements ScoreRule {
    private pointsDescriptions = new Map<number, string>([
        [0, 'Love'],
        [1, 'Fifteen'],
        [2, 'Thirty'],
        [3, 'Forty'],
    ])

    public isValid() {
        return true
    }

    public getResult() {
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
