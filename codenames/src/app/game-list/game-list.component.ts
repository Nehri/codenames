import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { Card, CardType, GameState, User, Team, TurnPhase } from '../types';
import { WORDS } from '../words';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  gameList: any;
  gameIds: Observable<string[]>;
  user: Observable<User>;

  constructor(private db: AngularFireDatabase, private router: Router, private afAuth: AngularFireAuth) { 
    this.gameList = this.db.object(`games`).valueChanges().pipe(shareReplay());
    this.gameIds = this.gameList.pipe(map(gameObject => Object.keys(gameObject)));
    this.user = afAuth.authState;
  }

  ngOnInit(): void {
  }

  createNewGame(user: User){
    const cards = this.generateCards();
    const firstTeam = this.generateFirstTeam();
    const types = this.generateTypes(firstTeam);
    const gameId = uuid.v4();
    const game = this.db.object(`games/${gameId}`);
    const players = {};
    players[user.uid] = user.email;
    game.set({
      cards, 
      types,
      gameState: GameState.CREATED,
      players,
      redCardsLeft: firstTeam === Team.TEAM_RED ? 9 : 8,
      blueCardsLeft: firstTeam === Team.TEAM_BLUE ? 9 : 8,
      currentTurn: {
        team: firstTeam,
        phase: TurnPhase.CLUE_GIVING,
        guessesRemaining: 0,
      },
    });
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

  private generateFirstTeam(): Team {
    return Math.round(Math.random()) === 0 ?  Team.TEAM_BLUE :  Team.TEAM_RED;
  }

  private generateTypes(firstTeam: Team): CardType[] {
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
    
    if (firstTeam === Team.TEAM_BLUE) {
      types.push(CardType.TEAM_BLUE);
    } else {
      types.push(CardType.TEAM_RED);
    }

     this.shuffleArray(types);
    
     const typesArr = [];
     while(types.length) typesArr.push(types.splice(0,5));

     return typesArr;
  }

  private shuffleArray(array): void {
     array.sort(() => Math.random() - 0.5);
  }
}
