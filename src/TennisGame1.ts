import { TennisGame } from "./TennisGame";

export class TennisGame1 implements TennisGame {
  private player1Score: number = 0;
  private player2Score: number = 0;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  wonPoint(playerName: string): void {
    if (playerName === "player1") this.player1Score += 1;
    else this.player2Score += 1;
  }

  getScore(): string {
    let scoreTerm: string = "";
    let tempScore: number = 0;
    if (this.player1Score === this.player2Score) {
      switch (this.player1Score) {
        case 0:
          scoreTerm = "Love-All";
          break;
        case 1:
          scoreTerm = "Fifteen-All";
          break;
        case 2:
          scoreTerm = "Thirty-All";
          break;
        default:
          scoreTerm = "Deuce";
          break;
      }
    } else if (this.player1Score >= 4 || this.player2Score >= 4) {
      const minusResult: number = this.player1Score - this.player2Score;
      if (minusResult === 1) scoreTerm = "Advantage player1";
      else if (minusResult === -1) scoreTerm = "Advantage player2";
      else if (minusResult >= 2) scoreTerm = "Win for player1";
      else scoreTerm = "Win for player2";
    } else {
      for (let i = 1; i < 3; i++) {
        if (i === 1) tempScore = this.player1Score;
        else {
          scoreTerm += "-";
          tempScore = this.player2Score;
        }
        switch (tempScore) {
          case 0:
            scoreTerm += "Love";
            break;
          case 1:
            scoreTerm += "Fifteen";
            break;
          case 2:
            scoreTerm += "Thirty";
            break;
          case 3:
            scoreTerm += "Forty";
            break;
        }
      }
    }
    return scoreTerm;
  }
}
