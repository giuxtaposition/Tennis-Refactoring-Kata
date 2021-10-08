import { TennisGame } from "./TennisGame";

export class TennisGame1 implements TennisGame {
  private player1Score: number = 0;
  private player2Score: number = 0;
  private Player1Name: string;
  private Player2Name: string;

  constructor(Player1Name: string, Player2Name: string) {
    this.Player1Name = Player1Name;
    this.Player2Name = Player2Name;
  }

  wonPoint(playerName: string): void {
    if (playerName === "player1") this.player1Score += 1;
    else this.player2Score += 1;
  }

  getScore(): string {
    if (this.player1Score === this.player2Score) {
      return parseScoreWhenDraw(this.player1Score);
    } else if (this.player1Score >= 4 || this.player2Score >= 4) {
      return checkForWin(this.player1Score, this.player2Score);
    } else {
      return (
        parseScore(this.player1Score) + "-" + parseScore(this.player2Score)
      );
    }
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
