import { TennisGame } from "./TennisGame";

export class TennisGame1 implements TennisGame {
  private player1Score: number = 0;
  private player2Score: number = 0;

  wonPoint(playerName: string): void {
    if (playerName === "player1") this.player1Score += 1;
    else this.player2Score += 1;
  }

  getScore(): string {
    let result: string = "";
    if (this.player1Score === this.player2Score) {
      result = parseScoreWhenDraw(this.player1Score);
    } else if (this.player1Score >= 4 || this.player2Score >= 4) {
      result = checkForWin(this.player1Score, this.player2Score);
    } else {
      result += parseScore(this.player1Score);
      result += "-";
      result += parseScore(this.player2Score);
    }
    return result;
  }
}

function parseScoreWhenDraw(score) {
  switch (score) {
    case 0:
      return "Love-All";
    case 1:
      return "Fifteen-All";
    case 2:
      return "Thirty-All";
    default:
      return "Deuce";
  }
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
