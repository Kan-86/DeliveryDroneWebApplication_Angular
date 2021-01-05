import { Component, OnInit } from '@angular/core';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {Subscription} from 'rxjs';
import {DroneService} from '../shared/service/drone.service';
import {Console} from 'inspector';

@Component({
  selector: 'app-streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.css']
})
export class StreamingComponent implements OnInit {
  private subscription: Subscription;
  public message: string;

  constructor(private droneService: DroneService) {
  }

  ngOnInit(): void {
  }

  public SendInputToDroneSimulation(direction: string): void {
    this.droneService.sendDirectionalInputToDrone(direction).subscribe(() => {
      console.log('Message: ' + direction + ' was sent.');
    });
  }
}
