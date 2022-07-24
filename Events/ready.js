const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { token, CLIENT_ID, GUILD_ID } = require('../config.json');
const timestamp = require('time-stamp');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client, commands) {     
        console.log("Guild ID - Guild Name - Guild Icon - Owner ID - Guild Description - Locale - Updates Channel - System Channel - Rules Channel")
        console.log(client.guilds.cache.map(r => `${r.id} - ${r.name} - ${r.icon} - ${r.ownerId} - ${r.description} - ${r.preferredLocale} - ${r.publicUpdatesChannelId} - ${r.systemChannelId} - ${r.rulesChannelId}`));
        const guild = client.guilds.cache
        //console.log(guild)
        console.log(`${(timestamp.utc('YYYY/MM/DD HH:mm:ss'))} - Logged in as - ${client.user.tag}`);
        const rest = new REST({ version: '10' }).setToken(token);
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
            .then(() => {
                console.log('Successfully registered application commands');
            })
            .catch(console.error);

        console.log('================ BOT Ready! ================');
    },
    
};
