import Player from './Player'

export interface ScoreRule {
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

export class DrawScoreRule extends BaseScoreRule implements ScoreRule {
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

export class AdvantageScoreRule extends BaseScoreRule implements ScoreRule {
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

export class WinScoreRule extends BaseScoreRule implements ScoreRule {
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

export class OngoingScoreRule extends BaseScoreRule implements ScoreRule {
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
