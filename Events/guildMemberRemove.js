let {EmbedBuilder} = require(`discord.js`)
const sql = require(`../config/Database`)
const { sleep } = require('../functions/discordFunctions')

module.exports = {
    name: "guildMemberRemove",
    async execute(member) {
        //console.log('Guild Member Remove', member)
        console.log("Member Left")
        if (member.partial) {
            try {
                await member.fetch();
                console.log("Partial Member")
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                return;
            }
        }
        guildIcon = member.guild.iconURL();
        const Data = await sql.Execute(`select * from settings where guild_id = '${member.guild.id}';`); 
        GUILD = member.guild.name
        await sleep(2000)
        playerDisplayName = member.displayName
		if (!playerDisplayName){ playerDisplayName = member.username}

        const Channel_ID = Data[0].welcome_channel_id
        console.log(Channel_ID)
            const goodByeEmbed = new EmbedBuilder()
            .setColor("#d81e5b")
            .setTitle("Weak Warrior Left!")
            .setDescription(`${playerDisplayName} has left the server! \nThey could not handle the Heat of the **Battle Bot™**!.`)
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({ text: `${GUILD}`, iconURL: `${guildIcon}` })
            .setTimestamp();

            await member.guild.channels.cache.get(Channel_ID).send(
                {
                    embeds: [goodByeEmbed]
                }
            )
    }
}