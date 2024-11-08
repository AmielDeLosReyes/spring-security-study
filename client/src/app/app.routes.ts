import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserLandingPageComponent } from './components/user-landing-page/user-landing-page.component';
import { authGuard } from './guards/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientManagementComponent } from './components/patients/patient-management/patient-management.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { PatientNavbarComponent } from './components/patients/patient-navbar/patient-navbar.component';
import { AddPatientComponent } from './components/patients/add-patient/add-patient.component';
import { UpdatePatientComponent } from './components/patients/update-patient/update-patient.component';
import { ManagePatientComponent } from './components/patients/manage-patient/manage-patient.component';
import { ViewAppointmentComponent } from './components/view-appointment/view-appointment.component';
import { ViewPatientComponent } from './components/patients/view-patient/view-patient.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: 'user-landing-page',
        component: UserLandingPageComponent,
        canActivate: [authGuard]
    },
    {
        path: 'navbar',
        component: NavbarComponent,
        canActivate: [authGuard]
    },
    {
        path: 'main-content',
        component: MainContentComponent,
        canActivate: [authGuard]
    },
    {
        path: 'user-dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'user-appointments',
        component: AppointmentsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'user-reports',
        component: ReportsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'user-settings',
        component: SettingsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'user-appointment/:id', 
        component: ViewAppointmentComponent,
        canActivate: [authGuard]
    },
    {
        path: 'patient-management',
        component: PatientManagementComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'add',
                component: AddPatientComponent // Component for adding a patient
            },
            {
                path: 'list',
                component: ManagePatientComponent // Component for adding a patient
            },
            {
                path: 'update',
                component: UpdatePatientComponent // Component for updating a patient
            },
            {
                path: 'view/:patientId', // Add route for viewing a single patient
                component: ViewPatientComponent // Component for viewing a patient's details
            },
            {
                path: '', 
                redirectTo: 'patient-management', 
                pathMatch: 'full' // Ensure it matches exactly
            }
        ]
    }
];
