import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { WeatherService } from '../servicies/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  istanbul: any;
  izmir: any;
  ankara: any;

  current: any; //mevcut durum..!
  lat: number;
  lon: number;

  constructor(private geolocation: Geolocation, private weather: WeatherService, private loading: LoadingController) { }
  iconuri: string = "https://api.openweathermap.org/img/w/";


  ngOnInit() {
    //sistem hazır oldugunda
    this.presentLoading();
    this.konumGoster();
    this.getWeather();
  }
  async presentLoading() {
    let loading = await this.loading.create({
      message: 'Yükleniyor...',
      duration: 3000
    });
    await loading.present();
  }


  getWeather() {


    this.weather.getWeatherByCityName('istanbul').subscribe(havadurumu => {
      this.istanbul = havadurumu;
      //  this.current=havadurumu;  // browser da calısması için.
      console.log(this.istanbul);
    });
    this.weather.getWeatherByCityName('izmir').subscribe(havadurumu => {
      this.izmir = havadurumu;
    });
    this.weather.getWeatherByCityName('ankara').subscribe(havadurumu => {
      this.ankara = havadurumu;
    })

  }


  konumGoster() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;

      this.weather.getWeatherByCoor(this.lat, this.lon).subscribe((havadurumu) => {
        this.current = havadurumu;
      });

    }).catch((error) => {
      alert('Error getting location : ' + error);
    });
  }

}
