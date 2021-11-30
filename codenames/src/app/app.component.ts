import { Component } from '@angular/core';
import { Card, CardType } from './types';

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

  cards = [
    [{
      word: "Cafe",
      type: CardType.UNKNOWN,
    },{
      word: "Google",
      type: CardType.UNKNOWN,
    },{
      word: "Doogler",
      type: CardType.TEAM_BLUE,
    }],
    [{
      word: "5BB",
      type: CardType.UNKNOWN,
    },{
      word: "Pano",
      type: CardType.TEAM_RED,
    },{
      word: "Chat app",
      type: CardType.NEUTRAL,
    }],
    [{
      word: "Button wall",
      type: CardType.NEUTRAL,
    },{
      word: "Reorg",
      type: CardType.DEATH,
    },{
      word: "Kudos",
      type: CardType.TEAM_BLUE,
    }],
  ]
}
