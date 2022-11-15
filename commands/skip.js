const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skips the Current Song!'),
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
		queue.skip();

		await interaction.reply({
			embeds:[
				new EmbedBuilder()
					.setDescription(`Skipped: **${currentSong.title}**`)
					.setThumbnail(currentSong.thumbnail)
			]
		})
	}}