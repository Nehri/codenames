export interface GameState {
  cards: Card[];
  type: TEAM_A|TEAMB|DEATH|NEUTRAL []; 
}

enum Type: 'TEAM_A'|'TEAMB'|'DEATH'|'NEUTRAL'|'UNKNOWN';
enum Team: 'TEAM_A'|'TEAM_B';

export interface State{
  status: begin | playing|victory A victory B
  Turn: Team;
  Players: Player[];
  Cards: Card[];
  KeyCard: type[];
}

interface Turn {
  team: TEAM;
  clueStart: DateTime;
  clue: Clue;
  guessStart: DateTime|null;
  guesses: index[];
}

export interfaceCard{
  Word: string;
  Type: Type;
}

export interface Player{
  Team: Team;
  isCodeMaster: bool;
}

export interface Clue {
Word: str;
Number: number;
}
