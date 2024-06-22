import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeesService } from '../../services/employees.service';
import { Employees } from '../../models/employees.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder, private employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      position: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const newEmployee: Employees = this.employeeForm.value;
      this.employeesService.addEmployee(newEmployee).subscribe({
        next: (employee) => {
          console.log('Employee added:', employee);
        },
        error: (error) => {
          console.error('Error adding employee:', error);
        }
      });
    }
  }
}
