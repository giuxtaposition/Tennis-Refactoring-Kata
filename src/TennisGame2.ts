import { TennisGame } from "./TennisGame";

export class TennisGame2 implements TennisGame {
  Player1Points: number = 0;
  Player2Points: number = 0;

  Player1Result: string = "";
  Player2Result: string = "";

  getScore(): string {
    let score: string = "";

    score = checkForDraw(this.Player1Points, this.Player2Points);

    if (
      (this.Player1Points > 0 && this.Player2Points === 0) ||
      (this.Player2Points > 0 && this.Player1Points === 0) ||
      (this.Player1Points > this.Player2Points && this.Player1Points < 4) ||
      (this.Player2Points > this.Player1Points && this.Player2Points < 4)
    ) {
      this.Player1Result = parseScore(this.Player1Points);
      this.Player2Result = parseScore(this.Player2Points);
      score = this.Player1Result + "-" + this.Player2Result;
    }

    if (this.Player1Points > this.Player2Points && this.Player2Points >= 3) {
      score = "Advantage player1";
    }

    if (this.Player2Points > this.Player1Points && this.Player1Points >= 3) {
      score = "Advantage player2";
    }

    if (
      this.Player1Points >= 4 &&
      this.Player2Points >= 0 &&
      this.Player1Points - this.Player2Points >= 2
    ) {
      score = "Win for player1";
    }
    if (
      this.Player2Points >= 4 &&
      this.Player1Points >= 0 &&
      this.Player2Points - this.Player1Points >= 2
    ) {
      score = "Win for player2";
    }
    return score;
  }

  Player1Scores(): void {
    this.Player1Points++;
  }

  Player2Scores(): void {
    this.Player2Points++;
  }

  wonPoint(player: string): void {
    if (player === "player1") this.Player1Scores();
    else this.Player2Scores();
  }
}

function checkForDraw(Player1Points, Player2Points) {
  if (Player1Points === Player2Points) {
    if (Player1Points === 0) return "Love-All";
    if (Player1Points === 1) return "Fifteen-All";
    if (Player1Points === 2) return "Thirty-All";
    if (Player1Points >= 3) return "Deuce";
  }
}

function parseScore(score) {
  switch (score) {
    case 0:
      return "Love";
    case 1:
      return "Fifteen";
    case 2:
      return "Thirty";
    case 3:
      return "Forty";
    default:
      break;
  }
}
