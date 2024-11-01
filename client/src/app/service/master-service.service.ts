import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { APIResponseModel } from '../model/interface/APIResponseModel';

@Injectable({
  providedIn: 'root'
})
export class MasterServiceService {

  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(environment.GET_ALL_PATIENTS_URL);
  }
}
