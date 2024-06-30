import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clients } from '../models/clients.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiUrl = 'http://localhost:3000/clients'; // URL de l'API

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': token || ''
    });
  }

  // Récupérer tous les clients
  getAllClients(): Observable<Clients[]> {
    return this.http.get<Clients[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // Récupérer un client par ID
  getClientById(id: number): Observable<Clients> {
    return this.http.get<Clients>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Ajouter un nouveau client
  addClient(client: Clients): Observable<Clients> {
    return this.http.post<Clients>(this.apiUrl, client, { headers: this.getAuthHeaders() });
  }

  // Mettre à jour un client
  updateClient(client: Clients): Observable<Clients> {
    return this.http.put<Clients>(`${this.apiUrl}/${client.clientid}`, client, { headers: this.getAuthHeaders() });
  }

  // Supprimer un client
  deleteClient(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Rechercher des clients par prénom ou nom de famille
  searchClientsByFirstNameOrLastName(searchText: string): Observable<Clients[]> {
    return this.http.get<Clients[]>(`${this.apiUrl}/search?searchText=${searchText}`, { headers: this.getAuthHeaders() });
  }
}
