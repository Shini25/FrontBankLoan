import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientsService } from '../../services/clients.service'; // Assurez-vous que le chemin d'importation est correct
import { Clients } from '../../models/clients.model';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class AddClientComponent implements OnInit {
  clientForm!: FormGroup;

  constructor(private fb: FormBuilder, private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      clientid: [null],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      birthdate: ['', Validators.required],
      balance: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const newClient: Clients = this.clientForm.value;
      this.clientsService.addClient(newClient).subscribe({
        next: (client) => {
          console.log('Client added:', client);
          // Vous pouvez ici rediriger l'utilisateur ou afficher un message de succès
        },
        error: (error) => {
          console.error('Error adding client:', error);
          // Gérer les erreurs ici, par exemple en affichant un message d'erreur
        }
      });
    }
  }
}
