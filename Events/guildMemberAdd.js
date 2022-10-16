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
            } catch (error) {
                console.error('Something went wrong when fetching the member info:', error);
                return;
            }
        }
        Data = await sql.Execute(`select * from settings where guild_id = '${member.guild.id}';`); 
        guildIcon = member.guild.iconURL();
        console.log(guildIcon)
        CHANNEL_ID = Data[0].welcome_channel_id
        ROLE_ID = Data[0].welcome_role_id
        GUILD = member.guild.name
        var playerDisplayName = member.displayName
		if (!playerDisplayName){ var playerDisplayName = member.username}
        
        const newMemberEmbed = new Discord.MessageEmbed()
            .setColor("#d81e5b")
            .setTitle("New Player!")
            .setDescription(`<@${member.id}> has joined the server! \nWe hope you enjoy your time here.`)
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({ text: `${GUILD}`, iconURL: `${guildIcon}` })
            .setTimestamp();
            
        const welcomeEmbed = new Discord.MessageEmbed()
            .setColor("#d81e5b")
            .setTitle(`Welcome to ${GUILD}`)
            .setDescription(`${GUILD} are happy to have you! \nWe hope you enjoy your time here.`)
            .setThumbnail(guildIcon)
            .setFooter({ text: `${GUILD}`, iconURL: `${guildIcon}` })
            .setTimestamp();
            await member.roles.add(ROLE_ID).catch((e) => console.log(e));
            await member.guild.channels.cache.get(CHANNEL_ID).send(
                {
                    embeds: [newMemberEmbed]
                }
            );
            await member.user.send(
                {
                    embeds: [welcomeEmbed]
                }
            );
     }
}