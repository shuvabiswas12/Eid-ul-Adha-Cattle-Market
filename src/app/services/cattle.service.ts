import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CattleService {
  constructor(private http: HttpClient) {}

  getCattle(): Observable<any[]> {
    return this.http.get<any[]>('/cattle');
  }

  addCattle(cattle: any): Observable<any> {
    return this.http.post('/cattle', cattle);
  }

  updateCattle(id: number, data: any): Observable<any> {
    return this.http.patch(`/cattle/${id}`, data);
  }
}
