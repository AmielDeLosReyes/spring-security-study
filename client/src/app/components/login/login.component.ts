import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../service/login';
import { LoginUser } from '../../model/interface/loginUser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  http = inject(HttpClient);
  loginService = inject(LoginService);
  router = inject(Router);

  userObj: LoginUser = { email: '', password: '' };
  
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isLoading: boolean = false; // Loading state

  constructor() {}

  onSubmit() {
    this.isLoading = true; // Set loading to true when the request starts
    console.log('Submitting login data:', this.userObj);

    this.loginService.login(this.userObj)
      .pipe(
        tap(response => {
          this.successMessage = "Login successful";
          console.log('Login successful:', response);

          // Store the token in localStorage
          if (response && response.bearer_token) {
            localStorage.setItem('token', response.bearer_token);
          }

          // Redirect to user landing page after successful login
          this.router.navigate(['/user-landing-page']);

          // Clear success message after 3 seconds
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
        }),
        catchError(error => {
          this.errorMessage = "Login failed";
          console.error('Error during login:', error);

          // Clear error message after 3 seconds
          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);
          return of(null); // Handle the error gracefully
        }),
        finalize(() => {
          this.isLoading = false; // Set loading to false when the request is done
        })
      )
      .subscribe();
  }
}
