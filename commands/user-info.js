const { SlashCommandBuilder } = require('@discordjs/builders');
const interaction = require('discord-interactions-zero');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user-info')
		.setDescription('Display info about yourself.'),
	async execute(Interaction) {
		await interaction.callback.reply(Interaction, {
			ephemeral: true,
			content: `Your username: ${Interaction.user.username}\nYour ID: ${Interaction.user.id}`,
		})
	},
};
