export default {
    formatGreetingResponse(user) {
        const greetings = [`Hello ${user.name}. How are you doing today?`, `What's up ${user.name}?`, `Yeah nah. Hello ${user.name}`];
        return greetings[this.getRandomGreetingMsg(greetings)];
    },

    getRandomGreetingMsg(greetings) {
        return Math.floor(Math.random() * greetings.length);
    },
};
