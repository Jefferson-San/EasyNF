import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateInvoiceRequest } from '../models/invoice.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = environment.billingServiceUrl;

  constructor(private http: HttpClient) {}

  issueInvoice(request: CreateInvoiceRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, request.items);
  }
} 