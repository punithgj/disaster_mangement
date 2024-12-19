import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  city: string = '';
  alertMessage: string = '';
  private apiKey = '05ee2fa2f012b05e42b698786021cec2';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private map: any; // Use `any` for dynamic loading
  private marker: any;

  constructor() {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.loadLeafletAndInitializeMap();
    }
  }

  private async loadLeafletAndInitializeMap(): Promise<void> {
    const L = await import('leaflet'); // Lazy load Leaflet dynamically
    this.map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  async checkWeather() {
    if (!this.city) {
      this.alertMessage = 'Please enter a city name.';
      return;
    }

    const url = `${this.baseUrl}?q=${this.city}&appid=${this.apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error fetching weather data');
      }

      const data = await response.json();
      const { lat, lon } = data.coord;

      if (typeof window !== 'undefined') {
        const L = await import('leaflet');
        this.updateMap(lat, lon, L);
      }

      const weatherCondition = data.weather[0].main;
      const windSpeed = data.wind.speed;
      const temp = data.main.temp - 273.15; // Convert Kelvin to Celsius

      if (weatherCondition === 'Extreme' || windSpeed > 70) {
        this.alertMessage = `Disaster Alert! Severe weather in ${this.city}. High wind speeds of ${windSpeed} m/s and extreme conditions detected.`;
      } else if (windSpeed > 50) {
        this.alertMessage = `Caution: Strong winds in ${this.city} (${windSpeed} m/s). Stay alert.`;
      } else if (windSpeed > 20) {
        this.alertMessage = `Weather in ${this.city} is normal with moderate winds (${windSpeed} m/s) and a temperature of ${temp.toFixed(1)}°C.`;
      } else {
        this.alertMessage = `Weather in ${this.city} is good with calm winds (${windSpeed} m/s) and a temperature of ${temp.toFixed(1)}°C. No disaster likely to happen.`;
      }
    } catch (error) {
      this.alertMessage = `Error fetching weather for ${this.city}. Please try again.`;
      console.error(error);
    }
  }

  private updateMap(lat: number, lon: number, L: any): void {
    if (!this.map) return;

    this.map.setView([lat, lon], 10);

    if (this.marker) {
      this.marker.setLatLng([lat, lon]);
    } else {
      this.marker = L.marker([lat, lon]).addTo(this.map);
    }

    this.marker.bindPopup(`<b>${this.city}</b>`).openPopup();
  }
}