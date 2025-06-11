import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean | UrlTree {
    const isAuth = this.authService.isAuthenticated();
    
    if (isAuth) {
      return true;
    } else {
      // Redirección inmediata sin retardo
      return this.router.parseUrl('/login');
    }
  }
}