import Axios from "axios";

const weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
export default class WeatherApi {
    constructor(apiToken) {
        this.apiToken = apiToken;
    }

    getCurrentWeatherInfo(location) {
        const getWeatherInfoUrl = `${weatherApiUrl}${location}&units=metric&APPID=${this.apiToken}`;
        return Axios.get(getWeatherInfoUrl)
            .then(response => response.data)
            .catch((error) => {
                throw new Error(`Couldn\'t find weather info for ${location}`)
            });
    }
}
