const Discord = require(`discord.js`);
const sql = require(`../config/Database`)

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        console.log("Member Joined")
        if (member.partial) {
            try {
                await member.fetch();
                console.log("Partial Member")
                //let messageId = member.message.id
                //let emojiName = member.emoji.name

            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                return;
            }
        }
        Data = await sql.Execute(`select * from settings where guild_id = '${member.guild.id}';`); 
        CHANNEL_ID = Data[0].welcome_channel_id
        ROLE_ID = Data[0].welcome_role_id
        GUILD = member.guild.name
        guildIcon = Data[0].guild_icon
        var playerDisplayName = member.displayName
		if (!playerDisplayName){ var playerDisplayName = member.username}
        console.log(playerDisplayName)
        
        const newMemberEmbed = new Discord.MessageEmbed()
            .setColor("#d81e5b")
            .setTitle("New Player!")
            .setDescription(`<@${member.id}> has joined the server! \nWe hope you enjoy your time here.`)
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({ text: `${GUILD}`, iconURL: 'http://phfamily.co.uk/img/gifs/SE17-Logo.jpg' })
            .setTimestamp();
            
        const welcomeEmbed = new Discord.MessageEmbed()
            .setColor("#d81e5b")
            .setTitle(`Welcome to ${GUILD}`)
            .setDescription(`${GUILD} are happy to have you! \nWe hope you enjoy your time here.`)
            .setThumbnail(Data[0].welcome_logo)
            .setFooter({ text: `${GUILD}`, iconURL: 'http://phfamily.co.uk/img/gifs/SE17-Logo.jpg' })

            .setTimestamp();
            await member.roles.add(ROLE_ID).catch((e) => console.log(e));
            await member.user.send(
                {
                    embeds: [welcomeEmbed]
                }
            );
             await member.guild.channels.cache.get(CHANNEL_ID).send(
                {
                    embeds: [newMemberEmbed]
                }
            )
     }
}