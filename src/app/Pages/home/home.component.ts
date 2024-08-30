import { Component } from '@angular/core';
import { LoginComponent } from 'src/app/Pages/login/login.component';

@Component({
  selector: 'app-all-crop',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showLogin: boolean = false;

  toggleLogin() {
    this.showLogin = !this.showLogin;
    console.log('showLogin:', this.showLogin);
  }
  
}
