const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		//.setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		try {
		return interaction.reply('Pong!');
		}
		catch (e) {
			console.log(e);
		}},
};