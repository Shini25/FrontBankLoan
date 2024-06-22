import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GuaranteesService } from '../../services/guarantees.service';
import { LoansService } from '../../services/loans.service';
import { Loans } from '../../models/loans.model';

@Component({
  selector: 'app-guarantees',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './guarantees.component.html',
  styleUrls: ['./guarantees.component.css']
})
export class AddGuaranteesComponent implements OnInit {
  guaranteeForm: FormGroup;
  loans: Loans[] = [];

  constructor(private fb: FormBuilder, private guaranteesService: GuaranteesService, private loansService: LoansService) {
    this.guaranteeForm = this.fb.group({
      guaranteeid: [null],
      loanid: [null, Validators.required],
      guaranteetype: ['', Validators.required],
      estimatedvalue: [''],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loansService.getAllLoans().subscribe(loans => {
      this.loans = loans;
    });
  }

  addGuarantee() {
    if (this.guaranteeForm.valid) {
      this.guaranteesService.addGuarantee(this.guaranteeForm.value).subscribe({
        next: (res) => console.log('Guarantee added successfully', res),
        error: (err) => console.error('Error adding guarantee', err)
      });
    }
  }
}