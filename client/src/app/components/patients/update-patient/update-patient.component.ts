import { Component, inject, OnInit } from '@angular/core';
import { MasterServiceService } from '../../../service/master-service.service';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-patient',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-patient.component.html',
  styleUrl: './update-patient.component.css'
})
export class UpdatePatientComponent implements OnInit{

  patient = history.state.patient;
  loading = true;
  successMessage: string | null = null;

  router = inject(Router);


  ngOnInit(): void {
    if (this.patient) {
      this.loading = false;
    } else {
      // If no patient is available in history, you may want to handle this case (e.g., navigate back)
      alert('No patient data available');
      this.location.back();
    }
  }

  masterService = inject(MasterServiceService);
  location = inject(Location);

  updatePatient() {
    this.masterService.editPatient(this.patient).subscribe({
      next: () => {
        this.successMessage = 'Patient updated successfully!';
        setTimeout(() => {
          this.successMessage = null;
          this.router.navigate(['/patient-management/list']); // Redirect to the patient list page
        }, 3000); // Fades out after 3 seconds and navigates back
      },
      error: (err) => {
        alert('Error updating patient');
        console.error(err);
      }
    });
  }
  

}
