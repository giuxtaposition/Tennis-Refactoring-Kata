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
      scoreTerm += playTurn(this.player1Score);
      scoreTerm += "-";
      scoreTerm += playTurn(this.player2Score);
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
  }
}

function playTurn(playerScore) {
  return parseScore(playerScore);
}
