import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private readonly API_URL = environment.apiUrl + '/api/downloads';

  constructor(private http: HttpClient) { }

  getCliInstaller(fileName: string): Observable<Blob> {
    return this.http.get(
      `${this.API_URL}/${fileName}`,
      {
        responseType: 'blob'
      }
    );
  }

}