import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  city: string = '';
  alertMessage: string = '';
  private apiKey = '05ee2fa2f012b05e42b698786021cec2';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor() {}

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
      const weatherCondition = data.weather[0].main;
      const windSpeed = data.wind.speed;
      const temp = data.main.temp - 273.15; // Convert Kelvin to Celsius

      // Enhanced alert messages based on conditions
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
}
