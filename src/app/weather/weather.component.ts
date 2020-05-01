  import { Component, OnInit } from '@angular/core';
  import { WeatherServiceService } from '../weather-service.service';
  import { Iweather } from '../Data-Interface';
  import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

  @Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
  })
  export class WeatherComponent implements OnInit {
    
    options: FormGroup;
    floatLabelControl = new FormControl('auto');
    constructor(private WeatherService : WeatherServiceService , fb: FormBuilder ,private _snackBar: MatSnackBar) { 
      this.options = fb.group({
        floatLabel: this.floatLabelControl
      });
    }
    
    public weatherData : Iweather[] = [];
    
    ngOnInit() {}

    public date ="";
    public cityName ="";
    public Status = true;
    public humidity = "";
    public pressure = "";
    public wind_speed = "";
    public weather = "";
    public temp ="";
    // public errorMsg ="Welcome to weather Application";

    getWeatherReport(value){

      if(value !=""){
      
      this.cityName =value;
      this.WeatherService.getRequest(this.cityName)
      .subscribe(data  => {
        this.humidity = data['main'].humidity;
        this.temp =     data['main'].temp;
        this.wind_speed = data['wind'].speed;
        this.pressure = data['main'].pressure;
        this.weather = data['weather'][0].main;
        this.weatherData = data;
        this.Status = false;
        
      },
      error => {
        // this.errorMsg = "server Error has occured , City/state/Country 404 Not Found";
        if(error != ""){
          this._snackBar.open("server Error has occured , City/state/Country 404 Not Found", 'close', {
            duration: 2000
          });
          this.Status = true;
        }
      }
      )}
    else{
      this.Status = true;
      // this.errorMsg = "Please Enter city/state/Country";
      this._snackBar.open('Please Enter city/state/Country', 'close', {
        duration: 2000
      });
    }
    }
    
    getDate(){
      this.date  = new Date().toDateString();
    }    

  }
