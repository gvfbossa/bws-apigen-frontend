import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-installation',
  standalone: true,
  imports: [],
  templateUrl: './installation.component.html',
  styleUrl: './installation.component.scss'
})
export class InstallationComponent {

  readonly downloadsUrl = environment.apiUrl + '/api/downloads';

}
