const { SlashCommandBuilder } = require('@discordjs/builders');
const interaction = require('discord-interactions-zero');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Clear Channel.'),
	
};