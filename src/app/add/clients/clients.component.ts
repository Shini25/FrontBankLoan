import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { Clients } from '../../models/clients.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatIconModule, 
    MatSnackBarModule, 
    MatProgressSpinnerModule,
    CommonModule
  ]
})
export class AddClientComponent implements OnInit {
  clientForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder, 
    private clientsService: ClientsService, 
    private snackBar: MatSnackBar, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      clientid: [null],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      birthdate: ['', Validators.required],
      balance: [0, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.isLoading = true;
      const newClient: Clients = this.clientForm.value;
      this.clientsService.addClient(newClient).subscribe({
        next: (client) => {
          console.log('Client added:', client);
          this.snackBar.open('Client added successfully!', 'Close', {
            duration: 3000,
          });
          setTimeout(() => {
            this.router.navigate(['/add-loan']);
            this.isLoading = false;
          }, 1000);
        },
        error: (error) => {
          console.error('Error adding client:', error);
          this.snackBar.open('Error adding client', 'Close', {
            duration: 3000,
          });
          this.isLoading = false;
        }
      });
    }
  }

  onClear(): void {
    this.clientForm.reset();
  }
}
