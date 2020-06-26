// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(message) {
        if (message.author.bot) return;
        if (message.channel.type === 'dm') return message.channel.send("Il est impossible de me parler en privé");
        const prefixMention = new RegExp(`^<@!?${this.client.user.id}>( |)$`);
        if (message.content.match(prefixMention)) return message.reply(`Mon prefix est ${this.client.config.prefix}`);
        if (message.content.indexOf(this.client.config.prefix) !== 0) return;
        const args = message.content.slice(this.client.config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        if (message.guild && !message.member) await message.guild.members.fetch(message.author);
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
        if (!cmd) return;
        if (cmd.conf.permission) {
            if (!message.member.hasPermission(cmd.conf.permission)) return message.channel.send(`Tu n'as pas la permission pour créer un giveaway, permission requise: \`${cmd.conf.permission}\``);
        }
        if (!cmd.conf.enabled) return message.channel.send('cette commande est désactivée');
        if (cmd.conf.owner && message.author.id !== this.client.config.owner) return message.channel.send('Cette commande est réservée au développeur du bot');
        console.log(`${message.author.username} (${message.author.id}) a utilisé la commande ${cmd.help.name}`);
        cmd.run(message, args);

    }
};
