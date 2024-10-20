import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Users } from '../../model/interface/user';
import { RegistrationService } from '../../service/registration';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, of, tap } from 'rxjs';



@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  http = inject(HttpClient);

  registrationService = inject(RegistrationService);

  userObj: Users = new Users();
  
  token: string | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isLoading: boolean = false; // Loading state


  constructor() {}

  onSubmit() {
    this.isLoading = true; // Set loading to true when the request starts
    console.log('Submitting user data:', this.userObj);

    this.registrationService.register(this.userObj)
      .pipe(
        tap(response => {
          this.successMessage = "Registration successful";
          console.log('Registration successful:', response);
        }),
        catchError(error => {
          this.errorMessage = "Registration failed";
          console.error('Error during registration:', error);
          return of(null); // Handle the error gracefully
        }),
        finalize(() => {
          this.isLoading = false; // Set loading to false when the request is done
        })
      )
      .subscribe();
  }
}
