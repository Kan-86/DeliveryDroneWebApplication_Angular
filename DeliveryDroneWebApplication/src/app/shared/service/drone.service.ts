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
      /*this.order = JSON.parse(msg.payload.toString());

      // console.log('drone Coords: ' + msg.payload.toString());
      const splitMessage = msg.payload.toString().split(',', 15);

      const lat = splitMessage[1];
      const deliveryAddressLat = splitMessage[2];
      const assignedOrder = splitMessage[4];
      const deliveryAddressLong = splitMessage[7];
      const droneId = splitMessage[8];
      const long = splitMessage[10];

      const splitLat = lat.split('"Lat":', 2);
      const splitLong = long.split('"Long":', 2);
      const splitDeliveryAddressLat = deliveryAddressLat.split('"DestinationLat":', 2);
      const splitAssignedOrder = assignedOrder.split('"AssignedOrder":', 2);
      const splitDroneId = droneId.split('"DroneId":', 2);
      const splitDeliveryAddressLong = deliveryAddressLong.split('"DestinationLong":', 2);

      const latSplit = splitLat[1];
      const longSplit = splitLong[1];
      const deliveryAddressLatSplit = splitDeliveryAddressLat[1];
      const assignedOrderSplit = splitAssignedOrder[1];
      const droneIdSplit = splitDroneId[1];
      const deliveryAddressLongSplit = splitDeliveryAddressLong[1];



      this.drone.droneId = droneIdSplit;
      this.drone.lat = latSplit;
      this.drone.long = longSplit;
      this.drone.carryingOrder = true;

      this.order.orderId = assignedOrderSplit;
      this.order.deliveryAddressLat = deliveryAddressLatSplit;
      this.order.deliveryAddressLong = deliveryAddressLongSplit;*/
    });
    return this.droneTest;
  }

  public getLiveDroneFromBroker(): DroneModel {
    return this.drone;
  }
  public getLiveOrderFromBroker(): OrderModel {
    return this.order;
  }
}

