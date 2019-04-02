import React from 'react';
import Moment from 'moment';

import '../../../content/css/can-i-leave-washing.css';

import WeatherIcon from './weather-icon.jsx';

class CanIleaveMyWashingOut extends React.Component {
    state = {
        result: "",
        reloadClass: "",
        weather: "none",
        checkTommorowsForecast: false
    }
    componentWillMount() {
        this._canILeaveMyWashingOutToday();
    }
    canIleavMyWashingOut = () => {
        navigator.geolocation.getCurrentPosition(this.success, this.error);
    }
    isGelocationEnabled = () => {
        if (!navigator.geolocation) {
            this.setState({ result: 'Geolocation is not supported by your browser' });
            return false;
        } else {
            this.setState({ result: 'Looking out window...' });
            return true;
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
                        let wetForecastsBeforeSunset
                        
                        if (this.state.checkTommorowsForecast) {
                            let tommorowsSunset = this.getSameTimeTommorow(sunset);
                            let sevenAmTommorow = forecastResult.list.filter(x => x.dt < tommorowsSunset && new Date(x.dt * 1000).getHours() === 7 && x.dt > sunset);
                            wetForecastsBeforeSunset = forecastResult.list.filter(x => (x.dt === sevenAmTommorow[0].dt || x.dt < tommorowsSunset) && (x.rain && !(Object.keys(x.rain).length === 0 && x.rain.constructor === Object)) || (x.snow && !(Object.snow.keys(x.snow).length === 0 && x.snow.constructor === Object)));
                        }
                        else {
                            if (this.hasSunAlreadySet(sunset))
                                sunset = this.getSameTimeTommorow(sunset);
                            wetForecastsBeforeSunset = forecastResult.list.filter(x => x.dt < sunset && (x.rain && !(Object.keys(x.rain).length === 0 && x.rain.constructor === Object)) || (x.snow && !(Object.snow.keys(x.snow).length === 0 && x.snow.constructor === Object)));
                        }
                        if (wetForecastsBeforeSunset.length) {
                            let bringItIn = "NO! Bring it in at " + Moment(wetForecastsBeforeSunset[0].dt * 1000).local().format("LT");
                            this.setState({ result: bringItIn, weather: "raining", reloadClass: "" });
                        }
                        else
                            this.setState({ result: "Yes", reloadClass: "", weather: "sunny" });
                    });
            });

    }
    error = (e) => {
        console.log("Sorry something went wrong. Do not not not not not not not not not not hang it out. Not.")
    }
    hasSunAlreadySet = (sunset) => {
        return (sunset * 1000) < new Date().getTime();
    }
    getSameTimeTommorow = (time) => {
        let todaysSunsetDate = new Date(time * 1000);
        let tommorowsSunsetDate = todaysSunsetDate.setDate(todaysSunsetDate.getDate() + 1)
        return new Date(tommorowsSunsetDate / 1000).getTime();
    }
    _canILeaveMyWashingOutTommorow = () => {
        if (this.isGelocationEnabled()) {
            this.setState({ reloadClass: "rotate", weather: "searching", checkTommorowsForecast: true },
                this.canIleavMyWashingOut())
        }
    }
    _canILeaveMyWashingOutToday = () => {
        if (this.isGelocationEnabled()) {
            this.setState({ reloadClass: "rotate", weather: "searching", checkTommorowsForecast: false },
                this.canIleavMyWashingOut())
        }
    }
    _changeDay = () =>{
        if(!this.state.checkTommorowsForecast){
            this._canILeaveMyWashingOutTommorow();
        }
        else{
            this._canILeaveMyWashingOutToday();
        }
    }
    _refresh = () =>{
        if(this.state.checkTommorowsForecast){
            this._canILeaveMyWashingOutTommorow();
        }
        else{
            this._canILeaveMyWashingOutToday();
        }
    }
    render() {
        return (
            <div className="can-i-leave-washing content-wrapper">
                <div className="center-text ">
                    <h1>Can I leave my washing out {this.state.checkTommorowsForecast? "tommorow" : ""}?</h1>
                    <WeatherIcon refresh={this._refresh} weather={this.state.weather} />
                    <p className="margin-top-lg">{this.state.result}</p>
                    <button class="experiment-button margin-top-lg" onClick={this._changeDay}>{this.state.checkTommorowsForecast ? "What about today?" : "What about tommorow?"}</button>
                </div>
            </div>
        );
    }
}

export default CanIleaveMyWashingOut