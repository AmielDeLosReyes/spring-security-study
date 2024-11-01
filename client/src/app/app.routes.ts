import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserLandingPageComponent } from './components/user-landing-page/user-landing-page.component';
import { authGuard } from './guards/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientManagementComponent } from './components/patient-management/patient-management.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';

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
        path: 'user-landing-page', // New route for User Landing Page
        component: UserLandingPageComponent,
        canActivate: [authGuard] // Protect this route with AuthGuard
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
        path: 'patient-management', 
        component: PatientManagementComponent,
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
    }
    // {
    //     path: '',
    //     component: LayoutComponent,
    //     children: [
    //         {
    //             path: 'user-landing-page',
    //             component: LandingPageComponent
    //         }
    //     ]
    // }
];
