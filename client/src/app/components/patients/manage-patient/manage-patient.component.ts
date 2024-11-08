import { Component, inject, OnInit } from '@angular/core';
import { MasterServiceService } from '../../../service/master-service.service';
import { APIResponseModel, IPatient } from '../../../model/interface/APIResponseModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-patient',
  standalone: true,
  imports: [],
  templateUrl: './manage-patient.component.html',
  styleUrl: './manage-patient.component.css'
})
export class ManagePatientComponent implements OnInit {

  masterService = inject(MasterServiceService);

  patientList: IPatient[] = [];
  deletedPatientName: string | null = null; // Variable to store deleted patient's name

  router = inject(Router);

  ngOnInit(): void {
    this.loadAllPatients();
  }

  loadAllPatients() {
    this.masterService.getAllPatients().subscribe(
        (result: APIResponseModel) => {
            console.log('API Response:', result);
            this.patientList = result.data;
        },
        (error) => {
            console.error('Error fetching patients:', error);
        }
    );
}


  onDelete(patientId: number) {
    // Find the patient name before deletion for the alert
    const patient = this.patientList.find(p => p.patientId === patientId);
    if (patient) {
      this.masterService.deletePatient(patientId).subscribe({
        next: () => {
          this.deletedPatientName = patient.name; // Set deleted patient name
          this.loadAllPatients(); // Reload patient list after deletion
          // Hide alert after 3 seconds
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

  onEdit(patient: IPatient) {
    this.router.navigate(['/patient-management/update'], { state: { patient } });
  }

  viewPatientDetails(patientId: number) {
    this.router.navigate(['/patient-management/view', patientId]);
  }


}
