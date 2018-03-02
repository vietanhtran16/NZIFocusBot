import Botkit from "botkit";
import {Wit} from "node-wit";

const controller = Botkit.facebookbot({
    access_token: process.env.FB_PAGE_ACCESS_TOKEN,
    verify_token: process.env.VERIFY_TOKEN,
});

const wit = new Wit({accessToken: process.env.WIT_TOKEN});

const bot = controller.spawn({});

controller.setupWebserver(process.env.PORT || 5000,function(err,webserver) {
    controller.createWebhookEndpoints(controller.webserver, bot, function() {
        console.log('This bot is online!!!');
    });
});

controller.hears(['.*'], 'message_received', (bot, message) => {
    wit.message(message.text)
        .then((data) => {
            return JSON.stringify(data);
        }).then((witResponse) => {
        bot.replyWithTyping(message, `${witResponse}`);
    }).catch((error) => {
        bot.replyWithTyping(message, error.message);
    });
});

controller.hears(['hello', 'hi', 'good morning'], 'message_received', function(bot, message) {

    bot.replyWithTyping(message, 'Harrow. How are you');

});

controller.hears(['What date is it?'], 'message_received', function(bot, message) {
    bot.replyWithTyping(message, `Today is ${new Date().toLocaleDateString(jk)}`);
});


