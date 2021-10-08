import { TennisGame } from "./TennisGame";

export class TennisGame3 implements TennisGame {
  private Player2Points: number = 0;
  private Player1Points: number = 0;
  private Player1Name: string;
  private Player2Name: string;

  constructor(Player1Name: string, Player2Name: string) {
    this.Player1Name = Player1Name;
    this.Player2Name = Player2Name;
  }

  getScore(): string {
    if (this.isMidGame()) {
      return this.getGameScore();
    } else {
      if (this.Player1Points === this.Player2Points) return "Deuce";
      return this.getWinningScore();
    }
  }

  wonPoint(playerName: string): void {
    if (playerName === "player1") this.Player1Points += 1;
    else this.Player2Points += 1;
  }

  isMidGame() {
    return (
      this.Player1Points < 4 &&
      this.Player2Points < 4 &&
      !(this.Player1Points + this.Player2Points === 6)
    );
  }

  getGameScore() {
    const scoreString: string[] = ["Love", "Fifteen", "Thirty", "Forty"];
    return this.isDraw()
      ? scoreString[this.Player1Points] + "-All"
      : scoreString[this.Player1Points] + "-" + scoreString[this.Player2Points];
  }

  isDraw() {
    return this.Player1Points === this.Player2Points;
  }

  getWinningScore() {
    let playerName =
      this.Player1Points > this.Player2Points
        ? this.Player1Name
        : this.Player2Name;
    return (this.Player1Points - this.Player2Points) *
      (this.Player1Points - this.Player2Points) ===
      1
      ? "Advantage " + playerName
      : "Win for " + playerName;
  }
}
