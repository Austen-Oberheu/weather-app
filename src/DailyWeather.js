import React, { Component } from 'react';

import SunnyIcon from './assets/weather-icons/sun-bright.svg';

class DailyWeather extends Component {
    render() {
        return (
            <div className="daily-weather">
            <h1>{this.props.hour}</h1>
                <img src={SunnyIcon} alt='Weather icon' className='weather-icon' width='76px'/>
                <h1>60</h1>
            </div>
        )
    }
}

export default DailyWeather;