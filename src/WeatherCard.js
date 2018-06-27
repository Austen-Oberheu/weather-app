import React, { Component } from 'react';



class WeatherCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            WeatherIcon: props.condition,
            IsAnimated: false
        }

        this.HoverIcon = this.HoverIcon.bind(this);
        this.LeaveIcon = this.LeaveIcon.bind(this);
    }

    ImportAll(r) {
        let images = {};
        r.keys().map((item, index) => {
            images[item.replace('./', '')] = r(item);
        });
        return images;
    }
    StaticIcons = this.ImportAll(require.context('./assets/weather-icons/static', false, /\.(png|jpe?g|svg)$/));
    AnimatedIcons = this.ImportAll(require.context('./assets/weather-icons/animated', false, /\.(png|jpe?g|svg)$/));

    WeatherIcons(props) {
       if (props >= 500 && props < 532)
       {
           this.setState({WeatherIcon: "rainy-5.svg"});
           return this.StaticIcons["rainy-5.svg"]
       }
       else
       return this.StaticIcons["day.svg"]

    }

        HoverIcon() {
            if (this.state.IsAnimated !== true){ 
                this.setState({
                WeatherIcon: this.AnimatedIcons[this.state.WeatherIcon],
                IsAnimated: true
            })}
    }

    LeaveIcon() {
        if (this.state.IsAnimated !== false){ 
            this.setState({
            WeatherIcon: this.StaticIcons[this.state.WeatherIcon],
            IsAnimated: false
        })}
    
    }

    render() {
        return (
            <div className="weather-card-day" onClick={(e) => {this.props.onClickWeatherCard(this.props.day, e)}}>
                <h1>{this.props.day}</h1>
                <img src={this.WeatherIcons(this.props.condition)} onMouseEnter={this.HoverIcon} onMouseLeave={setTimeout(this.LeaveIcon, 2000)} alt='Weather icon' className='weather-icon' width='125px'/>
                {this.props.temp}
            </div>
        )
    }
}

export default WeatherCard