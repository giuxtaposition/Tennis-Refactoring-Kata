import { TennisGame } from "./TennisGame";

export class TennisGame3 implements TennisGame {
  private Player2Points: number = 0;
  private Player1Points: number = 0;
  private Player1Name: string;
  private Player2Name: string;
  private scoreString: string[] = ["Love", "Fifteen", "Thirty", "Forty"];

  constructor(Player1Name: string, Player2Name: string) {
    this.Player1Name = Player1Name;
    this.Player2Name = Player2Name;
  }

  getScore(): string {
    if (this.isDeuce()) {
      return "Deuce";
    }

    if (this.isWinnerRound()) {
      return "Win for " + this.playerWithHighestScore();
    }
    if (this.isAdvantageRound()) {
      return "Advantage " + this.playerWithHighestScore();
    }

    if (this.isDraw()) {
      return this.scoreString[this.Player1Points] + "-All";
    }

    return this.ongoingGameResult();
  }

  wonPoint(playerName: string): void {
    if (playerName === "player1") this.Player1Points += 1;
    else this.Player2Points += 1;
  }

  ongoingGameResult() {
    return (
      this.scoreString[this.Player1Points] +
      "-" +
      this.scoreString[this.Player2Points]
    );
  }

  isDraw(): boolean {
    return this.Player1Points === this.Player2Points;
  }

  isDeuce(): boolean {
    return this.isDraw() && this.Player1Points >= 3;
  }

  isAdvantageRound(): boolean {
    return (
      (this.Player1Points >= 4 &&
        this.Player1Points === this.Player2Points + 1) ||
      (this.Player2Points >= 4 && this.Player2Points === this.Player1Points + 1)
    );
  }

  isWinnerRound(): boolean {
    return (
      (this.Player1Points >= 4 &&
        this.Player1Points >= this.Player2Points + 2) ||
      (this.Player2Points >= 4 && this.Player2Points >= this.Player1Points + 2)
    );
  }

  playerWithHighestScore() {
    return this.Player1Points > this.Player2Points
      ? this.Player1Name
      : this.Player2Name;
  }
}
