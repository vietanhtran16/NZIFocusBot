import Axios from "axios";

const weatherApiUrl = "http://api.openweathermap.org/data/2.5";
export default class WeatherApi {
    constructor(apiToken) {
        this.apiToken = apiToken;
        this.celsius = "metric";
    }

    getCurrentWeatherInfo(location) {
        return Axios.get(`${weatherApiUrl}/weather`, {
            params: {
                q: location,
                units: this.celsius,
                APPID: this.apiToken,
            },
        }).then(response => response.data).catch((error) => {
            throw new Error(`Couldn\'t find weather info for ${location}. Error: ${error.message}`);
        });
    }

    getWeatherForecast(location) {
        return Axios.get(`${weatherApiUrl}/forecast`, {
            params: {
                q: location,
                units: this.celsius,
                APPID: this.apiToken,
            }
        }).then(response => response.data).catch((error) => {
            throw new Error(`Couldn't find weather forecast info for ${location}. Error: ${error.message}`)
        })
    }
}
