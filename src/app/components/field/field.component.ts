import { Component } from '@angular/core';
import { Card } from '../../interfaces/card';
import { GameService } from '../../services/game.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './field.component.html',
  styleUrl: './field.component.css'
})
export class FieldComponent {
  protected cards: Card[] = []
  protected selecteds: Card[] = []

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.cards = this.gameService.fetchCards()
  }

  flipCard(index: number): void {
    if (this.selecteds.length < 2) {
      this.cards[index].flipped = true
      this.selecteds.push(this.cards[index])
    }

    if (this.selecteds.length === 2) {
      this.gameService.compare(this.selecteds[0], this.selecteds[1])
      setTimeout(() => this.selecteds = [], 2000)
    }
  }

  reset(): void {
    this.gameService.reset()
  }

}
