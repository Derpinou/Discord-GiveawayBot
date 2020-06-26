const Command = require("../../base/Command.js")

class End extends Command {

    constructor (client) {
        super(client, {
            name: "end",
            description: "Terminez un Giveaway",
            usage: `end [MessageId]`,
            enabled: true,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            examples: "$end 716590214642139186",
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
module.exports = End;