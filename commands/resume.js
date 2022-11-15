const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resumes the Current Song!'),
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
		queue.setPaused(false);

		await interaction.reply(`The Current Song: ${currentSong.title} has been **Resumed**!`)
	}}