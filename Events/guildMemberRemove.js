let {EmbedBuilder} = require(`discord.js`)
const sql = require(`../config/Database`)
const { sleep } = require('../functions/discordFunctions')

module.exports = {
    name: "guildMemberRemove",
    async execute(member) {

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
        const guildIcon = member.guild.iconURL();
        const Data = await sql.Execute(`select * from settings where guild_id = '${member.guild.id}';`); 
        const GUILD = member.guild.name
        await sleep(2000)
        playerDisplayName = member.displayName
		if (!playerDisplayName){ playerDisplayName = member.username}

        const Channel_ID = Data[0].system_channel

		let battleBotRole = interaction.guild.roles.cache.find(role => role.name === "Battle-Bot");
            if (!battleBotRole) {
                console.log(`No Role Found`)
                let battleBotRole = await interaction.guild.roles.create({ 
                    name: 'Battle-Bot',
                    color: '#72ddf7', //Light Blue
                    mentionable: true,
                    hoist: true,
            })
                console.log(`New Role Created`)
                } else {
                console.log(`Existing Role`)
                battleBotRole.edit({
                    color: '#72ddf7', //Light Blue
                    mentionable: true,
                    hoist: true,
                })
            }
            await sleep(2000)

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