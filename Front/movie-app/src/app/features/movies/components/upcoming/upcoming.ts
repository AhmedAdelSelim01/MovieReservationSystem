import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [NgFor],
  templateUrl: './upcoming.html',
  styleUrl: './upcoming.css',
})
export class Upcoming {
  upcoming = [
    {
      title: 'Echo Protocol',
      date: 'Apr 12',
      image: 'https://image.tmdb.org/t/p/original/1XDDXPXGiI8id7MrUxK36ke7gkX.jpg',
    },
    {
      title: 'Night Frequency',
      date: 'Apr 19',
      image: 'https://image.tmdb.org/t/p/original/wQ53sO5n9LCFbssV3oQ4CuajL1L.jpg',
    },
    {
      title: 'Quantum Drift',
      date: 'May 02',
      image: 'https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
    },
    {
      title: 'Rustline',
      date: 'May 16',
      image: 'https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg',
    },
  ];
}
