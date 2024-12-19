

import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Corrected property name
})
export class DashboardComponent {

  prompt: string = '';
  chatHistory: { from: string; message: string }[] = []; // Ensure chatHistory has the correct type
  loading: boolean = false; // Loading state

  constructor(private auth: AuthService) {
    // Subscribe to message history
    
  }

  logout() {
    this.auth.logout();
  }

  

}