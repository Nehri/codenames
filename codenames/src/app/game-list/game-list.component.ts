import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  gameList: any;
  gameIds: Observable<string[]>;

  constructor(private db: AngularFireDatabase,) { 
    this.gameList = this.db.object(`games`).valueChanges().pipe(tap(games => {
      const a = 1;
    }));
    this.gameIds = this.gameList.pipe(map(gameObject => {
      return Object.keys(gameObject); }));
  }

  ngOnInit(): void {
  }

}
