import Axios from "axios";

const weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather";
export default class WeatherApi {
    constructor(apiToken) {
        this.apiToken = apiToken;
    }

    getCurrentWeatherInfo(location) {
        return Axios.get(weatherApiUrl, {
            params: {
                q: location,
                units: "metric",
                APPID: this.apiToken
            }
        }).then(response => response.data).catch((error) => {
            throw new Error(`Couldn\'t find weather info for ${location}`)
        });
    }
}
