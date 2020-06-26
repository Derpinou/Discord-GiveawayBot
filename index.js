// Load up the discord.js library
const {Client, Collection} = require("discord.js");
// We also load the rest of the things we need in this file:
const {promisify} = require("util"),
    fs = require('fs'),
    path = require("path"),
    readdir = promisify(require("fs").readdir);
const {GiveawaysManager} = require("discord-giveaways");
var config = require("./config");


// Creates new class
class Giveaway extends Client {

    constructor(options) {
        super(options);
        this.config = require("./config.js"); // Load the config file
        this.commands = new Collection(); // Creates new commands collection
        this.aliases = new Collection(); // Creates new command aliases collection
        this.logger = require("./utils/Logger");
        this.errors = require('./utils/errors')
    }

    loadCommand(commandPath, commandName) {
        try {
            const props = new (require(`${commandPath}${path.sep}${commandName}`))(this);
            this.logger.log(`Chargement de la commande ${props.help.name}. 👌`, "log");
            props.conf.location = commandPath;
            if (props.init) {
                props.init(this);
            }
            this.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                this.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (e) {
            return `Impossible de charger la commande: ${commandName}: ${e}`;
        }
    }

}

const client = new Giveaway({fetchAllMembers: true});
client.config = config;
// GiveAway part
const manager = new GiveawaysManager(client, {
    storage: "./data/giveaways.json", //Dossier de stockage des giveaway
    updateCountdownEvery: 5000,//Temps de raffraichissement du compteur (moins de 5 secondes peut provoquer un rate limite)
    default: {
        botsCanWin: false, //Les bots ne peuvent pas gagner
        exemptPermissions: [],//Tous les membres qui participent avec ces permissions ne peuvent pas gagner
        embedColor: config.embed.color, //Couleur définie dans le config.js
        reaction: "🎉"//réaction
    }
});
client.gv = manager

const init = async () => {


    fs.readdir("./commands/", (err, content) => {
        if (err) console.log(err);
        if (content.length < 1) return console.log('Veuillez créer un dossier commande');
        var groups = [];
        content.forEach(element => {
            if (!element.includes('.')) groups.push(element);
        });
        groups.forEach(folder => {
            fs.readdir("./commands/" + folder, (e, files) => {
                let js_files = files.filter(f => f.split(".").pop() === "js");
                if (js_files.length < 1) return console.log('Veuillez créer des fichiers dans le dossier "' + folder + '"');
                if (e) console.log(e);
                js_files.forEach(element => {
                    const response = client.loadCommand('./commands/' + folder, `${element}`);
                    if (response) client.logger.error(response);
                });
            });
        });
    });

    const evtFiles = await readdir("./events/");
    client.logger.log(`Chargement total de ${evtFiles.length} events.`, "log");
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        client.logger.log(`Event chargé: ${eventName}`);
        const event = new (require(`./events/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args).catch(err => console.log(err)));
        delete require.cache[require.resolve(`./events/${file}`)];
    });

    client.login(client.config.token); //Connexion a l'api discord

};

init();


process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
});
module.exports = client;