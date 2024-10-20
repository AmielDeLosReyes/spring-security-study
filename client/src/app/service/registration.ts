import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Users } from '../model/interface/user';
import { tap } from 'rxjs/operators'; // <-- Import tap operator

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  register(user: Users): Observable<Users> {
    const url = environment.BASE_URL + environment.REGISTER_USER_URL;
    
    console.log('Sending registration request to URL:', url);
    console.log('Data being sent:', user);

    return this.http.post<Users>(url, user)
      .pipe(
        tap(response => {
          console.log('Response received:', response);
        })
      );
  }
}
