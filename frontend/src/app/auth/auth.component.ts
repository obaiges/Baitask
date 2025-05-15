import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [ FormsModule ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {

  password?: string;

  hidePassword: boolean = true;

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }


}
