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
      return checkScore(this.Player1Points, this.Player2Points);
    } else {
      if (this.Player1Points === this.Player2Points) return "Deuce";
      return checkWinOrAdvantage(
        this.Player1Points,
        this.Player2Points,
        this.Player1Name,
        this.Player2Name
      );
    }
  }

  wonPoint(playerName: string): void {
    if (playerName === "player1") this.Player1Points += 1;
    else this.Player2Points += 1;
  }
}

function checkScore(Player1Points, Player2Points) {
  const scoreString: string[] = ["Love", "Fifteen", "Thirty", "Forty"];
  return Player1Points === Player2Points
    ? scoreString[Player1Points] + "-All"
    : scoreString[Player1Points] + "-" + scoreString[Player2Points];
}

function checkWinOrAdvantage(
  Player1Points,
  Player2Points,
  Player1Name,
  Player2Name
) {
  let playerName = Player1Points > Player2Points ? Player1Name : Player2Name;
  return (Player1Points - Player2Points) * (Player1Points - Player2Points) === 1
    ? "Advantage " + playerName
    : "Win for " + playerName;
}
