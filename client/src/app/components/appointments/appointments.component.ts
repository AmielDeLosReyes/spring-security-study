import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterServiceService } from '../../service/master-service.service';
import { Appointment, APIResponseModel } from '../../model/interface/APIResponseModel';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [RouterLink, RouterModule, RouterLinkActive, NavbarComponent, FormsModule, CommonModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  masterService = inject(MasterServiceService);
  appointments: Appointment[] = []; // All appointments fetched from the API
  filteredAppointments: Appointment[] = []; // Appointments after applying filters
  router = inject(Router);

  searchName: string = ''; 
  searchDate: string | null = null; 
  showAlert: boolean = false;

  ngOnInit(): void {
    this.getAllAppointments(); // Fetch appointments when the component initializes
  }

  getAllAppointments() {
    this.masterService.getAllAppointments().subscribe({
      next: (response) => {
        if (response.result) {
          this.appointments = response.data;
          
          // Sort appointments by appointmentDate in descending order
          this.appointments.sort((a, b) => {
            const dateA = new Date(a.appointmentDate).getTime();
            const dateB = new Date(b.appointmentDate).getTime();
            return dateB - dateA; // For descending order
          });

          // Apply initial filters (if any)
          this.applyFilters();
        }
      },
      error: (error) => console.error('Error fetching appointments:', error)
    });
  }

  // Apply filters based on searchName and searchDate

  applyFilters() {
    this.filteredAppointments = this.appointments.filter(appointment => {
      const matchesName = appointment.name?.toLowerCase().includes(this.searchName.toLowerCase());
  
      // Extract only the date part from appointmentDate for comparison
      const appointmentDate = appointment.appointmentDate.split('T')[0];
      const matchesDate = !this.searchDate || appointmentDate === this.searchDate;
  
      return matchesName && matchesDate;
    });
  }
  

  viewDetails(appointmentId: number) {
    this.router.navigate(['/user-appointment', appointmentId]);
  }

  markAsDone(appointmentId: number | undefined): void {
    if (appointmentId !== undefined) {
      this.masterService.markAppointmentAsDone(appointmentId).subscribe({
        next: (response: APIResponseModel) => {
          if (response.result) {
            const appointment = this.appointments.find(app => app.appointmentId === appointmentId);
            if (appointment) {
              appointment.isDone = true; // Mark the appointment as done locally
              console.log('Marked appointment ID as done:', appointmentId);
              this.showAlert = true; // Show the alert

              // Hide the alert after 2 seconds
              setTimeout(() => {
                this.showAlert = false;
              }, 2000);
              
              // Reapply filters to reflect the updated status
              this.applyFilters();
            }
          } else {
            console.error('Failed to mark appointment as done:', response.message);
          }
        },
        error: (error) => console.error('Error marking appointment as done:', error)
      });
    }
  }
}
