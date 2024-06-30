import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guarantees } from '../models/guarantees.model';

@Injectable({
  providedIn: 'root'
})
export class GuaranteesService {
  private apiUrl = 'http://localhost:3000/guarantees'; // URL de l'API

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': token || ''
    });
  }

  // Récupérer toutes les garanties
  getAllGuarantees(): Observable<Guarantees[]> {
    return this.http.get<Guarantees[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // Récupérer une garantie par ID
  getGuaranteeById(id: number): Observable<Guarantees> {
    return this.http.get<Guarantees>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Ajouter une nouvelle garantie
  addGuarantee(guarantee: Guarantees): Observable<Guarantees> {
    return this.http.post<Guarantees>(this.apiUrl, guarantee, { headers: this.getAuthHeaders() });
  }

  // Mettre à jour une garantie
  updateGuarantee(id: number, guarantee: Guarantees): Observable<Guarantees> {
    return this.http.put<Guarantees>(`${this.apiUrl}/${id}`, guarantee, { headers: this.getAuthHeaders() });
  }

  // Supprimer une garantie
  deleteGuarantee(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Rechercher des garanties par loan ID
  getGuaranteesByLoanId(loanid: number): Observable<Guarantees[]> {
    return this.http.get<Guarantees[]>(`${this.apiUrl}/loan/${loanid}`, { headers: this.getAuthHeaders() });
  }
}