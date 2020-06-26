const Discord = require("discord.js");
let config = require('../config');

module.exports.utilisation = (message, client) => {

    if(!message) return client.logger.log('Manque argument message !', "error");
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

    const command = args.shift().toLowerCase();

    // Gets the command
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    var examples = cmd.help.examples.replace(/[$_]/g,config.prefix);
    var embed = new Discord.MessageEmbed()
        .setColor(config.embed.color)
        .setFooter(config.embed.footer)
        .addField('Standard',config.prefix+cmd.help.usage)
        .addField('Exemple(s)', examples)
    message.channel.send("Erreur, veuillez respecter la syntaxe de la commande", embed);


}