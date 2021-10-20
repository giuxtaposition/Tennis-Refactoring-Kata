export default class Player {
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
