import {Injectable} from '@angular/core';
import {Match} from '../models/match';
import {Card} from '../models/card';
import {data} from '../data/data';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private start(): Match {
    const duplicated: Card[] = this.duplicate(data);
    const shuffled: Card[] = this.shuffle(duplicated);
    const selectedPositions: number[] = [];
    const availablePositions: number[] = this.getAvailablePositions(shuffled);
    const shouldFlipSelectedPositions: boolean = false;

    return {
      selectedPositions,
      availablePositions,
      shouldFlipSelectedPositions,
      cards: shuffled
    };

  }

  private duplicate(cards: Card[]): Card[] {
    return [...cards, ...cards];
  }

  private shuffle(cards: Card[]): Card[] {
    for (let i: number = cards.length - 1; i > 0; i--) {
      const random: number = Math.floor(Math.random() * (cards.length + 1));
      const card: Card = cards[random];
      cards[random] = cards[i];
      cards[i] = card;
    }

    return cards;
  }

  private getAvailablePositions(cards: Card[]): number[] {
    const availablePositions: number[] = [];

    for (let i: number = 0; i < cards.length; i++) {
      availablePositions.push(i);
    }

    return availablePositions;
  }

}
