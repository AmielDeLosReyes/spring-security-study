import { Component, inject } from '@angular/core';
import { MasterServiceService } from '../../../service/master-service.service';
import { Router } from '@angular/router';
import { IPatient } from '../../../model/interface/APIResponseModel';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css'
})
export class AddPatientComponent {

  masterService = inject(MasterServiceService);
  router = inject(Router);
  location = inject(Location);

  successMessage: string | null = null;
  
  // Create a new patient object
  newPatient: IPatient = {
    patientId: 0, // Assuming patientId is auto-generated
    name: '',
    mobileNo: '',
    city: '',
    age: 0,
    gender: ''
  };

  addPatient() {
    this.masterService.addPatient(this.newPatient).subscribe({
      next: (response) => {
        this.successMessage = 'Patient added successfully!';
        setTimeout(() => {
          this.successMessage = null;
          this.router.navigate(['/patient-management/list']); // Redirect to the patient list page
        }, 3000); // Fades out after 3 seconds and navigates back
      },
      error: (err) => {
        console.error('Error adding patient:', err);
        alert('Error adding patient');
      }
    });
  }

}
