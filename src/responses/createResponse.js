import WeatherApi from "./WeatherApi";
import GreetUser from "./GreetUser";
import {Intent} from "../enums/Intent";

const weatherApi = new WeatherApi(process.env.OPEN_WEATHER_TOKEN);

export async function createResponse(witResponse) {
    const defaultResponse = "I am not that smart yet. Have you tried Google it?";
    if(!witResponse.entities.intent || witResponse.entities.intent.length === 0)
    {
        return defaultResponse;
    }
    switch (witResponse.entities.intent[0].value) {
        case Intent.CURRENT_WEATHER_AT_LOCATION:
            return await weatherApi.getWeatherInfo(witResponse.entities.location[0].value);
            break;
        case Intent.GREETINGS:
            return GreetUser.sayHello();
        default:
            return defaultResponse;
    }
}
