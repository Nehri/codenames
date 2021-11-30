import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../types';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input()
  cards: Card[][];

  constructor() { }

  ngOnInit(): void {
  }
}
