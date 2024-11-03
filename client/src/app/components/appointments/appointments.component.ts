import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterServiceService } from '../../service/master-service.service';

interface Appointment {
  appointmentDate: string;
  appointmentId: number;
  appointmentTime: string;
  isFirstVisit: boolean;
  naration: string | null;
  name: string;
  patientId: number;
  mobileNo: string;
  isDone: boolean;
  appointmentNo: number;
}

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [RouterLink, RouterModule, RouterLinkActive, NavbarComponent, FormsModule, CommonModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit {

  masterService = inject(MasterServiceService);
  appointments: Appointment[] = []; // Array to hold the appointments

  ngOnInit(): void {
    this.getAllAppointments(); // Fetch appointments when the component initializes
  }

  getAllAppointments() {
    this.masterService.getAllAppointments().subscribe({
      next: (response) => {
        if (response.result) {
          this.appointments = response.data;
        }
      },
      error: (error) => console.error('Error fetching appointments:', error)
    });
  }

  viewDetails(appointmentId: number) {
    console.log('Viewing details for appointment ID:', appointmentId);
    // Navigate to a details page or display a modal
    // Example navigation:
    // this.router.navigate(['/appointments', appointmentId]);
  }

  markAsDone(appointmentId: number) {
    // Update the `isDone` status locally
    const appointment = this.appointments.find(app => app.appointmentId === appointmentId);
    if (appointment) {
      appointment.isDone = true; // Mark the appointment as done locally
      console.log('Marked appointment ID as done:', appointmentId);
      // Optionally, make an API call to update the appointment status in the backend
    }
  }
}
