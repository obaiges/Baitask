import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-home',
  imports: [MatMenuModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private authService: AuthService
  ) { }

  logout() {
    console.log("Logout")
    this.authService.logout();
  }

  getIniciales() {
    return this.authService.getUsername()!.substring(0, 2);
  }

}
