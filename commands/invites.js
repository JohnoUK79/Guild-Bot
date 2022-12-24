const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
    data: new SlashCommandBuilder()
        //.setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)

        .setName("invites")
        .setDescription("Update the Player Database!"),

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
            .setDescription(`**Invites Leaderboard!**`)
            .setThumbnail(guildIcon)
            .setImage(`http://phfamily.co.uk/img/gifs/Influencer.gif`)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Invites Leaderboard.`, iconURL: `${guildIcon}` });
            
        console.log(`${guildName} Member Cache: ${Interaction.guild.members.cache.size}`)
        inviteBoard = await sql.Execute(`SELECT * FROM invites WHERE guildId = '${Interaction.member.guild.id}' ORDER BY uses DESC`)
        console.log(inviteBoard.length)        
        for (let i = 0; i < 25 && inviteBoard[i]; i++) invitesEmbed.addFields(
            { name: `${inviteBoard[i].invitedBy}`, value: `**Code:** ${inviteBoard[i].code} **Uses:** ${inviteBoard[i].uses}` })



        //     .addFields(
        //         { name: `:first_place:${first}`, value: `**Code:** ${inviteBoard[0].code} **Uses:** ${inviteBoard[0].uses}` },
        //         { name: `:second_place:${second}`, value: `**Code:** ${inviteBoard[1].code} **Uses:** ${inviteBoard[1].uses}` },
        //         { name: `:third_place:${third}`, value: `**Code:** ${inviteBoard[2].code} **Uses:** ${inviteBoard[2].uses}` },
        //         { name: `${fourth}`, value: `**Code:** ${inviteBoard[3].code} **Uses:** ${inviteBoard[3].uses}` },
        //         { name: `${fifth}`, value: `**Code:** ${inviteBoard[4].code} **Uses:** ${inviteBoard[4].uses}` }, 
        //         )

            
        //return interaction.reply(`Registered Jursidiction Channels!\n**${jurisdictionsChannelIDs.jurisdictionsChannelIDs.join('\n')}**`);

            await Interaction.reply({
            ephemeral: false,
            embeds: [invitesEmbed],
        });

    },
};
