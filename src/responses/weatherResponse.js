import WeatherApi from "../services/WeatherApi";

export default class weatherResponse {
    constructor() {
        this.weatherApi = new WeatherApi(process.env.OPEN_WEATHER_TOKEN);
    }

    async currentWeatherAtLocation(location) {
        return await this.weatherApi.getCurrentWeatherInfo(location)
            .then((data) => {
                const condition = data.weather[0].description;
                const temperature = data.main.temp;
                return `The weather in ${data.name} is ${temperature}°C and ${condition}`;
            })
            .catch(error => error.message);
    }
}