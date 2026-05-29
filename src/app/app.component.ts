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
export class AppComponent { //implements OnInit
  title = 'bws-apigen';

//  const gtagScript = document.createElement('script');
//    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-07NRLGNXVQ';
//    gtagScript.async = true;
//    document.head.appendChild(gtagScript);
//
//    window.dataLayer = window.dataLayer || [];
//    window.gtag = function () { window.dataLayer.push(arguments); };
//
//    window.gtag('js', new Date());
//    window.gtag('config', 'G-07NRLGNXVQ', {
//      cookie_flags: 'SameSite=None;Secure',
//      cookie_domain: 'recebefacil.bossawebsolutions.com.br'
//    });
//
//    this.router.events.pipe(
//      filter(event => event instanceof NavigationEnd)
//    ).subscribe((event: any) => {
//      window.gtag('event', 'page_view', {
//        page_path: event.urlAfterRedirects,
//        page_title: document.title,
//        page_location: window.location.href
//      });
//    });
//
//  }

//  ngOnInit() {
//    window.addEventListener('beforeinstallprompt', (event: any) => {
//      event.preventDefault();
//      this.pwaService.setPrompt(event);
//    });
//
//    window.addEventListener('appinstalled', () => {
//      console.log('PWA instalado 🎉');
//    });
//  }

}
