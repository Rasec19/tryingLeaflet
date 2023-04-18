import { Component } from '@angular/core';
import { Map, tileLayer, marker, geoJSON, } from 'leaflet';
import { FeatureCollection, Feature, Geometry, GeoJsonProperties } from 'geojson';
import { DataServiceService } from './data-service.service';
import { states } from './data/us-states'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  states: FeatureCollection<Geometry, GeoJsonProperties> | undefined;

  constructor( private serviceData: DataServiceService ) {}

  ngOnInit(): void {
    this.states = new states().getData();
    console.log(this.states)
  }

  ngAfterViewInit() {
    const map = new Map('map').setView([29.0948207, -110.9692202], 13);

    const tile = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    geoJSON(this.states).addTo(map);

    // const markerItem = marker([29.0948207, -110.9692202]).addTo(map);

    // map.fitBounds([
    //   [markerItem.getLatLng().lat, markerItem.getLatLng().lng]
    // ]);
  }

}
