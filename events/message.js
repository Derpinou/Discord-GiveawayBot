module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(message) {
        if (message.channel.type === 'dm') {
            await message.author.react(':x:')
        }
        let prefix = this.client.prefix
        if (message.content.indexOf(prefix) !== 0) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const cmd = this.client.commands.get(command)
        if (!cmd) return;
        // checks if the command can be launched
        if (cmd.config.owner && !message.author.id.includes(this.client.config.owner)) return message.channel.send("Cette commande est réservée aux propriétaires");
        console.log(`${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
        await cmd.run(message, args);
    }
};
