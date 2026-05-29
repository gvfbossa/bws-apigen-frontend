import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FooterComponent } from "./pages/shared/footer/footer.component";
import { HeaderComponent } from "./pages/shared/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, FooterComponent, HeaderComponent]
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    const gtagScript = document.createElement('script');
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XL9JSQN8PL';
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag = function () {
      (window as any).dataLayer.push(arguments);
    };

    (window as any).gtag('js', new Date());

    (window as any).gtag('config', 'G-XL9JSQN8PL', {
      cookie_flags: 'SameSite=None;Secure',
      cookie_domain: 'bwsapigen.bossawebsolutions.com.br'
    });

    // SPA page tracking
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        (window as any).gtag('event', 'page_view', {
          page_path: event.urlAfterRedirects,
          page_title: document.title,
          page_location: window.location.href
        });
      });
  }
}