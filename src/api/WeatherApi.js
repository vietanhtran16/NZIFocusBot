import Axios from "axios";

const weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
export default class WeatherApi {
    constructor(apiToken){
        this.apiToken = apiToken;
    }

    getWeatherInfo(location) {
        const getWeatherInfoUrl = `${weatherApiUrl}${location}&units=metric&APPID=${this.apiToken}`;
        return Axios.get(getWeatherInfoUrl).then((response) => {
            const weatherCondition = response.weather[0].description;
            const temperature = response.main.temp;
            return `Current temperature in ${response.name} is ${temperature} and it is ${weatherCondition}`;
        }).catch((error) => {
            return error.message;
        })
    }
}