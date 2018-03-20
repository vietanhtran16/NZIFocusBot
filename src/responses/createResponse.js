import greetUserResponse from "./greetUserResponse";
import { Intent } from "../enums/Intent";
import weatherResponse from "./weatherResponse";

const WeatherResponse = new weatherResponse();

export async function createResponse(message) {
    const defaultResponse = "I am not that smart yet. Have you tried Google it?";
    if (!message.nlp.entities.intent || message.nlp.entities.intent.length === 0) {
        return defaultResponse;
    }
    switch (message.nlp.entities.intent[0].value) {
        case Intent.CURRENT_WEATHER_AT_LOCATION:
            return await WeatherResponse.formatCurrentWeatherResponse(message.nlp.entities.location[0].value);
            break;
        case Intent.GREETINGS:
            return greetUserResponse.formatGreetingResponse(message.currentUser);
        default:
            return defaultResponse;
    }
}
