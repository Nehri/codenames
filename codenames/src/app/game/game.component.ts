import { Component, OnInit } from '@angular/core';
import { Card, CardType } from '../types';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

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
  cards: any;
  // types: Promise<CardType[]>;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) { 
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.cards = this.db.object(`games/${this.gameId}/cards`).valueChanges();
  }

  ngOnInit(): void {
  }

  flipCard({row, col}, cards) {
    const cardToFlip = cards[row][col];
    const cardIndex = (row*5) + col;
    this.db.object(`games/${this.gameId}/types/${cardIndex}`).valueChanges().pipe(
      first()
      ).subscribe(cardType => {
      if (cardToFlip && cardType && cardToFlip.type === CardType.UNKNOWN) {
        cards[row][col].type = cardType;
        this.db.object(`games/${this.gameId}`).update({cards});
      }
    });
  }
}
