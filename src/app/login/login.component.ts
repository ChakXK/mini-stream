import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title = 'mini-stream';
  isSignedIn = false;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
    }
  }
  async onSignIn(email: string, password: string) {
    await this.authService.signIn(email, password);
    if(this.authService.isLoggedIn) {
      this.isSignedIn = true;
      window.location.href = '/profile';
    }
  }
}
