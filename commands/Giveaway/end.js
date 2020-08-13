const Command = require("../../base/Command.js")

module.exports = class End extends Command {
    constructor (client) {
        super(client, {
            name: "end",
            description: "Terminez un Giveaway",
            examples: '$end 743576541447061605',
            usage: '$end [ID]',
            owner: false
        });
    }
    async run (message, args) {
        if(!args[0]) this.client.errors.utilisation(message, this.client);
        await message.delete()
        let messageID = args[0];
        this.client.gv.end(messageID).then(() => {
            message.channel.send(`Le giveaway d'id \`${messageID}\` a été terminé avec succés`);
        }).catch((err) => {
            message.channel.send(`Je n'arrive pas a trouver le giveaway avec l'id \`${messageID}\``);
        });
    }
}
