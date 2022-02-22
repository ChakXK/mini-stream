import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import User from '../models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userEmail = '';
  userData: User = { name: '', age: 0, id: ''};
  @Output() isLogout = new EventEmitter<void>();
  constructor(public authService: AuthService) {
    this.userEmail = authService.userEmail;
    authService.getInfo().subscribe((data) => {
      this.userData = data;
    });
  }

  ngOnInit(): void {}
  logout() {
    this.authService.logout();
    this.isLogout.emit();
  }
  onSave() {
    this.authService.updateProfile(this.userData);
  }
}
