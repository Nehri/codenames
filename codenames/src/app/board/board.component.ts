import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../types';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input()
  cards: Card[][];

  @Input()
  clickingEnabled: boolean;

  @Output()
  cardClicked = new EventEmitter<{row: number, col: number}>();

  constructor() { }

  ngOnInit(): void {
  }

  emitCardClicked(rowIndex: number, colIndex: number): void {
    if(this.clickingEnabled){
      this.cardClicked.emit({row: rowIndex, col: colIndex})
      console.log('card clicked at ' + rowIndex + ', ' + colIndex);
    }
  }
}
