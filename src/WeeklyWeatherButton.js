import React, {Component} from 'react';

class WeeklyWeatherButton extends Component {

    render() {
        return (
            <button onClick={(e) => {this.props.onClickWeatherCard(this.props.day, e)}}>Back to weekly view</button>
        )
    }
}

export default WeeklyWeatherButton;