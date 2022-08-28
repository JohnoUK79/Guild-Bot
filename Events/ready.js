const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { token, CLIENT_ID, GUILD_ID } = require('../config.json');
const nodeCron = require("node-cron");
const time = require('../config/timestamp');
setDate = time.UTCdefault()

module.exports = {
    name: 'ready',
    once: true,
    async execute(client, commands) {     
        console.log("Guild ID - Guild Name - Guild Icon - Owner ID - Guild Description - Locale - Updates Channel - System Channel - Rules Channel")
        console.log(client.guilds.cache.map(r => `${r.id} - ${r.name} - ${r.icon} - ${r.ownerId} - ${r.description} - ${r.preferredLocale} - ${r.publicUpdatesChannelId} - ${r.systemChannelId} - ${r.rulesChannelId}`));
        console.log(`${setDate} - Logged in as - ${client.user.tag}`);
        const rest = new REST({ version: '10' }).setToken(token);
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
            .then(() => {
                console.log('Successfully registered application commands');
            })
            .catch(console.error);

        console.log('================ BOT Ready! ================');
            const job = nodeCron.schedule("0 0,4,8,12,16,20 * * *", () => {
                const jurisdictions = require('../data/jurisdictions');
                const jurisdictionsChannelIDs = [
                '1005576978767806575', //PH Family Server
                '874703585626165288', //WARMACHINE
                '958408697703432274', //PHAK / EA / AA Server
                '979762566861561906', //PH40 Reborn 
                ];
                const hourUTC = (new Date()).getUTCHours();
                const dayOfWeeek = (new Date()).getDay();
            console.log(new Date().toLocaleString(), "Jurisdiction Event Starting");

            const { MessageEmbed } = require('discord.js');
                    
                    if( (hourUTC % 4) !== 0) return console.log('Jurisdiction Already Running!');

                    const padHour = (hour) => (hour.length === 1) ? '0'+hour : hour;
                    const startHour = padHour(hourUTC+'');
                    const endHour = padHour((hourUTC === 20) ? '00' : (hourUTC+4)+'');

                    const jurisdiction = jurisdictions[dayOfWeeek+'-'+startHour];

                    if(!jurisdiction) {
                    console.log(`ERROR: ${dayOfWeeek+'-'+startHour} not found`);
                    return;
                    }

                    const jurisdictionEmbed = new MessageEmbed()
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
                        .setFooter({ text: `${jurisdiction.title}.`, iconURL: 'https://i.ibb.co/r5xScqV/78893-FB5-9973-430-D-ABA2-A81-B13-D5-DC3-B.jpg' });


                    for (let i = 0; i < jurisdictionsChannelIDs.length; i++) {
                    let jurisdictionsChannelID = jurisdictionsChannelIDs[i];
                    
                    try {  
                        let sendChannel = client.channels.cache.get(jurisdictionsChannelID)                  
                        sendChannel.send({ content: '**New Jurisdiction**', embeds: [jurisdictionEmbed] })

                    }
                    catch (e) {
                        console.log(e);
                        console.log(jurisdictionsChannelID);
                    }
}
                  });

    },
    
};
