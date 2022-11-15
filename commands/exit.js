const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('exit')
		.setDescription('Exits the Voice Channel!'),
	async execute(interaction) {
		const { botJukebox } = require('../bot')
		const player = botJukebox
		const queue = player.getQueue(interaction.guild);
		if (!queue) {
			return interaction.reply({
				content: 'There is no Song Playing.',
				ephemeral: true,
			})
		}
		const currentSong = queue.current;
		queue.destroy();

		await interaction.reply(`Why do you **HATE** me?`)
	}}