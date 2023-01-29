const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
    data: new SlashCommandBuilder()
        //.setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)

        .setName("invites")
        .setDescription("Show Invites Leaderboard!"),

    async execute(Interaction) {

        await Interaction.guild.members.fetch()
        guildIcon = Interaction.member.guild.iconURL();
		guildName = Interaction.member.guild.name
        
        const invitesEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${guildName} - Invite Leaderboard`)
            .setURL('http://www.phfamily.co.uk/invites.php')
            .setThumbnail(Interaction.user.displayAvatarURL())
            .setAuthor({ name: Interaction.member.displayName, iconURL: Interaction.user.displayAvatarURL({ dynamic: true })})
            .setDescription(`**Updates Every 15 Minutes!**`)
            .setThumbnail(guildIcon)
            .setImage(`http://phfamily.co.uk/img/gifs/Influencer.gif`)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Invites Leaderboard.`, iconURL: `${guildIcon}` });
            
        console.log(`${guildName} Member Cache: ${Interaction.guild.members.cache.size}`)
        inviteBoard = await sql.Execute(`SELECT * FROM invites WHERE guildId = '${Interaction.member.guild.id}' ORDER BY uses DESC`)

        for (let i = 0; i < 25 && inviteBoard[i]; i++) invitesEmbed.addFields(
            { name: `${inviteBoard[i].invitedBy}`, value: `**Code:** ${inviteBoard[i].code} **Uses:** ${inviteBoard[i].uses}` })

        await Interaction.reply({
            ephemeral: false,
            embeds: [invitesEmbed],
        });

    },
};
