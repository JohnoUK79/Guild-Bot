const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Shows the first 10 songs in the Queue!'),
	async execute(interaction) {
		guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
		const { botJukebox } = require('../bot')
		const player = botJukebox
		const queue = player.getQueue(interaction.guild);
		if (!queue || !queue.playing) {
			return interaction.reply({
				content: `There is No **Song** playing!`,
				ephemeral: true,
			})
		}
		// if (queue.length === 0) {
		// 	return interaction.reply({
		// 		content: `There is No More **Songs** playing!`,
		// 		ephemeral: true,
		// 	})
		// }
		const queueString = queue.tracks.slice(0, 10).map((song, i) => {
			return `\n(${i + 1}) [${song.duration}] - ${song.title} - ${song.requestedBy}`;
		}).join('\n');

		const currentSong = queue.current;

		return interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setColor('#ffff00')
					.setDescription(`**Currently Playing**\n${currentSong.title}`)
					.setThumbnail(currentSong.thumbnail)
					.addFields(
						{ name: `Requested By:`, value: `<@${currentSong.requestedBy.id}>`, inline: true },
						{ name: 'Playing Next.', value: `${queueString}`, inline: false },
						)
					.setImage(currentSong.thumbnail)
					.setTimestamp()
					.setFooter({ text: `${guildName} - Jukebox.`, iconURL: `${guildIcon}` })
					.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})


			]
		})

	},
};