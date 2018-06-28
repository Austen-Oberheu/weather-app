import React, { Component } from 'react';

import SunnyIcon from './assets/weather-icons/static/day.svg';
import SunnyIconAnimated from './assets/weather-icons/animated/day.svg';

class DailyWeather extends Component {

    constructor(props) {
        super(props);    
        this.state = {
            WeatherIcon: SunnyIcon
        }

        this.HoverIcon = this.HoverIcon.bind(this);
        this.LeaveIcon = this.LeaveIcon.bind(this);
      }

    HoverIcon() {
        if (this.state.WeatherIcon !== SunnyIconAnimated){ 
            this.setState({
            WeatherIcon: SunnyIconAnimated
        })}
    }

    LeaveIcon() {
        if (this.state.WeatherIcon !== SunnyIcon){ 
            this.setState({
            WeatherIcon: SunnyIcon
        })}
    }


    render() {
        return (
            <div className="daily-weather">
            <h1>{this.props.hour}</h1>
                <img src={this.state.WeatherIcon} onMouseEnter={this.HoverIcon} onMouseLeave={this.LeaveIcon} alt='Weather icon' className='weather-icon' width='125px'/>
                <h1>{this.props.temp}</h1>
            </div>
        )
    }
}

export default DailyWeather;