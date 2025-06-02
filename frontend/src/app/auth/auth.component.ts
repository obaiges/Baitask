import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {

  password?: string;
  username?: string;

  login = true;

  hidePassword: boolean = true;

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
    let body = {
      name: this.username,
      password: this.password
    }
    fetch('http://192.168.0.32:8080/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }


}
