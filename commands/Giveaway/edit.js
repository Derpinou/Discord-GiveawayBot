const Command = require("../../base/Command.js"),
    ms = require('ms'),
    {MessageEmbed} = require('discord.js');

module.exports = class Edit extends Command {
    constructor (client) {
        super(client, {
            name: "edit",
            description: "ajoutez du temps, modifiez le nombre de gagnants et le prix",
            examples: '$edit 743576541447061605 2d 2w Nitro Game',
            usage: '$edit [ID] [Temps] [[Nombre de gagnants] ] [Prix]',
            owner: false
        });
    }
    async run (message, args) {
        if (!args[0] || !args[1] ||!args[2] ||!args[3]) return this.client.errors.utilisation(message, this.client);
        let messageID = args[0];
        this.client.gv.edit(messageID, {
            newWinnerCount: parseInt(args[2]),
            newPrize: args.slice(3).join(" "),
            addTime: ms(args[1]),
        }).then(() => {
            message.channel.send(new MessageEmbed()
                .setColor(this.client.config.embed.color)
                .setFooter(this.client.config.embed.footer, this.client.user.displayAvatarURL())
                .setAuthor('Giveaway')
                .setDescription(`Le giveaway d'id \`${messageID}\` a été édité avec les parametres suivants:`)
                .addField('Temps supplémentaire:', ms(args[0]))
                .addField('Prix a gagner:',  args.slice(3).join(" "))
                .addField('Nombre de gagnants:',parseInt(args[2]) )
            );
        }).catch((err) => {
            message.channel.send('une erreur s\'est produite, veuillez réessayer!');
            console.log(err)
        });
    }
}
