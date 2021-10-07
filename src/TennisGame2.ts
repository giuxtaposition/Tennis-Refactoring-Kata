import { TennisGame } from "./TennisGame";

export class TennisGame2 implements TennisGame {
  Player1Points: number = 0;
  Player2Points: number = 0;
  private Player1Name: string;
  private Player2Name: string;

  constructor(Player1Name: string, Player2Name: string) {
    this.Player1Name = Player1Name;
    this.Player2Name = Player2Name;
  }

  getScore(): string {
    let score: string = "";

    score += checkForDraw(this.Player1Points, this.Player2Points);
    score += checkForWin(this.Player1Points, this.Player2Points);
    score += checkScore(this.Player1Points, this.Player2Points);

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
    switch (Player1Points) {
      case 0:
        return "Love-All";
      case 1:
        return "Fifteen-All";
      case 2:
        return "Thirty-All";
      default:
        return "Deuce";
    }
  } else {
    return "";
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

function checkForWin(Player1Points, Player2Points) {
  if (
    Player1Points >= 4 &&
    Player2Points >= 0 &&
    Player1Points - Player2Points >= 2
  ) {
    return "Win for player1";
  } else if (
    Player2Points >= 4 &&
    Player1Points >= 0 &&
    Player2Points - Player1Points >= 2
  ) {
    return "Win for player2";
  } else if (Player1Points > Player2Points && Player2Points >= 3) {
    return "Advantage player1";
  } else if (Player2Points > Player1Points && Player1Points >= 3) {
    return "Advantage player2";
  } else {
    return "";
  }
}

function checkScore(Player1Points, Player2Points) {
  if (
    (Player1Points > Player2Points && Player1Points < 4) ||
    (Player2Points > Player1Points && Player2Points < 4)
  ) {
    return parseScore(Player1Points) + "-" + parseScore(Player2Points);
  } else {
    return "";
  }
}
