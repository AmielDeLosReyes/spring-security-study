import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  router = inject(Router);

onLogout() {
  this.router.navigateByUrl("/login");
  localStorage.removeItem('token');
  localStorage.removeItem('bearer_token');
}


logout() {
  throw new Error('Method not implemented.');
}

}
