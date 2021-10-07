import { TennisGame } from "./TennisGame";

export class TennisGame3 implements TennisGame {
  private Player2Points: number = 0;
  private Player1Points: number = 0;
  private Player1Result: string;
  private Player2Result: string;

  constructor(Player1Result: string, Player2Result: string) {
    this.Player1Result = Player1Result;
    this.Player2Result = Player2Result;
  }

  getScore(): string {
    let result: string;
    if (
      this.Player1Points < 4 &&
      this.Player2Points < 4 &&
      !(this.Player1Points + this.Player2Points === 6)
    ) {
      const p: string[] = ["Love", "Fifteen", "Thirty", "Forty"];
      result = p[this.Player1Points];
      return this.Player1Points === this.Player2Points
        ? result + "-All"
        : result + "-" + p[this.Player2Points];
    } else {
      if (this.Player1Points === this.Player2Points) return "Deuce";
      result =
        this.Player1Points > this.Player2Points
          ? this.Player1Result
          : this.Player2Result;
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
