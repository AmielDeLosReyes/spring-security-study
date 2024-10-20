import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        // landing page if blank string
        path: '',
        component: LoginComponent
    }, 
    {
        
        path: 'login-form',
        component: LoginFormComponent
    },  
];


