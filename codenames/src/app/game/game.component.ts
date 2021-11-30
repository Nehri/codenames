import { Component, OnInit } from '@angular/core';
import { Card, CardType } from '../types';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  gameId: Observable<string>;

  constructor(private route: ActivatedRoute,) { 
    console.log('in constructor');
    this.gameId = this.route.paramMap.pipe(params => {
      console.log(params);
      console.log(params['gameId']);
      return params['gameId'];
    });
  }

  ngOnInit(): void {
  }

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
