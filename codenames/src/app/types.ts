// export interface GameState {
//   cards: Card[];
//   type: TEAM_A|TEAMB|DEATH|NEUTRAL []; 
// }

export enum CardType{
	TEAM_RED = 'TEAM_RED',
	TEAM_BLUE = 'TEAM_BLUE',
	DEATH = 'DEATH',
	NEUTRAL = 'NEUTRAL',
	UNKNOWN = 'UNKNOWN',
} 

export enum Team {
	TEAM_RED = 'TEAM_RED',
	TEAM_BLUE = 'TEAM_BLUE',
}

export enum TurnPhase {
	CLUE_GIVING = 'CLUE_GIVING',
	GUESSING = 'GUESSING',
}

export interface Card {
	word: string;
	type: CardType;
}

export enum GameState {
	CREATED = 'CREATED',
	STARTED = 'STARTED',
	ENDED = 'ENDED',
	UNKNOWN = 'UNKNOWN',
}

export interface User {
	uid: string;
	email: string;
}

// enum Team: 'TEAM_A'|'TEAM_B';

// export interface State{
//   status: begin | playing|victory A victory B
//   Turn: Team;
//   Players: Player[];
//   Cards: Card[];
//   KeyCard: type[];
// }

// interface Turn {
//   team: TEAM;
//   clueStart: DateTime;
//   clue: Clue;
//   guessStart: DateTime|null;
//   guesses: index[];
// }

// export interfaceCard{
//   Word: string;
//   Type: Type;
// }

// export interface Player{
//   Team: Team;
//   isCodeMaster: bool;
// }

// export interface Clue {
// Word: str;
// Number: number;
// }
