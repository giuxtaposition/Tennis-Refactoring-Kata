import { TennisGame } from "./TennisGame";

export class TennisGame2 implements TennisGame {
  Player1Points: number = 0;
  Player2Points: number = 0;

  Player1Result: string = "";
  Player2Result: string = "";

  getScore(): string {
    let score: string = "";
    if (this.Player1Points === this.Player2Points && this.Player1Points < 4) {
      // IN CASE OF DRAW
      if (this.Player1Points === 0) score = "Love";
      if (this.Player1Points === 1) score = "Fifteen";
      if (this.Player1Points === 2) score = "Thirty";
      score += "-All";
    }
    if (this.Player1Points === this.Player2Points && this.Player1Points >= 3)
      // IN CASE OF DEUCE
      score = "Deuce";

    if (this.Player1Points > 0 && this.Player2Points === 0) {
      if (this.Player1Points === 1) this.Player1Result = "Fifteen";
      if (this.Player1Points === 2) this.Player1Result = "Thirty";
      if (this.Player1Points === 3) this.Player1Result = "Forty";

      this.Player2Result = "Love";
      score = this.Player1Result + "-" + this.Player2Result;
    }
    if (this.Player2Points > 0 && this.Player1Points === 0) {
      if (this.Player2Points === 1) this.Player2Result = "Fifteen";
      if (this.Player2Points === 2) this.Player2Result = "Thirty";
      if (this.Player2Points === 3) this.Player2Result = "Forty";

      this.Player1Result = "Love";
      score = this.Player1Result + "-" + this.Player2Result;
    }

    if (this.Player1Points > this.Player2Points && this.Player1Points < 4) {
      if (this.Player1Points === 2) this.Player1Result = "Thirty";
      if (this.Player1Points === 3) this.Player1Result = "Forty";
      if (this.Player2Points === 1) this.Player2Result = "Fifteen";
      if (this.Player2Points === 2) this.Player2Result = "Thirty";
      score = this.Player1Result + "-" + this.Player2Result;
    }
    if (this.Player2Points > this.Player1Points && this.Player2Points < 4) {
      if (this.Player2Points === 2) this.Player2Result = "Thirty";
      if (this.Player2Points === 3) this.Player2Result = "Forty";
      if (this.Player1Points === 1) this.Player1Result = "Fifteen";
      if (this.Player1Points === 2) this.Player1Result = "Thirty";
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

  SetP1Score(score: number): void {
    for (let i = 0; i < score; i++) {
      this.Player1Scores();
    }
  }

  SetP2Score(score: number): void {
    for (let i = 0; i < score; i++) {
      this.Player2Scores();
    }
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
