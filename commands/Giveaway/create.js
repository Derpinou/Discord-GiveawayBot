const Command = require("../../base/Command.js"),
    ms = require('ms')

module.exports = class Create extends Command {
    constructor (client) {
        super(client, {
            name: "create",
            description: "Créez un giveaway",
            examples: '$create 1d 1w Nitro',
            usage: '$create [temps] [Nombre de gagnants] [Prix]',
            owner: false
        });
    }
    async run (message, args) {
        if (!args[0] || !args[1] ||!args[2]) return this.client.errors.utilisation(message, this.client);
        await message.delete()
        await this.client.gv.start(message.channel, {
            time: ms(args[0]),
            prize: args.slice(2).join(" "),
            winnerCount: parseInt(args[1]),
            hostedBy: message.author.toString(),
            messages: {
                giveaway: "\n\n🎉🎉 **GIVEAWAY** 🎉🎉",
                giveawayEnded: "\n\n🎉🎉 **GIVEAWAY Fini** 🎉🎉",
                timeRemaining: "Temps Restant **{duration}**!",
                inviteToParticipate: "Réagis avec 🎉 pour participer!",
                winMessage: "Bravo, {winners}! tu gagne **{prize}**!",
                embedFooter: "Giveaways",
                noWinner: "Giveaway annulé, pas de participants valides",
                hostedBy: "Fait par: {user}",
                winners: "Gagnant(s)",
                endedAt: "Finis dans",
                units: {
                    seconds: "secondes",
                    minutes: "minutes",
                    hours: "heures",
                    days: "jours",
                    pluralS: false
                }
            }
        });
    }
}



