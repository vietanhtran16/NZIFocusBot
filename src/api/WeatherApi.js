import Axios from "axios";

const weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
export default class WeatherApi {
    constructor(apiToken) {
        this.apiToken = apiToken;
    }

    getWeatherInfo(location) {
        const getWeatherInfoUrl = `${weatherApiUrl}${location}&units=metric&APPID=${this.apiToken}`;
        return Axios.get(getWeatherInfoUrl)
            .then((response) => {
                return JSON.parse(response);
            })
            .then((data) => {
                const weatherCondition = data.weather[0].description;
                const temperature = data.main.temp;
                return `Current temperature in ${data.name} is ${temperature} and it is ${weatherCondition}`;
            }).catch((error) => {
                return error.message;
            })
    }
}