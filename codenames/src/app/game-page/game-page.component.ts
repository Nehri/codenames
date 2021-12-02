import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Card, CardType, Team, TurnPhase } from '../types';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { first, switchMap, map, shareReplay} from 'rxjs/operators';
=======
import { Card, CardType, User } from '../types';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { first, switchMap, map, shareReplay } from 'rxjs/operators';
>>>>>>> f4d77d6 (separate joining vs creating games)
import { FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';


import { WORDS } from '../words';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-game',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  gameId: string;
  game: any;
  cards: any;
  clues: any;
  isInGame: Observable<boolean>;
  // types: Promise<CardType[]>;
  isCodeMaster: BehaviorSubject<boolean>;
<<<<<<< HEAD
  turnPhase: Observable<any>;
  guessesRemaining: Observable<any>;
  teamTurn: Observable<any>;
  canClickCards: Observable<boolean>;
  canNotGiveClues: Observable<boolean>;
=======
  user: Observable<User>;
>>>>>>> f4d77d6 (separate joining vs creating games)

  clueForm = this.formBuilder.group({
    word: '',
    number: 0
  });

  constructor(private route: ActivatedRoute, 
    private db: AngularFireDatabase,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,) { 
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.user = afAuth.authState.pipe(shareReplay());
    this.isCodeMaster= new BehaviorSubject(false);
    this.clues = this.db.object(`games/${this.gameId}/clues`).valueChanges().pipe(map(obj => obj? Object.values(obj) : [])); 
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
    );
<<<<<<< HEAD

    this.turnPhase = this.db.object(`games/${this.gameId}/currentTurn/phase`).valueChanges().pipe(shareReplay(1));
    this.canClickCards = this.turnPhase.pipe(map(gamePhase => gamePhase === TurnPhase.GUESSING), shareReplay(1));
    this.canNotGiveClues = this.turnPhase.pipe(map(gamePhase => gamePhase !== TurnPhase.CLUE_GIVING), shareReplay(1));

    this.guessesRemaining = this.db.object(`games/${this.gameId}/currentTurn/guessesRemaining`).valueChanges().pipe(shareReplay(1));
    this.teamTurn = this.db.object(`games/${this.gameId}/currentTurn/team`).valueChanges().pipe(shareReplay(1));
=======
    this.isInGame = combineLatest([this.user, this.db.object(`games/${this.gameId}/players`).valueChanges()]).pipe(map(([user, players]) => {
      return !!players ? Object.keys(players).includes(user.uid ?? '') : false;
    }));
>>>>>>> f4d77d6 (separate joining vs creating games)
  }

  ngOnInit(): void {
  }

  joinGame(user: User) {
    this.db.object(`games/${this.gameId}/players`).valueChanges().pipe(first()).subscribe(players => {
      if (!players) players = {};
      players[user.uid] = user.email;
      this.db.object(`games/${this.gameId}/players`).update(players);
    });
  }

  flipCard({row, col}, cards) {
    const cardToFlip = cards[row][col];
    this.db.object(`games/${this.gameId}/types/${row}/${col}`).valueChanges().pipe(
      first()
      ).subscribe(cardType => {
      if (cardToFlip && cardType && cardToFlip.type === CardType.UNKNOWN) {
        cards[row][col].type = cardType;
        this.db.object(`games/${this.gameId}`).update({cards});
        this.getAndUpdateValue(`games/${this.gameId}/currentTurn/guessesRemaining`, (guesses) => guesses -1);
        this.decrementguesses();
      }
    });
  }

  decrementguesses(){
    this.getAndUpdateValue(`games/${this.gameId}/currentTurn`,(currentTurn) =>{
      let guessesRemaining = currentTurn['guessesRemaining'] as number;
      guessesRemaining--;
      const phase = guessesRemaining ? TurnPhase.GUESSING : TurnPhase.CLUE_GIVING;
      const team = guessesRemaining <= 0 ? this.getOppositeTurn(currentTurn['team']) : currentTurn['team'];
      return {
        team,
        phase,
        guessesRemaining,
      }
    }); 
  }

  getOppositeTurn(team: Team){
    return team === Team.TEAM_BLUE ? Team.TEAM_RED : Team.TEAM_BLUE;
  }

  getAndUpdateValue(path, updateFunction){
    this.db.object(path).valueChanges().pipe(
      first()).subscribe((val =>{
        const anyVal = val as any;
        const newVal = updateFunction(anyVal);
        this.db.object(path).update(newVal);
      }));
  }

  becomeCodeMaster(){
    this.isCodeMaster.next(true);
  }

  becomePlayer(){
    this.isCodeMaster.next(false);
  }

  onSubmit(): void {
    const clue = {
      word: this.clueForm.get('word').value,
      number: this.clueForm.get('number').value,
    }

    var messageListRef = this.db.database.ref(`games/${this.gameId}/clues`);
    var newMessageRef = messageListRef.push();
    newMessageRef.set(clue);

    const turnPhase = this.db.object(`games/${this.gameId}/currentTurn/phase`);
    turnPhase.set(TurnPhase.GUESSING);

    const guessesRemaining = this.db.object(`games/${this.gameId}/currentTurn/guessesRemaining`);
    guessesRemaining.set(clue.number);

    this.clueForm.reset();
  }
}
