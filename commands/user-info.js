const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const interaction = require('discord-interactions-zero');

module.exports = {
	data: new SlashCommandBuilder()
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)
		.setName('user-info')
		.setDescription('Display info about yourself.'),
	async execute(Interaction) {
		await interaction.callback.reply(Interaction, {
			ephemeral: true,
			content: `Your username: ${Interaction.user.username}\nYour ID: ${Interaction.user.id}`,
		})
	},
};
