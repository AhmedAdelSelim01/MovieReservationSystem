// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-movie-card',
//   imports: [],
//   templateUrl: './movie-card.html',
//   styleUrl: './movie-card.css',
// })
// export class MovieCard {}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.css'],
})
export class MovieCardComponent {
  @Input({ required: true }) movie!: { title: string; image: string };
}
