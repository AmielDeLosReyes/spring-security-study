import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { first } from 'rxjs';
import { LoginFormComponent } from '../../login-form/login-form.component';
import { RegistrationComponent } from '../registration/registration.component';
import { CommonModule } from '@angular/common';
import { StatesComponent } from '../../states/states.component';
import { DistricComponent } from "../../distric/distric.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, LoginFormComponent, RegistrationComponent, CommonModule, StatesComponent, DistricComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  firstName: string = "Amiel";
  inputType: string = "submit";
  selectedCity: string = '';

  currentComponent: string = "";

  showWelcomeAlert(firstName: string) {
    alert("Welcome " + firstName);
  }

  changeTab(tabName: string) {
    this.currentComponent = tabName;
  }

}
