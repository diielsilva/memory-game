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
    const duplicates: Card[] = this.duplicate(data);
    const shuffled: Card[] = this.shuffle(duplicates);
    const availablePositions: number[] = this.getAvailablePositions(shuffled);
    const selectedPositions: number[] = [];
    const shouldFlipSelectedPositions: boolean = false;

    return {
      selectedPositions,
      availablePositions,
      shouldFlipSelectedPositions,
      cards: shuffled
    };
  }

  private duplicate(cards: Card[]): Card[] {
    const duplicates: Card[] = [];

    cards.forEach(card => {
      duplicates.push({value: card.value, visible: card.visible});
      duplicates.push({value: card.value, visible: card.visible});
    });

    return duplicates;
  }

  private shuffle(cards: Card[]): Card[] {
    for (let i: number = cards.length - 1; i > 0; i--) {
      const random: number = Math.floor(Math.random() * (i + 1));
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
    const match: Match = this.matchSignal();

    const canPlay: boolean =
      match.availablePositions.includes(position) &&
      !match.shouldFlipSelectedPositions &&
      !match.selectedPositions.includes(position);

    if (canPlay) {
      match.cards[position].visible = true;
      match.selectedPositions.push(position);

      const canBePair: boolean = match.selectedPositions.length === 2;

      if (canBePair) {
        const isNotPair: boolean = match.cards[match.selectedPositions[0]].value
          !== match.cards[match.selectedPositions[1]].value;

        if (isNotPair) {
          match.shouldFlipSelectedPositions = true;

          setTimeout(() => {
            match.cards[match.selectedPositions[0]].visible = false;
            match.cards[match.selectedPositions[1]].visible = false;
            match.shouldFlipSelectedPositions = false;
            match.selectedPositions = [];
          }, 700);

          return;
        }
        match.availablePositions = this.removeFromAvailablePositions(match.selectedPositions);
        match.selectedPositions = [];
      }
    }

  }

  public restart(): void {
    this.matchSignal.set(this.start());
  }

}
