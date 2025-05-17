import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {

  password?: string;

  login = true;

  hidePassword: boolean = true;

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  swapLogin() {
    const left = document.getElementById("left")!;
    const right = document.getElementById("right")!;
    const textHeader = document.getElementById("textHeader")!;

    if (this.login) {
      // Mover a la derecha
      left.style.transform = 'translateX(100%)';
      right.style.transform = 'translateX(-100%)';
    } else {
      left.style.transform = 'translateX(0)';
      right.style.transform = 'translateX(0)';
    }
    textHeader.style.opacity = '0';
    setTimeout(() => {
      textHeader.textContent = this.login ? "Iniciar sesión" : "Registrarse";
      textHeader.style.opacity = '1';
    }, 300); // Espera a que termine el fade out

    this.login = !this.login;
  }


}
