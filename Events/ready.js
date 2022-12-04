const { REST, Routes, Collection } = require('discord.js');
const { token, CLIENT_ID, GUILD_ID } = require('../config.json');
const nodeCron = require("node-cron");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()
const sql = require("../config/Database");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client, commands) {     
        //await client.application.commands.set([]); // Reset Global Commands
        //const guild = await client.guilds.fetch(GUILD_ID);
        //guild.commands.set([]);  //to be used to reset guild commands when transferring to global  
        
        console.log(`${setDate} - Logged in as - ${client.user.tag}`);
        const rest = new REST({ version: '10' }).setToken(token);
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands }) //Global Commands
        //await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands }) //Guild Only Commands
            .then(() => {
                console.log(`Successfully registered Global Commands!`);
            })
            .catch(console.error);

        console.log('================ PH40 BOT Ready! ================');

        const InvitesDB = new Map();
        client.guilds.cache.forEach(guild => {
            guild.invites.fetch()
                .then(invites => {
                    console.log(`Invites Cached: ${guild.name}`);
                    const codeUses = new Map();
                    invites.each(inv => {
                        const code = inv.code
                        const temporary = inv.temporary
                        const maxAge = inv.maxAge
                        const uses = inv.uses
                        const maxUses = inv.maxUses
                        const inviter = inv.inviter
                        const inviterId = inv.inviterId
                        const channel = inv.channel 
                        const channelId = inv.channelId 
                        const id = guild.id
                        const name = guild.name
                        invitesUpdate = sql.Execute(`INSERT INTO invites (code, guildId, guildName, invitedBy, uses, maxUses, maxAge, temporary, channel, lastupdated) VALUES ('${code}', '${id}', '${name}', '${inviter}', '${uses}', '${maxUses}', '${maxAge}', '${temporary}', '${channel}', '${setDate}') ON DUPLICATE KEY UPDATE uses = '${uses}', maxUses = '${maxUses}', maxAge = '${maxAge}', temporary = '${temporary}', channel = '${channel}', lastupdated = '${setDate}'`)
                        //console.log(code, temporary, maxAge, uses, maxUses, inviter, channel)
                        codeUses.set(inv.code, inv.uses)
                    });
                    InvitesDB.set(guild.id, codeUses)
                    //console.log(InvitesDB)

                })
                .catch(err => {
                    console.log("Invite Cache Error:", err)
                })
        })
        console.log(guildInvites)
              const guildSettingsUpdate = nodeCron.schedule("0 22 * * *", () => {
                console.log("Guild Settings Update")

                client.guilds.cache.map(r => {
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
                console.log(`Guild Settings Updated`)      
            })  
            const job = nodeCron.schedule("0 0,4,8,12,16,20 * * *", () => {
                const jurisdictions = require('../data/jurisdictions');
                const jurisdictionsChannelIDs = require(`../data/jurisdictionsChannelIDs`).jurisdictionsChannelIDs
                console.log(jurisdictionsChannelIDs)
                const hourUTC = (new Date()).getUTCHours();
                const dayOfWeeek = (new Date()).getDay();

            console.log(new Date().toLocaleString(), "Jurisdiction Event Starting");
            const { EmbedBuilder, Client } = require('discord.js');
                    
                    if( (hourUTC % 4) !== 0) return console.log('Jurisdiction Already Running!');

                    const padHour = (hour) => (hour.length === 1) ? '0'+hour : hour;
                    const startHour = padHour(hourUTC+'');
                    const endHour = padHour((hourUTC === 20) ? '00' : (hourUTC+4)+'');

                    const jurisdiction = jurisdictions[dayOfWeeek+'-'+startHour];

                    if(!jurisdiction) {
                    console.log(`ERROR: ${dayOfWeeek+'-'+startHour} not found`);
                    return;
                    }

                    const jurisdictionEmbed = new EmbedBuilder()
                        .setColor('#0099ff')
                        .setTitle(jurisdiction.title)
                        .setURL('http://www.phfamily.co.uk')
                        .setDescription(`Start: ${startHour}H00 UTC    -    End: ${endHour}H00 UTC`)
                        .addFields(
                            { name: `Missions:`, value: jurisdiction.missions.join('\n'), inline: false },
                            { name: `Rank 1`, value: `${jurisdiction.rank1} Points`, inline: true },
                            { name: `Rank 2`, value: `${jurisdiction.rank2} Points`, inline: true },
                            { name: `Rank 3`, value: `${jurisdiction.rank3} Points`, inline: true },

                        )
                        .setTimestamp()
                        .setFooter({ text: `${jurisdiction.title}.`, iconURL: 'http://phfamily.co.uk/img/gifs/Warpath.jpg' });


                    for (let i = 0; i < jurisdictionsChannelIDs.length; i++) {
                    let jurisdictionsChannelID = jurisdictionsChannelIDs[i];
                    
                    try {  
                        let sendChannel = client.channels.cache.get(jurisdictionsChannelID)                
                        console.log(jurisdictionsChannelID);
                        sendChannel.send({ content: '**New Jurisdiction**', embeds: [jurisdictionEmbed] })

                    }
                    catch (e) {
                        console.log(e);
                        console.log(jurisdictionsChannelID);
                    }
}
                  });
    },

}

