import { Component } from '@angular/core';
import { BarraderolarComponent } from './barraderolar/barraderolar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BarraderolarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
