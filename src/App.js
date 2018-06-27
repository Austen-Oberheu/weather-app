import React, { Component } from 'react';
import './App.css';

import './WeatherCard';
import WeatherCard from './WeatherCard';
import DailyWeather from './DailyWeather';
import WeeklyWeatherButton from './WeeklyWeatherButton';
import Modal from 'react-modal';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


Modal.setAppElement('#root');

class App extends Component {
  constructor(props) {
    super(props);

    this.onClickWeatherCard = this.onClickWeatherCard.bind(this);

    this.state = {
      days: this.Day,
      hours: this.Hour,
      fiveDayForecast: true,
      HourlyForecastDay: null,
      latitudeAndLongitude: null,
      zipcode: 44313,
      modalIsOpen: false,
      weeklyTemp: [],
      weeklyConditions: [],
      dayTemp: [[]],
      cityname: null
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    fetch('http://api.openweathermap.org/data/2.5/forecast?zip=' + this.state.zipcode + '&units=imperial&appid=2ca4abde09053ebc1e7581bc0a14e257')
    .then(results => {
      return results.json();
    }).then(data => {
      var d1 = new Date(data.list[0].dt_txt);
      var weeklyTemperature = [Math.floor(data.list[0].main.temp)];
      var weeklyCondition = [];
      var dailyTemperature = [];
      var hourlyTemperature = [];
      console.log(data);
     for (var i = 0; i < data.list.length; i++)
     {
       var d2 = new Date(data.list[i].dt_txt);
       hourlyTemperature.push(Math.floor(data.list[i].main.temp));
       if (d1.getDay() !== d2.getDay())
       {
          //console.log(data.list[i + 5].dt_txt);
          weeklyTemperature.push(Math.floor(data.list[i].main.temp));
          weeklyCondition.push(data.list[i].weather[0].id);
          d1 = new Date(data.list[i].dt_txt);
          dailyTemperature.push(hourlyTemperature);
          hourlyTemperature = [];
        
       }

       
     }

     let temperatures = weeklyTemperature.map(temp => {
       return (
         <h1 key={temp}>{temp}</h1>
       )
     })

      this.setState({
        weeklyTemp: temperatures,
        weeklyConditions: weeklyCondition,
        cityname: data.city.name,
        dayTemp: dailyTemperature
      })

    })
    .catch(err => {
      console.log(err);
    });
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#606060';
    this.subtitle.style.cssFloat = 'left';
    this.subtitle.style.marginTop = 0;
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      zipcode: document.getElementById("zipcodeForm").value
    });
    //Runs API call again for new location
    fetch('http://api.openweathermap.org/data/2.5/forecast?zip=' + this.state.zipcode + '&units=imperial&appid=2ca4abde09053ebc1e7581bc0a14e257')
    .then(results => {
      return results.json();
    }).then(data => {
      var d1 = new Date(data.list[0].dt_txt);
      var weeklyTemperature = [Math.floor(data.list[0].main.temp)];
      var dailyTemperature = [];
      var hourlyTemperature = [];
     for (var i = 0; i < data.list.length; i++)
     {
       var d2 = new Date(data.list[i].dt_txt);
       hourlyTemperature.push(Math.floor(data.list[i].main.temp));
       if (d1.getDay() !== d2.getDay())
       {
          //console.log(data.list[i + 5].dt_txt);
          weeklyTemperature.push(Math.floor(data.list[i].main.temp));
          d1 = new Date(data.list[i].dt_txt);
          dailyTemperature.push(hourlyTemperature);
          hourlyTemperature = [];
        
       }

       
     }

     let temperatures = weeklyTemperature.map(temp => {
       return (
         <h1 key={temp}>{temp}</h1>
       )
     })

      this.setState({
        weeklyTemp: temperatures,
        cityname: data.city.name,
        dayTemp: dailyTemperature
      })

    })
    .catch(err => {
      console.log(err);
    });
  }

  get Day() {
    var d = new Date();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var nextFiveDays = [];
    for (var i = 0; i < 5; i++){
        if (days[(d.getDay() + i)] === undefined)
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
    return ((date.getMonth() + 1) + "/" + date.getDate() + "/"  + date.getFullYear());
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
    var hoursTemp = [];
    var selectedDay = 0;
    var ThreeHourInterval = ["0:00 AM", "3:00 AM", "6:00 AM" , "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM", "12:00 AM"];

    for (var i = 0; i < days.length; i++)
    {
      if (this.state.HourlyForecastDay === days[i])
      {
        selectedDay = i;
      }
    }

    for (var x = 0; x < this.state.dayTemp[selectedDay].length; x++)
    {
      hoursTemp[x] = this.state.dayTemp[selectedDay][x];
    }
    
    const FiveDayForecast = days.map((days, i) => 
      <WeatherCard key={days} day={days} condition={this.state.weeklyConditions[i]} temp={this.state.weeklyTemp[i]} onClickWeatherCard={this.onClickWeatherCard}/>
     )

    const HourlyForecast = hoursTemp.map((hours, i) =>
      <DailyWeather key={i} day={this.state.HourlyForecastDay} hour={selectedDay === 0 ? this.state.hours[i + 1] : ThreeHourInterval[i]} temp={hoursTemp[i]}/>
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
        {this.state.fiveDayForecast ? 
        <div className="weekly-header"> 
          <h1>{this.Date} {this.state.cityname}</h1> 
          <button className="location-button" onClick={this.openModal}>Change Location</button>
          <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal">
          <button className="modal-close-button" onClick={this.closeModal}>Change Zip Code</button>
          <h3 ref={subtitle => this.subtitle = subtitle}>Enter your zipcode</h3>
            <input type="text" id="zipcodeForm"/>
        </Modal>
        </div> :
        <div className="daily-header"> 
          <h1>{this.state.HourlyForecastDay} </h1>  
          <WeeklyWeatherButton onClickWeatherCard={this.onClickWeatherCard}/> </div>}
          <div className="Weather-Element">
            {this.WeatherElement()}
        </div>
      </div>
    );
  }
}

export default App;
