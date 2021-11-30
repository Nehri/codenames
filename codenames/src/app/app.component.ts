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
    type: CardType.DEATH,
  }
}
