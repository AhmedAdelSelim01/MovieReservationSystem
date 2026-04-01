import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card';

@Component({
  selector: 'app-now-showing',
  standalone: true,
  imports: [NgFor, MovieCardComponent],
  templateUrl: './now-showing.html',
  styleUrl: './now-showing.css',
})
export class NowShowing {
  movies = [
    {
      title: 'Inception',
      description: 'A skilled thief leads a team into dreams to steal secrets.',
      releaseDate: new Date('2010-07-16'),
      genre: 'Sci-Fi',
      director: 'Christopher Nolan',
      duration: 148,
      rating: 8.8,
      image: 'https://image.tmdb.org/t/p/w500/6e5cF6KfcVAQg3nsvYhLav99UUH.jpg',
    },
    {
      title: 'The Dark Knight',
      description: 'Batman faces the Joker in a battle for Gotham.',
      releaseDate: new Date('2008-07-18'),
      genre: 'Action',
      director: 'Christopher Nolan',
      duration: 152,
      rating: 9.0,
      image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    },
    {
      title: 'Interstellar',
      description: 'Explorers travel through a wormhole in space.',
      releaseDate: new Date('2014-11-07'),
      genre: 'Adventure',
      director: 'Christopher Nolan',
      duration: 169,
      rating: 8.6,
      image: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
    },
    {
      title: 'Parasite',
      description: 'A poor family infiltrates a rich household.',
      releaseDate: new Date('2019-05-30'),
      genre: 'Thriller',
      director: 'Bong Joon-ho',
      duration: 132,
      rating: 8.5,
      image: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    },
    {
      title: 'Avengers: Endgame',
      description: 'The Avengers fight their final battle.',
      releaseDate: new Date('2019-04-26'),
      genre: 'Superhero',
      director: 'Anthony Russo',
      duration: 181,
      rating: 8.4,
      image: 'https://image.tmdb.org/t/p/original/8KhDbFg9STRlvrOLvaQ7PjOo7XT.jpg',
    },
  ];
}
