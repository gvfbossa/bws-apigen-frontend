import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../model/user.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const data = localStorage.getItem('bws_user');
    if (data) this.userSubject.next(JSON.parse(data));
  }

  private saveUser(user: User) {
    localStorage.setItem('bws_user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  register(payload: { name: string; email: string; password: string; plan: string; paymentMethodId: string }) {
    return this.http.post(`${environment.apiUrl}/auth/register`, payload, {
      responseType: 'text'
    });
  }

  login(payload: { email: string; password: string, machineHash: string | null }) {
    return this.http.post<User>(`${environment.apiUrl}/auth/login-web`, payload)
      .pipe(tap(user => this.saveUser(user)));
  }

  logout() {
    localStorage.removeItem('bws_user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  getToken(): string | null {
    return this.userSubject.value?.token || null;
  }


  changePassword(currentPassword: string, newPassword: string) {
    const token = localStorage.getItem('bws_user')
      ? JSON.parse(localStorage.getItem('bws_user')!)?.token
      : null;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<void>(
      `${environment.apiUrl}/auth/change-password`,
      { currentPassword, newPassword },
      { headers }
    );
  }

  cancelSubscription() {
    const token = localStorage.getItem('bws_user')
      ? JSON.parse(localStorage.getItem('bws_user')!)?.token
      : null;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<void>(
      `${environment.apiUrl}/auth/cancel-subscription`,
      {},
      { headers }
    );
  }
}