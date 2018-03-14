import Axios from "axios";

const weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
export default class WeatherApi {
    constructor(apiToken) {
        this.apiToken = apiToken;
    }

    getWeatherInfo(location) {
        const getWeatherInfoUrl = `${weatherApiUrl}${location}&units=metric&APPID=${this.apiToken}`;
        return Axios.get(getWeatherInfoUrl)
            .then(response => response.data)
            .then((data) => {
                const condition = data.weather[0].description;
                const temperature = data.main.temp;
                return `The weather in ${data.name} is ${temperature}°C and ${condition}`;
            })
            .catch(error => error.message);
    }
}
