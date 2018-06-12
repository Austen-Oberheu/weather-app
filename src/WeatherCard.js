import React, { Component } from 'react';

import SunnyIcon from './assets/weather-icons/sun-bright.svg';

class WeatherCard extends Component {

    render() {
        return (
            <div className="weather-card-day" onClick={(e) => {this.props.onClickWeatherCard(this.props.day, e)}}>
                <h1>{this.props.day}</h1>
                <img src={SunnyIcon} alt='Weather icon' className='weather-icon' width='76px'/>
                <h1>60</h1>
            </div>
        )
    }
}

export default WeatherCard