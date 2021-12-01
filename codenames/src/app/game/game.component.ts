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
  game: any;
  cards: Card[][];
  // types: Promise<CardType[]>;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) { 
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.game = this.db.object(`games/${this.gameId}`).valueChanges();
  }

  ngOnInit(): void {
  }

  flipCard({row, col}, game) {
    const cards = game.cards;
    const cardToFlip = cards[row][col];
    const cardType = game.types[(row*5) + col];

    if (cardToFlip && cardType && cardToFlip.type === CardType.UNKNOWN) {
      cards[row][col].type = game.types[(row*5) + col];
      this.db.object(`games/${this.gameId}`).update({cards});
    }
  }
}
