import WeatherApi from "./WeatherApi";

const weatherApi = new WeatherApi(process.env.OPEN_WEATHER_TOKEN);

export async function createResponse(witResponse) {
    const defaultResponse = "I am not that smart yet. Have you tried Google it?";
    if(!witResponse.entities.intent || witResponse.entities.intent.length === 0)
    {
        return defaultResponse;
    }
    switch (witResponse.entities.intent[0].value) {
        case "weather_at_location":
            return await weatherApi.getWeatherInfo(witResponse.entities.location[0].value);
            break;
        default:
            return defaultResponse;
    }
}
