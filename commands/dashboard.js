const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { MessageEmbed, Client, ModalSubmitFieldsResolver, MessageActionRow, MessageButton, Message } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)

        .setName("dashboard")
        .setDescription("Update the Player Database!"),

    async execute(Interaction) {
        //Interaction.deferReply({ empheral: true, fetchReply: true, content: 'waiting...'})
        guildIcon = Interaction.member.guild.iconURL();
		guildName = Interaction.member.guild.name
        var channel = Interaction.channel.name
        var guildId = Interaction.guildId

		const mainDashboardButtons =  new MessageActionRow()
				.addComponents(
		new MessageButton()
				.setCustomId('Player')
				.setLabel('Update a Player Bot Profile!')
				.setStyle('PRIMARY'),
		new MessageButton()
				.setCustomId('Reports')
				.setLabel('Access Player Reports!')
				.setStyle('PRIMARY'),
		)


        const mainDashboard = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${guildName} - Database Dashboard`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(Interaction.user.displayAvatarURL())
            .setAuthor({ name: Interaction.member.displayName, iconURL: Interaction.user.displayAvatarURL({ dynamic: true }), url: '' })
            .setDescription(`**Player Database Dashbaord!**`)
            .setThumbnail('http://phfamily.co.uk/img/gifs/Poll.gif')
            .addFields(
                { name: `Update Players`, value: `Pick this option to update Individual Players details on the bot!`, inline: true },
                { name: `Reports - Alliance`, value: `Get Player Specific Reports by Alliance!`, inline: true },
            )
            .setImage(`${guildIcon}`)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Database Dashboard.`, iconURL: `${guildIcon}` });
            
            await Interaction.reply({
            ephemeral: true,
            embeds: [mainDashboard],
            components: [mainDashboardButtons]
        });

    },
};
