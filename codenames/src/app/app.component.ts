import { Component } from '@angular/core';
import { Card, CardType } from './types';
import { WORDS } from './words';
import * as uuid from 'uuid';
import { Router } from '@angular/router'; 
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'codenames';
  card = {
    word: "Word",
    type: CardType.TEAM_BLUE,
  };
  cards: Card[][];

  constructor(private router: Router,  private db: AngularFireDatabase ) {
  }

  startNewGame(){
    const cards = this.generateCards();
    const types = this.generateTypes();
    const gameId = uuid.v4();
    const game = this.db.object(`games/${gameId}`);
    game.set({cards, types});
    this.router.navigate([`/games/${gameId}`]);
  }


  private generateCards(): Card[][] {
    const cardArray: Card[][] = [];
    const cardIndexSet = new Set();
    for (let i = 0; i < 5; i++) {
      let cardRow: Card[] = [];
      for (let j = 0; j < 5; j++) {
        let cardIndex = this.getRandomWordIndex();
        while (cardIndexSet.has(cardIndex)) cardIndex = this.getRandomWordIndex();

        cardRow.push({word: WORDS[cardIndex], type: CardType.UNKNOWN});
        cardIndexSet.add(cardIndex);
      }
      cardArray.push(cardRow);
    }

    return cardArray;
  }

  private getRandomWordIndex() {
    return Math.floor(Math.random() * WORDS.length);
  }

  private generateTypes(): CardType[] {
    const types = [
      CardType.TEAM_BLUE,
      CardType.TEAM_BLUE,
      CardType.TEAM_BLUE,
      CardType.TEAM_BLUE,
      CardType.TEAM_BLUE,
      CardType.TEAM_BLUE,
      CardType.TEAM_BLUE,
      CardType.TEAM_BLUE,
      CardType.TEAM_RED,
      CardType.TEAM_RED,
      CardType.TEAM_RED,
      CardType.TEAM_RED,
      CardType.TEAM_RED,
      CardType.TEAM_RED,
      CardType.TEAM_RED,
      CardType.TEAM_RED,
      CardType.NEUTRAL,
      CardType.NEUTRAL,
      CardType.NEUTRAL,
      CardType.NEUTRAL,
      CardType.NEUTRAL,
      CardType.NEUTRAL,
      CardType.NEUTRAL,
      CardType.DEATH,
    ];
    const blueTeamHasExtraCard = Math.round(Math.random()) === 0;
    
    if (blueTeamHasExtraCard) {
      types.push(CardType.TEAM_BLUE);
    } else {
      types.push(CardType.TEAM_RED);
    }

     this.shuffleArray(types);
     return types;
  }

  private shuffleArray(array): void {
     array.sort(() => Math.random() - 0.5);
  }
}
