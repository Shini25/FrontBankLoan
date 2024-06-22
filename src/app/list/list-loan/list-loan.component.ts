import { Component, OnInit } from '@angular/core';
import { LoansService } from '../../services/loans.service';
import { Loans } from '../../models/loans.model'; // Assurez-vous que le modèle est correctement défini
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-loan',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './list-loan.component.html',
  styleUrls: ['./list-loan.component.css']
})
export class ListLoanComponent implements OnInit {
  displayedColumns: string[] = ['loanid', 'clientid', 'amount', 'interestrate', 'durationmonths', 'startdate', 'loantype', 'status'];
  dataSource: Loans[] = [];

  constructor(private loansService: LoansService) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loansService.getAllLoans().subscribe(loans => {
      this.dataSource = loans;
    });
  }
}