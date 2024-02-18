import { Injectable } from '@angular/core';
import { data } from '../data/data';
import { Card } from '../interfaces/card';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  protected cards: Card[] = data

  constructor() {
    this.prepareCards()
  }

  fetchCards = () => this.cards

  prepareCards(): void {
    const previousLength = this.cards.length

    for (let i = 0; i < previousLength; i++) {
      this.cards.push(structuredClone(this.cards[i]))
    }

    this.cards.sort((a, b) => Math.random() - 0.5)

  }

  compare(first: Card, second: Card): void {
    if (first.value !== second.value) {

      setTimeout(() => {
        first.flipped = false
        second.flipped = false
      }, 2000)

    }
  }

  reset(): void {

    this.cards.sort((a, b) => Math.random() - 0.5)

    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].flipped = false
    }

  }

}
