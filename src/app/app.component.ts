import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FieldComponent } from './components/field/field.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FieldComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'memory-game';
}
