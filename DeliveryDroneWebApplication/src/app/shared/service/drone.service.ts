import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DroneModel } from '../models/drone-model';
import {Observable, Subscription} from 'rxjs';
import {IMqttMessage, MqttService} from 'ngx-mqtt';



@Injectable({
  providedIn: 'root'
})
export class DroneService {
  apiUrl = 'https://localhost:44395/api/v1/drone';
  private subscription: Subscription;
  private message: any;
  private drone: DroneModel;
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

  public getLiveCoordsFromBroker(): void {
    this.subscription = this.mqttService.observe('topic/drones').subscribe((msg: IMqttMessage) => {
      this.drone = JSON.parse(msg.payload.toString());
      // console.log('drone Coords: ' + msg.payload.toString());
      const splitMessage = msg.payload.toString().split(',', 15);

      const lat = splitMessage[1];
      const assignedOrder = splitMessage[4];
      const droneId = splitMessage[8];
      const long = splitMessage[10];


      this.drone.droneId = droneId;
      this.drone.lat = lat;
      this.drone.long = long;
      this.drone.orderId = assignedOrder;


    });
  }

  public unsubscribeFromBroker(): DroneModel {
    return this.drone;
  }
}
