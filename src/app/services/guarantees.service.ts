import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guarantees } from '../models/guarantees.model';

@Injectable({
  providedIn: 'root'
})
export class GuaranteesService {
  private apiUrl = 'http://localhost:3000/guarantees'; // URL de l'API

  constructor(private http: HttpClient) { }

  // Récupérer toutes les garanties
  getAllGuarantees(): Observable<Guarantees[]> {
    return this.http.get<Guarantees[]>(this.apiUrl);
  }

  // Récupérer une garantie par ID
  getGuaranteeById(id: number): Observable<Guarantees> {
    return this.http.get<Guarantees>(`${this.apiUrl}/${id}`);
  }

  // Ajouter une nouvelle garantie
  addGuarantee(guarantee: Guarantees): Observable<Guarantees> {
    return this.http.post<Guarantees>(this.apiUrl, guarantee);
  }

  // Mettre à jour une garantie
  updateGuarantee(id: number, guarantee: Guarantees): Observable<Guarantees> {
    return this.http.put<Guarantees>(`${this.apiUrl}/${id}`, guarantee);
  }

  // Supprimer une garantie
  deleteGuarantee(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}