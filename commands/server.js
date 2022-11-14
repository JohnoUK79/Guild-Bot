const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const interaction = require('discord-interactions-zero');

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