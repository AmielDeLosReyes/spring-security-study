import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserLandingPageComponent } from './user-landing-page/user-landing-page.component';
import { authGuard } from './guards/auth.guard';

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
