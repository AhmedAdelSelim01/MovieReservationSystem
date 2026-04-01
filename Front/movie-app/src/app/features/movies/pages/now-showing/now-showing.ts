import { Component } from '@angular/core';
import { NowShowing } from '../../components/now-showing/now-showing';

@Component({
  selector: 'app-now-showing-page',
  standalone: true,
  imports: [NowShowing],
  templateUrl: './now-showing.html',
  styleUrl: './now-showing.css',
})
export class NowShowing {}
