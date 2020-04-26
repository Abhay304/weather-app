  import { Component, OnInit } from '@angular/core';
  import { WeatherServiceService } from '../weather-service.service';
  import { Iweather } from '../Data-Interface';
  import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
  @Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
  })
  export class WeatherComponent implements OnInit {
    
    options: FormGroup;
    floatLabelControl = new FormControl('auto');
    constructor(private WeatherService : WeatherServiceService , fb: FormBuilder) { 
      this.options = fb.group({
        floatLabel: this.floatLabelControl
      });
    }
    
    public weatherData : Iweather[] = [];
    
    ngOnInit() {}

    public date ="";
    public cityName ="";
    public Status = "true";
    public humidity = "";
    public pressure = "";
    public wind_speed = "";
    public weather = "";
    public temp :string;
    

    getWeatherReport(value){
      this.Status = 'false';
      this.cityName =value;
      this.WeatherService.getRequest(this.cityName)
      .subscribe((data : Iweather[]) => {
        this.temp = data.main.temp;
        this.humidity = data.main.humidity;
        this.wind_speed = data.wind.speed;
        this.pressure = data.main.pressure;
        // // this.weather = data.weather[0].description;
        this.weatherData = data;
      });
      
    }

    getDate(){
      this.date  = new Date().toDateString();
    }

    getLog(){
        console.log(this.weatherData)
    }
    
    

  }
