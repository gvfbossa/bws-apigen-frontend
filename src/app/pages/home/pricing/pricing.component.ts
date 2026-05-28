import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {

  constructor(private router: Router) { }

  goTo(plan: 'SOLO' | 'SMALL' | 'FULL') {
    this.router.navigate(['/register'], { state: { plan } });
  }

}
