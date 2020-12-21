import { Component, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { DroneModel } from '../shared/models/drone-model';
import { NavbarComponent } from '../navbar/navbar.component';
import { DroneService } from '../shared/service/drone.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  private map;
  lat: number;
  long: number;
  drones: DroneModel[];
  droneId: number;
  selectedDrones: string;
  marker = null;
  constructor(private droneService: DroneService) { }

  ngOnInit(): void {
    this.droneService.getDrones().subscribe(s => {
      this.drones = s;
    });
    this.initMap();
  }

  onSelectedChange(value: number){
    this.droneId = value;
    this.drones.forEach(d => {
      if(d.droneId == this.droneId){
        this.long = d.long;
        this.lat = d.lat;
      }
    });

    var greenIcon = L.icon({
      iconUrl: 'assets/img/droneIcon.png',

      iconSize:     [28, 28], // size of the icon
    });
    if (this.marker !== null) {
      this.map.removeLayer(this.marker);
    }
    this.marker = new L.marker([this.lat,   this.long], {icon: greenIcon}).addTo(this.map);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 55.48775590896692, 8.446953715343545 ],
      zoom: 12
    });


    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 1,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });


    tiles.addTo(this.map);
    L.bringToBack();
  }
}
