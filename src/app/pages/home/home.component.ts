import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { DemoComponent } from "./demo/demo.component";
import { FeaturesComponent } from "./features/features.component";
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { InstallationComponent } from "./installation/installation.component";
import { LimitationsComponent } from "./limitations/limitations.component";
import { PricingComponent } from "./pricing/pricing.component";
import { FinalCtaComponent } from './final-cta/final-cta.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent, 
    DemoComponent, 
    FeaturesComponent, 
    HowItWorksComponent, 
    InstallationComponent, 
    LimitationsComponent,
    PricingComponent,
    FinalCtaComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
