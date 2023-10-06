import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { AuthGuard } from './auth.guard';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  private apiUrl = 'http://159.65.96.86:8080/services/auth/signin';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(this.apiUrl, { username, password });
  }

  saveToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  getHeaders() {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return headers;
  }

  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken; // Devuelve true si accessToken no es null o undefined
  }

}
