import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderModel } from '../models/order-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from "rxjs/operators";

// Set the http options
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'c31z' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  streetMaps = 'https://nominatim.openstreetmap.org/search?q=';
  streetMapsDetail = '&format=json&addressdetails=1';
  apiUrl = 'https://localhost:44395/api/v1/order';
  constructor(private http: HttpClient) { }

  createOrder(orderFormData: OrderModel): Observable<any>{
      return this.http.post<OrderModel>(this.apiUrl, orderFormData);
  }
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getLocation(address: string, addressNumber: string, zipCode: string): Observable<any> {
    return this.http.get(this.streetMaps
      + address + ' '
      + addressNumber + ' '
      + zipCode
      + this.streetMapsDetail).pipe(
      map(this.extractData)
    );
  }

  getOrder(): Observable<OrderModel[]>{
    return this.http.get<OrderModel[]>(this.apiUrl);
  }
}
