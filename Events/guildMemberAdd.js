const Discord = require(`discord.js`);
const sql = require(`../config/Database`)

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {

        console.log("Member Joined")
        Data = await sql.Execute(`select * from settings where guild_id = '${member.guild.id}';`); 
        CHANNEL_ID = Data[0].welcome_channel_id
        ROLE_ID = Data[0].welcome_role_id
        GUILD = member.guild.name

        const newMemberEmbed = new Discord.MessageEmbed()
            .setColor("#d81e5b")
            .setTitle("New Player!")
            .setDescription(`<@${member.user.id}> has joined the server! \nWe hope you enjoy your time here.`)
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({ text: `${GUILD}`, iconURL: 'http://phfamily.co.uk/img/gifs/PH-Family-Red.jpg' })
            .setTimestamp();
            
        const welcomeEmbed = new Discord.MessageEmbed()
            .setColor("#d81e5b")
            .setTitle(`Welcome to ${GUILD}`)
            .setDescription(`${GUILD} are happy to have you! \nWe hope you enjoy your time here.`)
            .setThumbnail(Data[0].welcome_logo)
            .setFooter({ text: `${GUILD}`, iconURL: 'http://phfamily.co.uk/img/gifs/PH-Family-Red.jpg' })

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