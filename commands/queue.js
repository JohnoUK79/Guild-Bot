const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Shows the first 10 songs in the Queue!'),
	async execute(interaction) {
		const { botJukebox } = require('../bot')
		const player = botJukebox
		const queue = player.getQueue(interaction.guild);
		if (!queue || !queue.playing) {
			return interaction.reply({
				content: `There is No **Song** playing!`,
				ephemeral: true,
			})
		}
		const queueString = queue.tracks.slice(0, 10).map((song, i) => {
			return `${i + 1}) [${song.duration}]\` ${song.title} - <@${song.requestedBy.id}>`;
		}).join('\n');

		const currentSong = queue.current;

		return interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setDescription(`**Currently Playing**\n\` ${currentSong.title} - <@${currentSong.requestedBy.id}>\n\n**Queue:**${queueString}`)
					.setThumbnail(currentSong.thumbnail)
			]
		})

	},
};