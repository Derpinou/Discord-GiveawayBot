const Command = require("../../base/Command.js")

class Delete extends Command {

    constructor (client) {
        super(client, {
            name: "delete",
            description: "supprimez un giveaway avec l'id précisé",
            usage: `delete [MessageId]`,
            enabled: true,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES" ],
            examples: "$delete 716590214642139186",
            owner: false
        });
    }

    async run (message, args) {
        if(!args[0]) this.client.errors.utilisation(message, this.client);
        await message.delete()
        let messageID = args[0];
        this.client.gv.delete(messageID).then(() => {
            message.channel.send(`Le giveaway d'id \`${messageID}\` a été supprimé avec succés`);
        }).catch((err) => {
            message.channel.send(`Je n'arrive pas a trouver le giveaway avec l'id \`${messageID}\``);
        });
    }

}
module.exports = Delete;

