import { PaymentMenthod } from './../../shared/interfaces/payment-method';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Customer } from 'src/app/shared/interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  API_URL = environment.apiUrl + '/customers';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.API_URL);
  }

  getAllPaymentMethods():Observable<PaymentMenthod[]> {
    return this.http.get<PaymentMenthod[]>(`${this.API_URL}/payment-methods`);
  }
}
