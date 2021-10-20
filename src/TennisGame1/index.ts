import { TennisGame } from '../TennisGame'
import Player from './Player'
import ScoreBoard from './ScoreBoard'
import {
    DrawScoreRule,
    AdvantageScoreRule,
    WinScoreRule,
    OngoingScoreRule,
} from './ScoreRule'

export class TennisGame1 implements TennisGame {
    private firstPlayer: Player
    private secondPlayer: Player
    private scoreBoard: ScoreBoard

    constructor(firstPlayerName: string, secondPlayerName: string) {
        this.firstPlayer = new Player(firstPlayerName)
        this.secondPlayer = new Player(secondPlayerName)
        this.scoreBoard = new ScoreBoard([
            new DrawScoreRule(this.firstPlayer, this.secondPlayer),
            new AdvantageScoreRule(this.firstPlayer, this.secondPlayer),
            new WinScoreRule(this.firstPlayer, this.secondPlayer),
            new OngoingScoreRule(this.firstPlayer, this.secondPlayer),
        ])
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
