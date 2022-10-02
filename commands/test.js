const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Slash Command Tester!'),
	async execute(interaction) {
		let jurisdictions = require('../data/jurisdictions')
		console.log(jurisdictions)
		//return interaction.reply(`Jurisdictions!\n${jurisdictions.join('\n')}`);
		return;
	},
};