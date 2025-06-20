import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) { }


  private readonly API_BASE_URL = 'http://192.168.0.30:3000/api';

  endpoint = 'auth';  // sin slash inicial, para concatenar fácil

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.API_BASE_URL}/${this.endpoint}/login`, { username, password }).pipe(
    tap(response => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', username);
      }
    })
  );
  }

  checkRegistrer(email: string, password: string) {
    return this.http.post<any[]>(`${this.API_BASE_URL}/${this.endpoint}/checkRegistrer`, { email, password });
  }

  checkUsername(username: string) {
    return this.http.post<any[]>(`${this.API_BASE_URL}/${this.endpoint}/checkUsername`, { username });
  }

  register(email: string, password: string, name: string) {
    return this.http.post<any[]>(`${this.API_BASE_URL}/${this.endpoint}/register`, { email, password, name });
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.router.navigate(['/login']);
    }
  }
  getUsername(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('username');
    }
    return null;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}