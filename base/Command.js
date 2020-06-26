class Command {
    constructor(client, {
      name = null,
      description = false,
      usage = false,
      enabled = true,
      aliases = new Array(),
      permission = false,
      botpermissions = new Array(),
      examples = false,
      owner = false
    }) {
      this.client = client;
      this.conf = { enabled, aliases, permission, botpermissions, owner};
      this.help = { name, description, usage, examples };
    }
  }
  module.exports = Command;
  