import WeatherApi from "../services/WeatherApi";

export default class weatherResponse {
    constructor() {
        this.weatherApi = new WeatherApi(process.env.OPEN_WEATHER_TOKEN);
    }

    async formatCurrentWeatherResponse(location) {
        return await this.weatherApi.getCurrentWeatherInfo(location)
            .then((data) => {
                const condition = data.weather[0].description;
                const tempScale = "°C";
                const currentTemp = data.main.temp;
                const minTemp = data.main.temp_min;
                const maxTemp = data.main.temp_max;
                return `The weather in ${data.name} is ${currentTemp}${tempScale} (${minTemp}${tempScale} -> ${maxTemp}${tempScale}) and ${condition}`;
            })
            .catch((error) => {
                console.log(error.message);
                return `Did you mistyped ${location} or may be I don\'t have weather info of that city?🙁`;
            });
    }
}