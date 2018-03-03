import Botkit from "botkit";
import { Wit } from "node-wit";
import WeatherApi from "./api/WeatherApi";

const controller = Botkit.facebookbot({
    access_token: process.env.FB_PAGE_ACCESS_TOKEN,
    verify_token: process.env.VERIFY_TOKEN,
});

const wit = new Wit({ accessToken: process.env.WIT_TOKEN });
const weatherApi = new WeatherApi(process.env.OPEN_WEATHER_TOKEN);

const bot = controller.spawn({});

controller.setupWebserver(process.env.PORT || 5000, (err, webserver) => {
    if (err) {
        throw new Error("Server is not running");
    }

    controller.createWebhookEndpoints(controller.webserver, bot, () => {
        console.log("This bot is online!!!");
    });
});

controller.hears([".*"], "message_received", (bot, message) => {
    wit.message(message.text)
        .then(data => weatherApi.getWeatherInfo(data.entities.location[0].value))
        .then((weatherInfo) => {
            bot.replyWithTyping(message, weatherInfo);
        })
        .catch((error) => {
            bot.replyWithTyping(message, error.message);
        });
});
