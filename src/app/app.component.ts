import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { LoansService } from './services/loans.service'; // Assurez-vous que le chemin est correct
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatBadgeModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FrontBankLoan';
  pendingLoansCount: number = 0;

  constructor(private authService: AuthService, private router: Router, private loansService: LoansService) {}

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.getPendingLoansCount();
    } else {
      this.router.navigate(['/login']);
    }
  }

  getPendingLoansCount() {
    this.loansService.getPendingLoans().subscribe(loans => {
      this.pendingLoansCount = loans.length;
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
