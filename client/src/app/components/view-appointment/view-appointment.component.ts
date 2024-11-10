import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterServiceService } from '../../service/master-service.service';
import { Appointment, APIResponseModel } from '../../model/interface/APIResponseModel';
import { NavbarComponent } from "../navbar/navbar.component";
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


interface Patient {
  patientId: number;
  name: string;
  mobileNo: string;
  city: string;
  age: number;
  gender: string;
}

@Component({
  selector: 'app-view-appointment',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {

  appointmentData: Appointment | null = null;
  patientData: Patient | null = null;
  masterService = inject(MasterServiceService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  // modalService = inject(NgbModal);
  
  // New property to manage alert visibility
  showAlert: boolean = false;
  appointmentToDelete: number | undefined;  // Holds appointment ID to delete


  ngOnInit(): void {
    const appointmentId = this.route.snapshot.params['id'];
    this.getAppointmentDetails(appointmentId);
  }

  getAppointmentDetails(appointmentId: number): void {
    this.masterService.getSingleAppointment(appointmentId).subscribe({
      next: (response) => {
        if (response.result) {
          this.appointmentData = response.data;
          this.getPatientDetails(this.appointmentData!.patientId);
        }
      },
      error: (error) => console.error('Error fetching appointment details:', error)
    });
  }
  
  getPatientDetails(patientId: number): void {
    this.masterService.getSinglePatient(patientId).subscribe({
      next: (response) => {
        if (response.result) {
          this.patientData = response.data;
        }
      },
      error: (error) => console.error('Error fetching patient details:', error)
    });
  }

  goBack(): void {
    this.router.navigate(['/user-appointments']);
  }

  markAsDone(appointmentId: number | undefined): void {
    if (appointmentId !== undefined) {
      this.masterService.markAppointmentAsDone(appointmentId).subscribe({
        next: (response: APIResponseModel) => {
          if (response.result) {
            if (this.appointmentData && this.appointmentData.appointmentId === appointmentId) {
              this.appointmentData.isDone = true; // Mark the appointment as done locally
              console.log('Marked appointment ID as done:', appointmentId);
              this.showAlert = true; // Show the alert

              // Hide the alert after 2 seconds
              setTimeout(() => {
                this.showAlert = false;
              }, 2000);
            }
          } else {
            console.error('Failed to mark appointment as done:', response.message);
          }
        },
        error: (error) => console.error('Error marking appointment as done:', error)
      });
    }
  }

  deleteAppointment(appointmentId: number | undefined) {
    this.appointmentToDelete = appointmentId;
    // Show the modal (Bootstrap 5)
    const modal = new (window as any).bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
    modal.show();
  }

  confirmDelete() {
    if (this.appointmentToDelete !== undefined) {
      this.masterService.deleteAppointmentById(this.appointmentToDelete).subscribe({
        next: (response: APIResponseModel) => {
          if (response.result) {
            this.router.navigate(['/user-appointments']);  // Navigate back after successful deletion
          } else {
            console.error('Failed to delete appointment:', response.message);
          }
        },
        error: (error) => console.error('Error deleting appointment:', error)
      });
    }
  }
}
