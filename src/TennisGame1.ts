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
    let scoreNumber: number = 0;
    // IF DRAW
    if (this.player1Score === this.player2Score) {
      scoreTerm = parseScoreWhenDraw(this.player1Score);
      // IF ONE player >= 4
      // CHECK FOR WIN
    } else if (this.player1Score >= 4 || this.player2Score >= 4) {
      scoreTerm = checkForWin(this.player1Score, this.player2Score);
    } else {
      // ELSE KEEP PLAYING
      for (let i = 1; i < 3; i++) {
        if (i === 1) scoreNumber = this.player1Score;
        else {
          scoreTerm += "-";
          scoreNumber = this.player2Score;
        }
        switch (scoreNumber) {
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

function parseScoreWhenDraw(score) {
  let result = "";
  switch (score) {
    case 0:
      result = "Love-All";
      break;
    case 1:
      result = "Fifteen-All";
      break;
    case 2:
      result = "Thirty-All";
      break;
    default:
      result = "Deuce";
      break;
  }
  return result;
}

function checkForWin(player1Score, player2Score) {
  const minusResult: number = player1Score - player2Score;
  if (minusResult === 1) return "Advantage player1";
  else if (minusResult === -1) return "Advantage player2";
  else if (minusResult >= 2) return "Win for player1";
  else return "Win for player2";
}
