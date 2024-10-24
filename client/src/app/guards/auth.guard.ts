import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../app/service/authService'; // Adjust the path as necessary
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken(); // Adjust this method based on your AuthService implementation

  if (token && authService.isTokenValid(token)) {
    return true; // Allow access
  } else {
    router.navigate(['/login']); // Redirect to login if token is invalid or absent
    return false; // Prevent access
  }
};
