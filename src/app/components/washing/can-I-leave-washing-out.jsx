import React from 'react';
import Moment from 'moment';

import '../../../content/css/can-i-leave-washing.css';

class CanIleaveMyWashingOut extends React.Component {
    state = {
        result: "",
        reloadClass: ""
    }
    componentWillMount() {
        this.canIleavMyWashingOut();
    }
    canIleavMyWashingOut = () => {
        if (!navigator.geolocation) {
            this.setState({ result: 'Geolocation is not supported by your browser' });
        } else {
            this.setState({ result: 'Looking out window...' });
            navigator.geolocation.getCurrentPosition(this.success, this.error);
        }
    }
    success = (position) => {
        const lat = position.coords.latitude,
            long = position.coords.longitude;

        fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=8fa281e3ce280ecf6b2d54bf3bb479d1&units=metric").then(weatherResult => weatherResult.json())
            .then((weatherResult) => {
                fetch("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&APPID=8fa281e3ce280ecf6b2d54bf3bb479d1&units=metric").then(forecastResult => forecastResult.json())
                    .then((forecastResult) => {

                        let sunset = weatherResult.sys.sunset;

                        if(sunset < new Date().getTime()){
                            let tommorowsSunsetDate = new Date(sunset +1);
                            sunset = tommorowsSunsetDate.getTime();
                        }
                        let wetForecastsBeforeSunset = forecastResult.list.filter(x => x.dt < sunset && (x.rain && !(Object.keys(x.rain).length === 0 && x.rain.constructor === Object)) || (x.snow && !(Object.snow.keys(x.snow).length === 0 && x.snow.constructor === Object)));
                        if (wetForecastsBeforeSunset.length) {
                            let bringItIn = "NO! Bring it in at " + Moment(wetForecastsBeforeSunset[0].dt * 1000).local().format("LT");
                            this.setState({ result: bringItIn });
                        }
                        else
                            this.setState({ result: "Yes", reloadClass: "" });
                    });
            });

    }
    error = (e) => {
        console.log("Sorry something went wrong. Do not not not not not not not not not not hang it out. Not.")
    }
    _reload = () => {
        this.setState({ reloadClass: "rotate" });
        this.canIleavMyWashingOut();
    }
    render() {
        return (
            <div className="center-page-wrapper can-i-leave-washing">
                <div className="center-text">
                    <h1>Can I leave my washing out?</h1>
                    <h1>{this.state.result}</h1>
                    <div className={"icon-wrapper " + this.state.reloadClass} onClick={this._reload}>
                        <i className="fas fa-sync-alt"></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default CanIleaveMyWashingOut