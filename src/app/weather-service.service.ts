import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Iweather } from './Data-Interface';



@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor( private http : HttpClient) { }

  getRequest(val) : Observable<Iweather[]>{
    let APP_ID ="9de03f7696855031ac22f17ee8cbf359";
    let cityName = val;
    let url ='https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + APP_ID;
     return this.http.get<Iweather[]>(url);
  }
  
}
