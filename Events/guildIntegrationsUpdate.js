const sql = require(`../config/Database`)

module.exports = {
    name: 'guildIntegrationsUpdate',
    async execute(integration) {
        console.log(`Guild Integrations Update:\n${integration}`)
    }
};
