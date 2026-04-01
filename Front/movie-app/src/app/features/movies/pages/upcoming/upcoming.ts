import { Component } from '@angular/core';
import { Upcoming } from '../../components/upcoming/upcoming';

@Component({
  selector: 'app-upcoming-page',
  standalone: true,
  imports: [Upcoming],
  templateUrl: './upcoming.html',
  styleUrl: './upcoming.css',
})
export class Upcoming {}
