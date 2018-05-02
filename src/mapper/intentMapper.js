import { Intent } from "../enums/Intent";
import weatherResponse from "../responses/weatherResponse";
import greetUserResponse from "../responses/greetUserResponse";

const WeatherResponse = new weatherResponse();

export async function mapIntentWithResponse(message) {
    return "Chào bạn. Bạn gửi câu hỏi qua cho mình nhé";
}
