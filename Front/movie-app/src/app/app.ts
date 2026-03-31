import { Component, signal } from '@angular/core';
import { Hero } from './components/hero/hero';
import { NowShowing } from './components/now-showing/now-showing';
import { Upcoming } from "./components/upcoming/upcoming";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Hero, NowShowing, Upcoming],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('movie-app');
}
