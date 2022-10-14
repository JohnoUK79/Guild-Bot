const sql = require(`../config/Database`)

module.exports = {
    name: 'guildCreate',
    once: true,

    async execute(client) {
        client.guilds.cache.map(r => {
            const id = r.id
            const name = r.name
            const icon = r.icon
            const owner = r.ownerId
            const description = r.description
            const system = r.systemChannelId
            const rules = r.rulesChannelId
            const updates = r.publicUpdatesChannelId
            guildUpdate = sql.Execute(`INSERT INTO settings (guild_id, guild_name, owner_id, guild_description, updates_channel, system_channel, rules_channel) VALUES ('${id}', '${name}', '${owner}', '${description}', '${updates}', '${system}', '${rules}') ON DUPLICATE KEY UPDATE guild_name = '${name}', owner_id = '${owner}', guild_description = '${description}', updates_channel = '${updates}', system_channel = '${system}', rules_channel = '${rules}', last_updated = '${setDate}'`)
        })       
        console.log(`New Guild Settings Added`)
    }
};
