export enum CardType {
	TEAM_A = 'TEAM_A',
	TEAM_B = 'TEAM_B',
	DEATH = 'DEATH',
	NEUTRAL = 'NEUTRAL', 
}

export interface Card {
	word: string;
	type: CardType;
}

