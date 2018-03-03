import Botkit from "botkit";
import {Wit} from "node-wit";
import WeatherApi from "./api/WeatherApi";

const controller = Botkit.facebookbot({
    access_token: process.env.FB_PAGE_ACCESS_TOKEN,
    verify_token: process.env.VERIFY_TOKEN,
});

const wit = new Wit({accessToken: process.env.WIT_TOKEN});
const weatherApi = new WeatherApi(process.env.OPEN_WEATHER_TOKEN);

const bot = controller.spawn({});

controller.setupWebserver(process.env.PORT || 5000, function (err, webserver) {
    controller.createWebhookEndpoints(controller.webserver, bot, function () {
        console.log('This bot is online!!!');
    });
});

controller.hears(['.*'], 'message_received', (bot, message) => {
    wit.message(message.text)
        .then((data) => {
            // bot.replyWithTyping(message, `Asking about ${data.entities.intent[0].value} in ${data.entities.location[0].value}`);
            const weatherInfo = weatherApi.getWeatherInfo(data.entities.location[0].value);
            bot.replyWithTyping(message, weatherInfo);
        }).catch((error) => {
        bot.replyWithTyping(message, error.message);
    });
});

controller.hears(['hello', 'hi', 'good morning'], 'message_received', function (bot, message) {

    bot.replyWithTyping(message, 'Harrow. How are you');

});

controller.hears(['What date is it?'], 'message_received', function (bot, message) {
    bot.replyWithTyping(message, `Today is ${new Date().toLocaleDateString(jk)}`);
});


