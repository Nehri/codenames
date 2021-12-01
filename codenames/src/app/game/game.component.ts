import { Component, OnInit } from '@angular/core';
import { Card, CardType } from '../types';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { first, switchMap, map} from 'rxjs/operators';

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
  isCodeMaster: BehaviorSubject<boolean>;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) { 
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.isCodeMaster= new BehaviorSubject(false);
    
    this.cards = this.isCodeMaster.pipe(
      switchMap(isCodeMaster => {
        if(!isCodeMaster){
          return this.db.object(`games/${this.gameId}/cards`).valueChanges();
        }

        return this.db.object(`games/${this.gameId}`).valueChanges().pipe(
          map(game =>{
            const combinedCards = game['cards'];
            const cardTypes = game['types'];

            for(let i in combinedCards){
              for(let k in combinedCards[0]){
                combinedCards[i][k]['type'] = cardTypes[i][k];
              }
            }

            return combinedCards;
          })
          );
      })
    )
  
  }

  ngOnInit(): void {
  }

  flipCard({row, col}, cards) {
    const cardToFlip = cards[row][col];
    this.db.object(`games/${this.gameId}/types/${row}/${col}`).valueChanges().pipe(
      first()
      ).subscribe(cardType => {
      if (cardToFlip && cardType && cardToFlip.type === CardType.UNKNOWN) {
        cards[row][col].type = cardType;
        this.db.object(`games/${this.gameId}`).update({cards});
      }
    });
  }

  becomeCodeMaster(){
    this.isCodeMaster.next(true);
  }

  becomePlayer(){
    this.isCodeMaster.next(false);
  }
}
