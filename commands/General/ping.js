const Command = require("../../Base/Command.js");

module.exports = class Ping extends Command {
    constructor (client) {
        super(client, {
            name: "ping",
            description: "Pong",
            examples: "$ping",
            usage: "$ping",
            owner: false,
        });
    }
    async run (message) {
        message.reply("Pong")
    }
}


