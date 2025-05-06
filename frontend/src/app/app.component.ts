import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'frontend';

  mensaje = '';

  constructor(
    private http: HttpClient
  ){}

  ngOnInit(): void {
    this.http.get<{mensaje: string}>('http://localhost:3000/api/saludo').subscribe(res => {
      this.mensaje = res.mensaje;
    });
  }
  
}
