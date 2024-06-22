import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loans } from '../models/loans.model';

@Injectable({
  providedIn: 'root'
})
export class LoansService {
  private apiUrl = 'http://localhost:3000/loans'; // URL de l'API

  constructor(private http: HttpClient) { }

  // Récupérer tous les prêts
  getAllLoans(): Observable<Loans[]> {
    return this.http.get<Loans[]>(this.apiUrl);
  }

  // Récupérer un prêt par ID
  getLoanById(id: number): Observable<Loans> {
    return this.http.get<Loans>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un nouveau prêt
  addLoan(loan: Loans): Observable<Loans> {
    return this.http.post<Loans>(this.apiUrl, loan);
  }

  // Mettre à jour un prêt
  updateLoan(id: number, loan: Loans): Observable<Loans> {
    return this.http.put<Loans>(`${this.apiUrl}/${id}`, loan);
  }

  // Supprimer un prêt
  deleteLoan(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
