const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)

        .setName("dashboard")
        .setDescription("Update the Player Database!"),

    async execute(interaction) {
        //interaction.deferReply({ empheral: true, fetchReply: true, content: 'waiting...'})
        guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
        var channel = interaction.channel.name
        var guildId = interaction.guildId

		const mainDashboardButtons =  new ActionRowBuilder()
				.addComponents(
		new ButtonBuilder()
				.setCustomId('Player')
				.setLabel('Update a Player Bot Profile!')
				.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
				.setCustomId('Reports')
				.setLabel('Access Player Reports!')
				.setStyle(ButtonStyle.Primary),
		)


        const mainDashboard = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${guildName} - Database Dashboard`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(interaction.user.displayAvatarURL())
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setDescription(`**Bot Admin Dashboard!**`)
            .setThumbnail(guildIcon)
            .addFields(
                { name: `Update Players`, value: `Pick this option to update Individual Players details on the bot!`, inline: true },
                { name: `Reports - Alliance`, value: `Get Player Specific Reports by Alliance!`, inline: true },
            )
            .setImage(`http://phfamily.co.uk/img/gifs/Bot.gif`)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Database Dashboard.`, iconURL: `${guildIcon}` });
            
            await interaction.reply({
            ephemeral: true,
            embeds: [mainDashboard],
            components: [mainDashboardButtons]
        });

    },
};
