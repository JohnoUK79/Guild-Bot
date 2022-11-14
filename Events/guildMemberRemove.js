let Discord = require(`discord.js`)
const sql = require(`../config/Database`)

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
        guildIcon = member.guild.iconURL();
        Data = await sql.Execute(`select * from settings where guild_id = '${member.guild.id}';`); 
        GUILD = member.guild.name
        
        Channel_ID = Data[0].welcome_channel_id
            const goodByeEmbed = new Discord.EmbedBuilder()
            .setColor("#d81e5b")
            .setTitle("Player Left!")
            .setDescription(`<@${member.id}> has left the server! \nThey could not handle the TRUTH!.`)
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