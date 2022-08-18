const { SlashCommandBuilder } = require('@discordjs/builders');
const interaction = require('discord-interactions-zero');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Display info about this server.'),
	async execute(Interaction) {
		await interaction.callback.reply(Interaction, {
			ephemeral: true,
			content: `Server name: ${Interaction.guild.name}\nTotal members: ${Interaction.guild.memberCount}`,
		})
	},
};