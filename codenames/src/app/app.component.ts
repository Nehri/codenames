import { Component } from '@angular/core';
import { Card, CardType } from './types';
import { WORDS } from './words';
import * as uuid from 'uuid';
import { Router } from '@angular/router'; 

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

  constructor(private router: Router ) {
  }

  startNewGame(){
    const gameId = uuid.v4();
    this.router.navigate([`/games/${gameId}`]);
  }
}
