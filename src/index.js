import Botkit from "botkit";
import { createResponse } from "./responses/createResponse";
import {getUser} from "./services/FbApi";

const controller = Botkit.facebookbot({
    access_token: process.env.FB_PAGE_ACCESS_TOKEN,
    verify_token: process.env.VERIFY_TOKEN,
});

const bot = controller.spawn({});

controller.setupWebserver(process.env.PORT || 5000, (err, webserver) => {
    if (err) {
        throw new Error("Server is not running");
    }

    controller.createWebhookEndpoints(controller.webserver, bot, () => {
        console.log("This bot is online!!!");
    });
});

controller.hears([".*"], "message_received", async (bot, message) => {
    console.log("Message", message);
    console.log("Entities", message.nlp.entities);
    const messageWithUserInfo = {...message, currentUser: await getUser(message.user)};
    createResponse(messageWithUserInfo)
        .then((response) => {
            bot.replyWithTyping(message, response);
        })
        .catch((error) => {
            bot.replyWithTyping(message, error.message);
        });
});
