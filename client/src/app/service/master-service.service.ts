import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { APIResponseModel, IPatient } from '../model/interface/APIResponseModel';

@Injectable({
  providedIn: 'root'
})
export class MasterServiceService {
  addPatient(newPatient: IPatient) {
    return this.http.post<APIResponseModel>(environment.ADD_PATIENT_URL, newPatient);
  }

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

  getDashboardData(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(environment.DASHBOARD_DATA_URL);
  }
  
  getAllAppointments(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(environment.GET_ALL_APPOINTMENTS_URL);
  }

  getSingleAppointment(appointmentId: number): Observable<APIResponseModel> {
    const getAppointmentUrl = `${environment.GET_SINGLE_APPOINTMENT_URL}?appointmentId=${appointmentId}`;
    console.log(`Attempting to fetch patient appointment at URL: ${getAppointmentUrl}`);
    return this.http.get<APIResponseModel>(getAppointmentUrl);
  }

  getSinglePatient(patientId: number): Observable<APIResponseModel> {
    const getPatientUrl = `${environment.GET_SINGLE_PATIENT_URL}?patientId=${patientId}`;
    console.log(`Attempting to fetch patient at URL: ${getPatientUrl}`);
    return this.http.get<APIResponseModel>(getPatientUrl);
  }

  markAppointmentAsDone(appointmentId: number): Observable<APIResponseModel> {
    const markAppointmentAsDoneUrl = `${environment.MARK_APPTMNT_AS_DONE_URL}?appointmentId=${appointmentId}`;
    console.log(`Attempting to mark appointment ${appointmentId} as don at URL: ${markAppointmentAsDoneUrl}`);
    return this.http.get<APIResponseModel>(markAppointmentAsDoneUrl);
  }

  deleteAppointmentById(appointmentId: number): Observable<APIResponseModel> {
    const deleteSingleAppointmentUrl = `${environment.DELETE_SINGLE_APPOINTMENT_URL}?appointmentId=${appointmentId}`;
    console.log(`Attempting to delete appointment ${appointmentId} at URL: ${deleteSingleAppointmentUrl}`);
    return this.http.delete<APIResponseModel>(deleteSingleAppointmentUrl);
  }
  
}
