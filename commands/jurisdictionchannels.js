const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jurisdictionchannels')
		.setDescription('Registered Jurisdiction Channels!'),
	async execute(interaction) {
		let jurisdictionsChannelIDs = require('../data/jurisdictionsChannelIDs')
		return interaction.reply(`Registered Jursidiction Channels!\n**${jurisdictionsChannelIDs.jurisdictionsChannelIDs.join('\n')}**`);
	},
};