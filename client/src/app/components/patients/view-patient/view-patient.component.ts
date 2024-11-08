import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterServiceService } from '../../../service/master-service.service';
import { APIResponseModel } from '../../../model/interface/APIResponseModel';

interface Patient {
  patientId: number;
  name: string;
  mobileNo: string;
  city: string;
  age: number;
  gender: string;
}

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit {
  patientData: Patient | null = null;
  isLoading: boolean = true;
  deletedPatientName: string | null = null;

  route = inject(ActivatedRoute);
  router = inject(Router);
  masterService = inject(MasterServiceService);

  ngOnInit(): void {
    const patientId = Number(this.route.snapshot.paramMap.get('patientId'));
    this.getPatientDetails(patientId);
  }

  getPatientDetails(patientId: number): void {
    this.masterService.getSinglePatient(patientId).subscribe({
      next: (response) => {
        if (response.result) {
          this.patientData = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching patient details:', error);
        this.isLoading = false;
      }
    });
  }

  onDelete(patientId: number): void {
    if (this.patientData) {
      this.masterService.deletePatient(patientId).subscribe({
        next: () => {
          this.deletedPatientName = this.patientData?.name ?? null; // Ensures it’s either a string or null
          this.patientData = null;
          setTimeout(() => {
            this.deletedPatientName = null;
          }, 8000);
        },
        error: (err) => {
          console.error('Error deleting patient:', err);
        }
      });
    }
  }
  

  onEdit(patient: Patient): void {
    this.router.navigate(['/patient-management/update'], { state: { patient } });
  }
}
