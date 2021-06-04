import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
url:string;
apikey:string = ''; //Kendi api keyinizi girin
 constructor(private http:HttpClient) { 
   this.url = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&lang=tr&appid='+this.apikey;
 }
  getWeatherByCityName(city:string) {
    return this.http.get(this.url+"&q="+city);
  }
  getWeatherByCoor(lat:number,lon:number) {
    return this.http.get(this.url+"&lat="+lat+"&lon="+lon); 
  } 

}
