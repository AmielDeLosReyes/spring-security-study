import { Component } from '@angular/core';
import { PatientNavbarComponent } from "../patient-navbar/patient-navbar.component";
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-patient-management',
  standalone: true,
  imports: [PatientNavbarComponent, NavbarComponent],
  templateUrl: './patient-management.component.html',
  styleUrl: './patient-management.component.css'
})
export class PatientManagementComponent {

}
