import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DroneModel } from '../models/drone-model';
import {Observable, Subscription} from 'rxjs';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {OrderModel} from '../models/order-model';
@Injectable({
  providedIn: 'root'
})
export class DroneService {
  apiUrl = 'https://localhost:44395/api/v1/drone';
  private subscription: Subscription;
  private message: any;
  private droneTest: any;
  private drone: any;
  private order: OrderModel;
  constructor(private http: HttpClient,
              private mqttService: MqttService) {
  }

  getDrones(): Observable<DroneModel[]>{
    return this.http.get<DroneModel[]>(this.apiUrl);
  }

  updateDrone(droneModel: DroneModel): Observable<DroneModel>{
    return this.http.put<DroneModel>(this.apiUrl + '/' + droneModel.droneId, droneModel);
  }

  sendDirectionalInputToDrone(message: string): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/' + 'SendMessageToDrone?message=' + message, null);
  }

  public initializeSubscribeToDroneTopic(): void {
    this.subscription = this.mqttService.observe('topic/drones').subscribe((msg: IMqttMessage) => {
      this.drone = JSON.parse(msg.payload.toString());
      this.droneTest = {
        droneId: this.drone.DroneId,
        droneLat: this.drone.Lat,
        droneLong: this.drone.Long,
        droneOrderId: this.drone.AssignedOrder,
        droneDestinationLat: this.drone.DestinationLat,
        droneDestinationLong: this.drone.DestinationLong
      };
    });
    return this.droneTest;
  }

  public getLiveDroneFromBroker(): DroneModel {
    return this.droneTest;
  }

  public unsubscribeFromBroker(): void {
    this.subscription.unsubscribe();
  }
}

