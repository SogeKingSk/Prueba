import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const usernameControl = this.loginForm.get('username');
      const passwordControl = this.loginForm.get('password');
  
      if (usernameControl && passwordControl) {
        const username = usernameControl.value;
        const password = passwordControl.value;
  
        this.authService.login(username, password).subscribe(
          (respuesta: any) => {
            const accessToken = respuesta['accessToken'] as string;
            if (accessToken) {
              localStorage.setItem('accessToken', accessToken);
              this.router.navigate(['/dashboard']);
            } else {
              console.error('La respuesta del servidor no contiene un token de acceso.');
            }
          },
          (error) => {
            console.error('Error al autenticar:', error);
          }
        );
      }
    }
  }
}
