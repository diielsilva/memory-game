import {Component, inject, Signal} from '@angular/core';
import {MatchService} from './services/match.service';
import {Match} from './models/match';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    NgClass
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private matchService: MatchService = inject(MatchService);
  protected matchState: Signal<Match> = this.matchService.matchState;

  protected play(position: number): void {
    this.matchService.play(position);
  }

  protected restart(): void {
    this.matchService.restart();
  }

}
