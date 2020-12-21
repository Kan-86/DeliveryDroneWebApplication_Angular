import { Component, OnInit } from '@angular/core';
import { DroneModel } from '../shared/models/drone-model';
import { DroneService } from '../shared/service/drone.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  drones: DroneModel[];
  droneId: number;
  selectedDrones: string;
  constructor(private droneService: DroneService) { }

  ngOnInit(): void {
    this.droneService.getDrones().subscribe(s => {
      this.drones = s;
    });
  }
  onSelectedChange(value: number){
    console.log('We selected something');
    console.log(value);
    this.droneId = value;

    this.drones.forEach(d => {
      if(d.droneId == this.droneId){
        console.log('The selected droneId is ' + d.droneId);
      }
    })

  }
}
