import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-final-cta',
  standalone: true,
  imports: [],
  templateUrl: './final-cta.component.html',
  styleUrl: './final-cta.component.scss'
})
export class FinalCtaComponent {

  constructor(private router: Router) {}

  goTo() {
    this.router.navigate(['register'])
  }

}
