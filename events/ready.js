module.exports = class {
    constructor (client) {
        this.client = client;
    }
    async run () {
        this.client.appInfo = await this.client.fetchApplication();
        setInterval( async () => {
            this.client.appInfo = await this.client.fetchApplication();
        }, 60000);

        this.client.logger.log(`Chargement total de ${this.client.commands.size} commande(s).`, 'log');
        this.client.logger.log(`${this.client.user.tag}, pret a servir ${this.client.users.cache.size} utilisateurs dans ${this.client.guilds.cache.size} serveurs.`, "ready");
        let games = this.client.config.games
        let status = this.client.config.status

        this.client.user.setPresence({ activity: { name: games }, status: status })
    }
}  