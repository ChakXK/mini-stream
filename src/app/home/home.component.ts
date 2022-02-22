import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Output() isLogout = new EventEmitter<void>();
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
  logout() {
    this.authService.logout();
    this.isLogout.emit();
    window.location.href = '/login';
  }
}
