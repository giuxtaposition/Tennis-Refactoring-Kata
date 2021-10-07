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
    let result: string;
    if (
      this.Player1Points < 4 &&
      this.Player2Points < 4 &&
      !(this.Player1Points + this.Player2Points === 6)
    ) {
      const scoreString: string[] = ["Love", "Fifteen", "Thirty", "Forty"];
      result = scoreString[this.Player1Points];
      return this.Player1Points === this.Player2Points
        ? result + "-All"
        : result + "-" + scoreString[this.Player2Points];
    } else {
      if (this.Player1Points === this.Player2Points) return "Deuce";
      result =
        this.Player1Points > this.Player2Points
          ? this.Player1Name
          : this.Player2Name;
      return (this.Player1Points - this.Player2Points) *
        (this.Player1Points - this.Player2Points) ===
        1
        ? "Advantage " + result
        : "Win for " + result;
    }
  }

  wonPoint(playerName: string): void {
    if (playerName === "player1") this.Player1Points += 1;
    else this.Player2Points += 1;
  }
}
