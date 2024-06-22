import { Component, OnInit } from '@angular/core';
import { GuaranteesService } from '../../services/guarantees.service';
import { Guarantees } from '../../models/guarantees.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-guarantee',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './list-guarantee.component.html',
  styleUrls: ['./list-guarantee.component.css']
})
export class ListGuaranteeComponent implements OnInit {
  displayedColumns: string[] = ['guaranteeid', 'loanid', 'guaranteetype', 'estimatedvalue', 'description'];
  dataSource: Guarantees[] = [];

  constructor(private guaranteesService: GuaranteesService) {}

  ngOnInit(): void {
    this.loadGuarantees();
  }

  loadGuarantees(): void {
    this.guaranteesService.getAllGuarantees().subscribe(guarantees => {
      this.dataSource = guarantees;
    });
  }
}