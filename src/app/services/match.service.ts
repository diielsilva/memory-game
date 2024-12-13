import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Match} from '../models/match';
import {Card} from '../models/card';
import {data} from '../data/data';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private matchSignal: WritableSignal<Match> = signal<Match>(this.start());
  public matchState: Signal<Match> = computed(() => this.matchSignal());

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

  private removeFromAvailablePositions(selected: number[]): number[] {
    const availablePositions: number[] = this.matchSignal().availablePositions;

    return availablePositions.filter((value: number) => value !== selected[0] && value !== selected[1]);
  }


  public play(position: number): void {
    const canPlay: boolean =
      this.matchSignal().availablePositions.includes(position) &&
      !this.matchSignal().shouldFlipSelectedPositions &&
      !this.matchSignal().selectedPositions.includes(position);

    if (canPlay) {
      this.matchSignal().cards[position].visible = true;
      this.matchSignal().selectedPositions.push(position);

      const canMakeAPair: boolean = this.matchSignal().selectedPositions.length === 2;

      if (canMakeAPair) {
        const isNotPair: boolean = this.matchSignal().cards[this.matchSignal().selectedPositions[0]].value
          !== this.matchSignal().cards[this.matchSignal().selectedPositions[1]].value;


        if (isNotPair) {
          this.matchSignal().shouldFlipSelectedPositions = true;

          setTimeout(() => {
            this.matchSignal().cards[this.matchSignal().selectedPositions[0]].visible = false;
            this.matchSignal().cards[this.matchSignal().selectedPositions[1]].visible = false;
            this.matchSignal().shouldFlipSelectedPositions = false;
            this.matchSignal().selectedPositions = [];
          }, 700);
        } else {
          this.matchSignal().availablePositions = this.removeFromAvailablePositions(this.matchSignal().selectedPositions);
          this.matchSignal().selectedPositions = [];
        }

      }
    }

  }

}
