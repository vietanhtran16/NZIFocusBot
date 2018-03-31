import {Intent} from "../enums/Intent";
import weatherResponse from "../responses/weatherResponse";
import greetUserResponse from "../responses/greetUserResponse";

const WeatherResponse = new weatherResponse();

export async function mapIntentWithResponse(message) {
    const defaultResponse = "I am not that smart yet. Have you tried Google it?";
    if (!message.nlp.entities.intent || message.nlp.entities.intent.length === 0) {
        return await mapOtherEntities(message, defaultResponse);
    }
    return await mapIntentEntities(message, defaultResponse);
}


async function mapOtherEntities(message, defaultResponse) {
    if(message.nlp.entities[Intent.WEATHER_FORECAST_AT_LOCATION]){
        return await WeatherResponse.formatWeatherForecastRepose(message.nlp.entities.location[0].value, message.currentUser.timezone);
    }
    return defaultResponse;
}

async function mapIntentEntities(message, defaultResponse) {
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
