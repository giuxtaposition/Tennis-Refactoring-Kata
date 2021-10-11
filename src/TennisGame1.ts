import { TennisGame } from "./TennisGame";

export class TennisGame1 implements TennisGame {
  private Player1: Player;
  private Player2: Player;

  constructor(Player1Name: string, Player2Name: string) {
    this.Player1 = new Player(Player1Name);
    this.Player2 = new Player(Player2Name);
  }

  getScore(): string {
    if (this.isDraw()) {
      return this.drawResult();
    }
    if (this.isAdvantage()) {
      return this.advantageResult();
    }
    if (this.isWin()) {
      return this.winResult();
    }

    return this.ongoingResult();
  }

  wonPoint(playerName: string): void {
    this.isPlayer1(playerName)
      ? this.Player1.incrementScore()
      : this.Player2.incrementScore();
  }

  isPlayer1(playerName) {
    return playerName === "player1";
  }

  isDraw() {
    return this.Player1.score === this.Player2.score;
  }

  drawResult() {
    switch (this.Player1.score) {
      case 0:
        return "Love-All";
      case 1:
        return "Fifteen-All";
      case 2:
        return "Thirty-All";
      default:
        return "Deuce";
    }
  }

  isAdvantage() {
    return (
      this.hasPlayerReachedFourPoints() &&
      (this.getScoreDifference() === 1 || this.getScoreDifference() === -1)
    );
  }

  isWin() {
    return (
      this.hasPlayerReachedFourPoints() &&
      (this.getScoreDifference() >= 2 || this.getScoreDifference() <= -2)
    );
  }

  hasPlayerReachedFourPoints() {
    return this.Player1.score >= 4 || this.Player2.score >= 4;
  }

  getScoreDifference() {
    return this.Player1.score - this.Player2.score;
  }

  advantageResult() {
    return "Advantage " + this.playerWithHighestScore();
  }
  winResult() {
    return "Win for " + this.playerWithHighestScore();
  }

  playerWithHighestScore() {
    return this.Player1.score > this.Player2.score ? "player1" : "player2";
  }

  ongoingResult() {
    return (
      this.ongoingResultTerms(this.Player1.score) +
      "-" +
      this.ongoingResultTerms(this.Player2.score)
    );
  }

  ongoingResultTerms(score) {
    switch (score) {
      case 0:
        return "Love";
      case 1:
        return "Fifteen";
      case 2:
        return "Thirty";
      case 3:
        return "Forty";
    }
  }
}

class Player {
  private _score: number = 0;
  private _name: string;

  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get score() {
    return this._score;
  }

  incrementScore() {
    this._score++;
  }
}
