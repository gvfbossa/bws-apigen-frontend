import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDashboard } from '../model/userdashboard.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API_URL = environment.apiUrl + '/api/user/dashboard/info';

  constructor(private http: HttpClient) { }

  getDashboardInfo(): Observable<UserDashboard> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<UserDashboard>(this.API_URL, { headers });
  }
}