import WeatherApi from "./WeatherApi";

const weatherApi = new WeatherApi(process.env.OPEN_WEATHER_TOKEN);

export function createResponse(witResponse) {
    switch (witResponse.entities.intent.value) {
        case "weather_at_location":
            return weatherApi.getWeatherInfo(witResponse.entities.location[0].value);
            break;
        default:
            return "I am not that smart yet. Have you tried Google it?";
    }
}
