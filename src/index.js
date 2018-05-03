import Botkit from "botkit";
import { createResponse } from './responses/responseCreator';
import { getUser } from "./services/FbApi";

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

controller.api.messenger_profile.greeting("Chào bạn mình có thể giúp gì cho bạn?");

controller.api.nlp.enable(process.env.WIT_TOKEN);

controller.hears([".*"], "message_received", async (bot, message) => {
    console.log("Message", message.nlp ? message.nlp.entities : "It is not here" );
    const messageWithUserInfo = {...message, currentUser: await getUser(message.user)};
    
    const response = createResponse(messageWithUserInfo);
    bot.replyWithTyping(message, response);
});
