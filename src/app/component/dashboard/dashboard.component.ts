import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: any; // Esta variable almacenará los datos recibidos del servidor

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    const url = 'http://159.65.96.86:8080/services/tu-endpoint'; // Reemplaza 'tu-endpoint' por la URL correcta
    const headers = this.authService.getHeaders();

    this.http.get(url, { headers }).subscribe(
      (data) => {
        this.data = data; // Guarda los datos en la variable 'data'
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  regresarALogin() {
    this.router.navigate(['/login']); 
  }
}
