import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {

  password?: string;
  username?: string;

  email?: string;
  passwordR?: string;
  name?: string;

  login = true;

  hidePassword: boolean = true;
  showName: boolean = false;
  comprobandoUsername: boolean = false;
  alreadyExists: boolean = false;
  private usernameSubject = new Subject<string>();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usernameSubject
      .pipe(debounceTime(500)) // espera 500ms después de que deje de escribir
      .subscribe((value) => {
        this.checkUsername(value);
      });
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  swapLogin() {
    const left = document.getElementById("left")!;
    const right = document.getElementById("right")!;

    if (this.login) {
      this.showName = false;
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


  comprueboRegistro() {
    return this.authService.checkRegistrer(this.email!, this.passwordR!).subscribe({
      next: () => {
        this.showName = true
      },
      error: (err) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom",
          showConfirmButton: false,
          timer: 2000,
        })
        return Toast.fire({
          icon: "error",
          title: err.error.error,
        });
      }
    });
  }

  comprobarUsername() {
    if (!this.name) return;
    this.comprobandoUsername = true;
    this.alreadyExists = false;
    this.usernameSubject.next(this.name);
  }

  private checkUsername(name: string) {
    this.authService.checkUsername(name).subscribe({
      next: () => {
        this.comprobandoUsername = false;
        this.alreadyExists = false;
      },
      error: (err) => {
        this.comprobandoUsername = false;
        if (err.status === 409) {
          this.alreadyExists = true;
        }
      }
    });
  }

  registrarse() {
    if(this.email == null || this.passwordR == null || this.name == null) return;
    this.authService.register(this.email, this.passwordR, this.name).subscribe({
      next: () => {
        
      },
      error: (err) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom",
          showConfirmButton: false,
          timer: 2000,
        })
        return Toast.fire({
          icon: "error",
          title: err.error.error,
        });
      }
    });
  }

}
