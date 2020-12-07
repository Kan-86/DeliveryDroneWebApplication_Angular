import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DroneModel } from '../models/drone-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DroneService {
  apiUrl = 'https://localhost:44395/api/v1/drone';
  constructor(private http: HttpClient) { }

  getDrones() : Observable<DroneModel[]>{
    return this.http.get<DroneModel[]>(this.apiUrl);
  }
}
