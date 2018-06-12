import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import './WeatherCard';
import WeatherCard from './WeatherCard';
import DailyWeather from './DailyWeather';
import WeeklyWeatherButton from './WeeklyWeatherButton';
import { isNullOrUndefined } from 'util';

class App extends Component {
  constructor(props) {
    super(props);

    this.onClickWeatherCard = this.onClickWeatherCard.bind(this);

    this.state = {
      days: this.Day,
      hours: this.Hour,
      fiveDayForecast: true,
      HourlyForecastDay: null,
      latitudeAndLongitude: this.Location,
      zipcode: null
    }
  }

  get Location() {
  
    var latAndLng = navigator.geolocation.getCurrentPosition(function(position) {

      return [position.coords.latitude, position.coords.longitude]
 
     })
     return latAndLng;
}

  get Day() {
    var d = new Date();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var nextFiveDays = [];
    for (var i = 0; i < 5; i++){
        if (days[i] === isNullOrUndefined)
        {
          nextFiveDays[i] = days[(d.getDay() + i) - 7];
        }
        else{
          nextFiveDays[i] = days[d.getDay() + i];
        }
    }
    return nextFiveDays;
  }

  get Hour() {
    var t = new Date();
    Date.prototype.timeNow = function () {
      return ((this.getHours() < 10)?"0":"") + this.getHours();
    }
    var time = t.timeNow();
    time = Math.floor(time / 3);
    var ThreeHourInterval = ["0:00 AM", "3:00 AM", "6:00 AM" , "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM", "12:00 AM"];
    var ThreeHourForecast = [];
    for (var i = 0; i <  (8 - time) + 1; i++)
    {
      ThreeHourForecast[i] = ThreeHourInterval[time + i]
    }
    return ThreeHourForecast;
  }

  get Date() {
    var date = new Date();
    return (date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear());
  }

  onClickWeatherCard(day, e) {
    if(this.state.fiveDayForecast === true)
    {
      this.setState({fiveDayForecast : false});
      this.setState({HourlyForecastDay : day});
    }
    else {
      this.setState({fiveDayForecast : true});
    }
    e.preventDefault();
  }

  WeatherElement() {
    const days = this.state.days;
    const hours = this.state.hours;

    const FiveDayForecast = days.map(days => 
      <WeatherCard key={days} day={days} onClickWeatherCard={this.onClickWeatherCard}/>
     )

    const HourlyForecast = hours.map(hours =>
      <DailyWeather key={hours} day={this.state.HourlyForecastDay} hour={hours}/>
        )

    if (this.state.fiveDayForecast === true)
    {
      return ( 
       <ul> {FiveDayForecast} </ul>
      )
    }
    if (this.state.fiveDayForecast === false) {
      return (
       <ul> {HourlyForecast} </ul>
    )
    }
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Austen's Weather App</h1>
        </header>
        {this.state.fiveDayForecast ? <div className="weekly-header"> <h1>{this.Date}{this.Location} Brunswick, OH</h1> <button>Change Location</button></div> :<div className="daily-header"> <h1>{this.state.HourlyForecastDay} </h1>  <WeeklyWeatherButton onClickWeatherCard={this.onClickWeatherCard}/> </div>}
        <div className="Weather-Element">
       {this.WeatherElement()}
        </div>
      </div>
    );
  }
}

export default App;
