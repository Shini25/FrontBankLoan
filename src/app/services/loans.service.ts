import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loans } from '../models/loans.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoansService {
  private apiUrl = 'http://localhost:3000/loans'; // URL de l'API

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': token || ''
    });
  }

  // Récupérer tous les prêts avec les détails des clients
  getAllLoans(): Observable<Loans[]> {
    return this.http.get<Loans[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // Récupérer un prêt par ID
  getLoanById(id: number): Observable<Loans> {
    return this.http.get<Loans>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Ajouter un nouveau prêt
  addLoan(loan: Loans): Observable<Loans> {
    return this.http.post<Loans>(this.apiUrl, loan, { headers: this.getAuthHeaders() });
  }

  // Mettre à jour un prêt
  updateLoan(id: number, loan: Loans): Observable<Loans> {
    return this.http.put<Loans>(`${this.apiUrl}/${id}`, loan, { headers: this.getAuthHeaders() });
  }

  // Supprimer un prêt
  deleteLoan(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  getPendingLoans(): Observable<Loans[]> {
    return this.getAllLoans().pipe(
      map(loans => loans.filter(loan => loan.status === 'pending'))
    );
  }
}
