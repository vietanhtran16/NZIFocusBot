import Botkit from "botkit";
import { Wit } from "node-wit";
import { createResponse } from "./responses/createResponse";

const controller = Botkit.facebookbot({
    access_token: process.env.FB_PAGE_ACCESS_TOKEN,
    verify_token: process.env.VERIFY_TOKEN,
});

const wit = new Wit({ accessToken: process.env.WIT_TOKEN });
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
    console.log(message.nlp.entities);
    if(message.nlp.entities.location){
        console.log(message.nlp.entities.location);
    }
    console.log(message.nlp.entities.intent);
    wit.message(message.text)
        .then(data => createResponse(data))
        .then((response) => {
            bot.replyWithTyping(message, response);
        })
        .catch((error) => {
            bot.replyWithTyping(message, error.message);
        });
});
