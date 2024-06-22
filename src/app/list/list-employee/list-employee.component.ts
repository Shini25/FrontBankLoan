import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { Employees } from '../../models/employees.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-employee',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'position', 'email', 'phone'];
  dataSource: Employees[] = [];

  constructor(private employeesService: EmployeesService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeesService.getAllEmployees().subscribe(employees => {
      this.dataSource = employees;
    });
  }
}