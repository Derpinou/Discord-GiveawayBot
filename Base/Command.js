module.exports = class Command {
    constructor(client, {
        name = null,
        description = false,
        examples = false,
        usage = false,
        permission = [],
        owner = false,
    })
    {
        this.client = client;
        this.client = client;
        this.config = {
            permission,
            owner
        };
        this.help = {
            name,
            description,
            examples,
            usage
        };
    }
}
