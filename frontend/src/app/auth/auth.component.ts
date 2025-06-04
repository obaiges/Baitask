import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {

  password?: string;
  username?: string;

  email?: string;
  passwordR?: string;

  login = true;

  hidePassword: boolean = true;

  constructor(
    private authService: AuthService
  ) { }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  swapLogin() {
    const left = document.getElementById("left")!;
    const right = document.getElementById("right")!;

    if (this.login) {
      // Mover a la derecha
      left.style.transform = 'translateX(100%)';
      right.style.transform = 'translateX(-100%)';
    } else {
      left.style.transform = 'translateX(0)';
      right.style.transform = 'translateX(0)';
    }

    this.login = !this.login;
  }

  logearme() {
    if (!this.username || !this.password) return;
    let body = {
      name: this.username!,
      password: this.password!
    }
    this.authService.login(body.name, body.password).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err)
    });
  }

  registrarse() {
    if (!this.email || !this.passwordR) return;
    let body = {
      email: this.email!,
      password: this.passwordR!
    }
    this.authService.register(body.email, body.password).subscribe({});
  }


}
