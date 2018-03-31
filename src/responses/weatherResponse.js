import moment from "moment";
import WeatherApi from "../services/WeatherApi";

export default class weatherResponse {
    constructor() {
        this.weatherApi = new WeatherApi(process.env.OPEN_WEATHER_TOKEN);
        this.tempScale = "°C";
    }

    async formatCurrentWeatherResponse(location) {
        return await this.weatherApi.getCurrentWeatherInfo(location)
            .then((data) => {
                const condition = data.weather[0].description;
                return `The weather in ${data.name} is ${data.main.temp}${this.tempScale} (${data.main.temp_min} -> ${data.main.temp_max}) and ${condition}`;
            })
            .catch((error) => {
                console.log(error.message);
                return `Did you mistyped ${location} or may be I don\'t have weather info of that city?🙁`;
            });
    }

    async formatWeatherForecastRepose(location, userTimeZone) {
        const weatherForecast = await this.weatherApi.getWeatherForecast(location)
            .then((data) => {
                return data.list.slice(0, 5).map((info) => {
                    const dateTime = moment.unix(info.dt).utc().add(userTimeZone, "h").format("dddd, MMMM Do YYYY, h:mm:ss a");
                    const condition = info.weather[0].description;
                    return `${dateTime}, ${info.main.temp}${this.tempScale} and ${condition}`;
                });
            }).catch((error) => {
                console.log(error.message);
                return `Did you mistyped ${location} or may be I don\'t have weather forecast info of that city?🙁`
            });
        return weatherForecast.join("\n\n");
    }
}
