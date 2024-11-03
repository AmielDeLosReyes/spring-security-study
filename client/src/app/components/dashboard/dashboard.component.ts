import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { MasterServiceService } from '../../service/master-service.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, RouterLinkActive, RouterLink, NavbarComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  dashboardData: {
    totalPatients: number;
    totalAppointments: number;
    todaysTotalAppointments: number;
    todaysTotalDoneAppointments: number;
  } | null = null;

  masterService = inject(MasterServiceService);
  currentDate: Date = new Date();

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData() {
    this.masterService.getDashboardData().subscribe({
      next: (response) => {
        if (response.result) {
          this.dashboardData = response.data[0];
        }
      },
      error: (error) => console.error('Error fetching dashboard data:', error)
    });
  }

}
