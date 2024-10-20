import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

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
    }
    // {
    //     path: '',
    //     component: LayoutComponent,
    //     children: [
    //         {
    //             path: 'landing-page',
    //             component: LandingPageComponent
    //         }
    //     ]
    // }
];
