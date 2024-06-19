import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3001/api/transactions';

  constructor(private http: HttpClient) { }

  getTransactions(fromDate: string, toDate: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?fromDate=${fromDate}&toDate=${toDate}`);
  }
}
