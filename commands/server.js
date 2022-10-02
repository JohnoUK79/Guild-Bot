const { SlashCommandBuilder } = require('@discordjs/builders');
const interaction = require('discord-interactions-zero');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
	data: new SlashCommandBuilder()
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)	
		.setName('server')
		.setDescription('Display info about this server.'),
	async execute(Interaction) {
		await interaction.callback.reply(Interaction, {
			ephemeral: true,
			content: `Server name: ${Interaction.guild.name}\nTotal members: ${Interaction.guild.memberCount}`,
		})
	},
};