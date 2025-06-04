import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

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
    return this.http.post<any[]>(`${this.API_BASE_URL}/${this.endpoint}/login`, { username, password });
  }

  register(email: string, password: string) {
    return this.http.post<any[]>(`${this.API_BASE_URL}/${this.endpoint}/register`, { email, password });
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }
}