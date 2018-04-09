import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import jsonp from "jsonp";

import config from "../config/beta/config.beta.json";


class WeatherCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "Pune",
            lat: "19.00",
            lon: "72.82",
            countryId: 'in',
            weather: {}
        };
        this.getLocation = this.getLocation.bind(this);
        this.getWeather = this.getWeather.bind(this);
    }

    getLocation() {
        if (!!navigator.geolocation) {
            // Support
            const options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            };
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log("inside location success", position);
                this.setState({ lat: position.coords.latitude, lon: position.longitude });
            }, function (error) {
                alert("Failed to get location details.")
                console.log("inside location error", error);
            }, options);

        } else {
            // No support
            alert("HTML5 location API is not supported.")
        }
    }
    componentDidMount() {
        //this.getLocation();
        this.getWeather();

    }

    async getWeather() {
        try {
            const response = await axios.get(`${config.apiServer}/data/2.5/forecast?appid=${config.appId}&lat=${this.state.lat}&lon=${this.state.lon}`)
            //const response = await axios.get(`${config.apiServer}/data/2.5/forecast?appid=${
            // config.appId}&q=${this.state.city},${this.state.countryId}`);
            console.log("inside async axios get: ", response)
        } catch (error) {
            console.log("inside async err: ", error)
        }
    }

    render() {
        return (
            <React.Fragment>
                <h4>show weather here</h4>
                <div>City : {this.state.city}</div>
            </React.Fragment>
        );
    }
}
export default WeatherCard;
