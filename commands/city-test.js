const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('city-test')
		.setDescription('Testing the Cron Feature!'),
	async execute(interaction) {
		return interaction.reply('Testing!');
	},
};