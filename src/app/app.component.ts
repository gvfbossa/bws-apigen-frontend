import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from "./pages/shared/header/header.component";
import { FooterComponent } from "./pages/shared/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bws-apigen';
}
