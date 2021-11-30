import { Component, OnInit } from '@angular/core';
import { Card, CardType } from '../types';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { WORDS } from '../words';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  gameId: string;
  cards: Card[][];
  types: CardType[];

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) { 
    this.cards = this.generateCards();
    this.types = this.generateTypes();
    this.gameId = this.route.snapshot.paramMap.get('gameId');

    console.log('in constructor');
  }

  ngOnInit(): void {
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
