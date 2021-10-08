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
    playerName === "player1" ? this.player1Score++ : this.player2Score++;
  }

  getScore(): string {
    if (this.player1Score === this.player2Score) {
      return this.parseScoreWhenDraw();
    } else if (this.player1Score >= 4 || this.player2Score >= 4) {
      return this.checkForWin();
    } else {
      return (
        this.parseScore(this.player1Score) +
        "-" +
        this.parseScore(this.player2Score)
      );
    }
  }

  parseScore(score) {
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

  parseScoreWhenDraw() {
    switch (this.player1Score) {
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

  checkForWin() {
    const minusResult: number = this.player1Score - this.player2Score;
    if (minusResult === 1) return "Advantage player1";
    else if (minusResult === -1) return "Advantage player2";
    else if (minusResult >= 2) return "Win for player1";
    else return "Win for player2";
  }
}
