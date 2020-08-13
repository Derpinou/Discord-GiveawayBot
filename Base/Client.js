const { Client, Collection} = require('discord.js'),
    {GiveawaysManager} = require("discord-giveaways");





module.exports = class GiveawayBot extends Client {
    constructor(options) {
        super(options);
        this.prefix = require("../config").prefix
        this.config = require("../config.js"); // Load the config file
        this.commands = new Collection(); // Creates new commands collection
        this.errors = require('../utils/errors');
        this.gv = new GiveawaysManager(this, {
            storage: "./data/giveaways.json", //Dossier de stockage des giveaway
            updateCountdownEvery: 5000,//Temps de raffraichissement du compteur (moins de 5 secondes peut provoquer un rate limite)
            default: {
                botsCanWin: false, //Les bots ne peuvent pas gagner
                exemptPermissions: [],//Tous les membres qui participent avec ces permissions ne peuvent pas gagner
                embedColor: this.config.embed.color, //Couleur définie dans le config.js
                reaction: "🎉"//réaction
            }
        });
    }
}
