import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor( private http: HttpClient ) { }

  getData() {
    const data = this.http.get("https://leafletjs.com/examples/choropleth/us-states.js");
    return data;
  }
}
