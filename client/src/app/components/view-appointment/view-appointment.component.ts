import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterServiceService } from '../../service/master-service.service';
import { Appointment, APIResponseModel } from '../../model/interface/APIResponseModel';
import { NavbarComponent } from "../navbar/navbar.component";
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  modalService = inject(NgbModal);

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

  // Open the delete confirmation modal
  deleteAppointment(appointmentId: number | undefined) {
    this.appointmentToDelete = appointmentId;
    // Open the modal and pass the appointment ID
    const modalRef = this.modalService.open(DeleteConfirmationModal);
    modalRef.componentInstance.appointmentId = appointmentId;
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

// Modal component for confirmation
@Component({
  selector: 'app-delete-confirmation-modal',
  template: `
    <div class="modal-header">
      <h5 class="modal-title">Confirm Deletion</h5>
      <button type="button" class="close" (click)="modal.dismiss()" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete this appointment?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="modal.dismiss()">Cancel</button>
      <button type="button" class="btn btn-danger" (click)="delete()">Delete</button>
    </div>
  `,
  styles: [`
    .modal-header {
      position: relative;
    }
    .modal-header .close {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 1.5rem;
      color: #000;
      background: none;
      border: none;
    }
    .modal-header .close:hover {
      color: #f00;  /* Optional: color change on hover */
    }
  `]
})

export class DeleteConfirmationModal {
  appointmentId: number | undefined;

  constructor(
    public modal: NgbActiveModal,  // Use NgbActiveModal here instead of NgbModal
    private masterService: MasterServiceService,
    private router: Router
  ) {}

  delete() {
    if (this.appointmentId !== undefined) {
      this.masterService.deleteAppointmentById(this.appointmentId).subscribe({
        next: (response: APIResponseModel) => {
          if (response.result) {
            this.modal.dismiss();  // Close the modal after deletion
            this.router.navigate(['/user-appointments']);  // Navigate after successful deletion
          } else {
            console.error('Failed to delete appointment:', response.message);
          }
        },
        error: (error) => console.error('Error deleting appointment:', error)
      });
    }
  }
}
