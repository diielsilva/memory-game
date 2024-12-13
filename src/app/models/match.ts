import {Card} from './card';

export interface Match {
  selectedPositions: number[];
  availablePositions: number[];
  shouldFlipSelectedPositions: boolean;
  cards: Card[];
}
