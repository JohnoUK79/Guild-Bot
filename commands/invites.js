const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invites")
        .setDescription("Show Invites Leaderboard!"),

    async execute(interaction) {

        await interaction.guild.members.fetch()
        guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
        
        const invitesEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${guildName} - Invite Leaderboard`)
            .setURL('http://www.battle-bot.com/invites.php')
            .setThumbnail(interaction.user.displayAvatarURL())
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setDescription(`**Updates Every 15 Minutes!**`)
            .setThumbnail(guildIcon)
            .setImage(`http://battle-bot.com/img/gifs/Influencer.gif`)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Invites Leaderboard.`, iconURL: `${guildIcon}` });
            
        console.log(`${guildName} Member Cache: ${interaction.guild.members.cache.size}`)
        inviteBoard = await sql.Execute(`SELECT * FROM invites WHERE guildId = '${interaction.member.guild.id}' AND uses > 0 ORDER BY uses DESC`)

        for (let i = 0; i < 25 && inviteBoard[i]; i++) invitesEmbed.addFields(
            { name: `${inviteBoard[i].invitedBy}`, value: `**Code:** ${inviteBoard[i].code} **Uses:** ${inviteBoard[i].uses}` })

        await interaction.reply({
            ephemeral: false,
            embeds: [invitesEmbed],
        });

    },
};
