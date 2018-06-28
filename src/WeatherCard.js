import React, { Component } from 'react';

class WeatherCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            WeatherIcon: props.condition,
            IsAnimated: false,
            Hover: false
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

    WeatherIcons(props, hover = false) {
        if (props >= 200 && props < 233) {
            if (this.state.Hover === true) {
                return <img src = {
                    this.AnimatedIcons["thunder.svg"]
                }
                alt = 'Weather icon'
                className = 'weather-icon'
                width = '125px' / > ;
            }
            return <img src = {
                this.StaticIcons["thunder.svg"]
            }
            alt = 'Weather icon'
            className = 'weather-icon'
            width = '125px' / > ;
        } else if (props >= 300 && props < 532) {
            if (this.state.Hover === true) {
                return <img src = {
                    this.AnimatedIcons["rainy-5.svg"]
                }
                alt = 'Weather icon'
                className = 'weather-icon'
                width = '125px' / > ;
            }
            return <img src = {
                this.StaticIcons["rainy-5.svg"]
            }
            alt = 'Weather icon'
            className = 'weather-icon'
            width = '125px' / > ;
        } else if (props >= 801) {
            if (this.state.Hover === true) {
                return <img src = {
                    this.AnimatedIcons["cloudy.svg"]
                }
                alt = 'Weather icon'
                className = 'weather-icon'
                width = '125px' / > ;
            }
            return <img src = {
                this.StaticIcons["cloudy.svg"]
            }
            alt = 'Weather icon'
            className = 'weather-icon'
            width = '125px' / > ;
        } else {
            if (this.state.Hover === true) {
                return <img src = {
                    this.AnimatedIcons["day.svg"]
                }
                alt = 'Weather icon'
                className = 'weather-icon'
                width = '125px' / > ;
            }
            return <img src = {
                this.StaticIcons["day.svg"]
            }
            alt = 'Weather icon'
            className = 'weather-icon'
            width = '125px' / > ;
        }

    }

    HoverIcon() {
        if (this.state.Hover === false) {
            this.setState({
                Hover: true
            })
        }
    }

    LeaveIcon() {
        if (this.state.Hover === true) {
            this.setState({
                Hover: false
            })
        }
    }

    render() {
        return (
            <div className="weather-card-day" onClick={(e) => {this.props.onClickWeatherCard(this.props.day, e)}}  onMouseEnter={this.HoverIcon} onMouseLeave={this.LeaveIcon}>
                <h1>{this.props.day}</h1>
                {this.WeatherIcons(this.props.condition)}
                {this.props.temp}
            </div>
        )
    }
}

export default WeatherCard