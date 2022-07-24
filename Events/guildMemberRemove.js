let Discord = require(`discord.js`)
const sql = require(`../config/Database`)

module.exports = {
    name: "guildMemberRemove",
    async execute(member) {
        console.log("Member Left")
        Data = await sql.Execute(`select * from settings where guild_id = '${member.guild.id}';`); 
        GUILD = member.guild.name
        Channel_ID = Data[0].welcome_channel_id
            const MemberEmbed = new Discord.MessageEmbed()
            .setColor("#d81e5b")
            .setTitle("Player Left!")
            .setDescription(`${member.user} has left the server! \nThey could not handle the TRUTH!.`)
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({ text: `${GUILD}`, iconURL: 'https://i.imgur.com/IxBdjfl.jpg' })
            .setTimestamp();

            member.guild.channels.cache.get(Channel_ID).send(
                {
                    embeds: [MemberEmbed]
                }
            )
    }
}