import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { MainContentComponent } from "../main-content/main-content.component";

@Component({
  selector: 'app-user-landing-page',
  standalone: true,
  imports: [NavbarComponent, MainContentComponent],
  templateUrl: './user-landing-page.component.html',
  styleUrl: './user-landing-page.component.css'
})
export class UserLandingPageComponent {

}
