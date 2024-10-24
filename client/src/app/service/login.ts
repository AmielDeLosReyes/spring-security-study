import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Users } from '../model/interface/user';
import { tap } from 'rxjs/operators'; // <-- Import tap operator
import { LoginUser } from '../model/interface/loginUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) { }

    login(user: LoginUser): Observable<any> {
        const url = environment.BASE_URL + environment.LOGIN_USER_URL;
    
        return this.http.post<any>(url, user).pipe(
          tap(response => {
            console.log('Response received:', response);
            // Save the bearer_token to localStorage
            localStorage.setItem('bearer_token', response.bearer_token);
          })
        );
      }

}