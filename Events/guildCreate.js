
module.exports = {
    name: 'guildCreate',
    once: true,

    async execute(guild) {
        //console.log('Guild Create', guild)
        console.log("BOT Joined Server")
        const { invites } = require('./ready')
        // We've been added to a new Guild. Let's fetch all the invites, and save it to our cache
        guild.invites.fetch().then(guildInvites => {
            // This is the same as the ready event
            invites.set(guild.id, new Map(guildInvites.map((invite) => [invite.code, invite.uses])));
        })
        //Add Guild Settings to Database
        guild.guilds.cache.map(r => {
            const id = r.id
            const name = r.name
            const icon = r.iconURL()
            const owner = r.ownerId
            const description = r.description
            const system = r.systemChannelId
            const rules = r.rulesChannelId
            const updates = r.publicUpdatesChannelId
            guildUpdate = sql.Execute(`INSERT INTO settings (guild_id, guild_name, owner_id, guild_description, updates_channel, system_channel, rules_channel, guild_icon) VALUES ('${id}', '${name}', '${owner}', '${description}', '${updates}', '${system}', '${rules}', '${icon}') ON DUPLICATE KEY UPDATE guild_name = '${name}', owner_id = '${owner}', guild_description = '${description}', updates_channel = '${updates}', system_channel = '${system}', rules_channel = '${rules}', last_updated = '${setDate}', guild_icon = '${icon}'`)
        })       
        console.log(`New Guild Settings Added`)
    }
};
