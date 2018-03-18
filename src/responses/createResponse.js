import greetUserResponse from "./greetUserResponse";
import {Intent} from "../enums/Intent";
import weatherResponse from "./weatherResponse";

const WeatherResponse = new weatherResponse();

export async function createResponse(witResponse) {
    const defaultResponse = "I am not that smart yet. Have you tried Google it?";
    if(!witResponse.entities.intent || witResponse.entities.intent.length === 0)
    {
        return defaultResponse;
    }
    switch (witResponse.entities.intent[0].value) {
        case Intent.CURRENT_WEATHER_AT_LOCATION:
            return await WeatherResponse.formatCurrentWeatherResponse(witResponse.entities.location[0].value);
            break;
        case Intent.GREETINGS:
            return greetUserResponse.sayHello();
        default:
            return defaultResponse;
    }
}
