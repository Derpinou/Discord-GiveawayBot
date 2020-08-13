const Command = require("../../base/Command.js")

module.exports = class Reroll extends Command {
    constructor (client) {
        super(client, {
            name: "reroll",
            description: "Tire nouveau gagnant lorsque le giveaway est terminé",
            examples: '$reroll 743576541447061605',
            usage: '$reroll [ID]',
            owner: false
        });
    }
    async run (message, args) {
        if(!args[0]) return this.client.errors.utilisation(message, this.client);
        await message.delete()
        let messageID = args[0];
        this.client.gv.reroll(messageID).then(() => {
            message.channel.send(`Le giveaway d'id \`${messageID}\` a été supprimé avec succés`);
        }).catch((err) => {
            message.channel.send(`Je n'arrive pas a trouver le giveaway avec l'id \`${messageID}\``);
        })
    }
}






