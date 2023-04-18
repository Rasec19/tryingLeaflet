import { Component } from '@angular/core';
import { Map, tileLayer, marker, geoJSON, } from 'leaflet';
import { FeatureCollection, Feature, Geometry, GeoJsonProperties } from 'geojson';
import { DataServiceService } from './data-service.service';
import { states } from './data/us-states'
import { Density } from './interface/density'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  states: FeatureCollection<Geometry, GeoJsonProperties> = new states().getData();
  density: Density[] = [{
    name: '',
    density: 0
  }]
  features: any = this.states.features;
  stylesMap: any = [];

  constructor() {}

  ngOnInit(): void {

    // this.density = this.features.map( (f: any) => f.properties);

    // this.stylesMap = this.density.map( d => this.styleState( d.density ) );

    // console.log(this.stylesMap)
  }

  ngAfterViewInit() {
    const map = new Map('map').setView([37.09024, -95.712891], 4.4);

    const tile = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    this.density = this.features.map( (f: any) => f.properties);

    console.log(this.density)

    this.density.forEach( ({ density, name }) => {
      console.log(density)
      geoJSON(this.states, { style: this.styleState( density ) }).addTo(map)
    });


    const markerItem = marker([37.09024, -95.712891]).addTo(map);

    // map.fitBounds([
    //   [markerItem.getLatLng().lat, markerItem.getLatLng().lng]
    // ]);
  }

  getColor( density: number ): string {
    return density > 1000 ? '#800026' :
           density > 500  ? '#BD0026' :
           density > 200  ? '#E31A1C' :
           density > 100  ? '#FC4E2A' :
           density > 50   ? '#FD8D3C' :
           density > 20   ? '#FEB24C' :
           density > 10   ? '#FED976' :
                            '#FFEDA0';
  }

  styleState( density: number ) {
    return {
        fillColor: this.getColor(density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

}
