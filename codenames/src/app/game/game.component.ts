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

}
