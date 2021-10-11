import { TennisGame } from "./TennisGame";

export class TennisGame1 implements TennisGame {
  private player1Score: number = 0;
  private player2Score: number = 0;
  private Player1Name: string;
  private Player2Name: string;

  constructor(Player1Name: string, Player2Name: string) {
    this.Player1Name = Player1Name;
    this.Player2Name = Player2Name;
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
      ? this.incrementScorePlayer1()
      : this.incrementScorePlayer2();
  }

  isPlayer1(playerName) {
    return playerName === "player1";
  }

  incrementScorePlayer2() {
    this.player2Score++;
  }

  incrementScorePlayer1() {
    this.player1Score++;
  }

  isDraw() {
    return this.player1Score === this.player2Score;
  }

  drawResult() {
    switch (this.player1Score) {
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
    return this.player1Score >= 4 || this.player2Score >= 4;
  }

  getScoreDifference() {
    return this.player1Score - this.player2Score;
  }

  advantageResult() {
    return "Advantage " + this.playerWithHighestScore();
  }
  winResult() {
    return "Win for " + this.playerWithHighestScore();
  }

  playerWithHighestScore() {
    return this.player1Score > this.player2Score ? "player1" : "player2";
  }

  ongoingResult() {
    return (
      this.ongoingResultTerms(this.player1Score) +
      "-" +
      this.ongoingResultTerms(this.player2Score)
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
