import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { APIResponseModel, IPatient } from '../model/interface/APIResponseModel';

@Injectable({
  providedIn: 'root'
})
export class MasterServiceService {

  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(environment.GET_ALL_PATIENTS_URL);
  }

  editPatient(patient: IPatient): Observable<APIResponseModel> {
    return this.http.put<APIResponseModel>(environment.UPDATE_PATIENT_URL, patient);
  }

  deletePatient(patientId: number): Observable<APIResponseModel> {
    const deleteUrl = `${environment.DELETE_PATIENT_URL}?patientId=${patientId}`;
    console.log(`Attempting to delete patient at URL: ${deleteUrl}`); // Log the URL
    return this.http.delete<APIResponseModel>(deleteUrl);
}

  
}
