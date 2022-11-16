const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a song.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('search')
				.setDescription('Searches for a Song!')
				.addStringOption(option =>
					option
						.setName('searchterms')
						.setDescription('Search Keywords!')
						.setRequired(true)
					)
			)
		.addSubcommand(subcommand => 
			subcommand
				.setName('playlist')
				.setDescription('Plays a Playlist from YouTube!')
				.addStringOption(option =>
					option
						.setName('url')
						.setDescription('Playlist URL!')
						.setRequired(true)
					)
			)
			.addSubcommand(subcommand =>
				subcommand
					.setName('song')
					.setDescription('Plays a Song from YouTube!')
					.addStringOption(option =>
						option
							.setName('url')
							.setDescription('Song URL!')
							.setRequired(true)
						)
				)
			,

				
	async execute(interaction) {
		const { botJukebox } = require('../bot')
		const player = botJukebox
		if (!interaction.member.voice.channel) {
			return interaction.reply({
				content: 'You Need to Be in **Voice Chat** to Use This Command.',
				ephemeral: true,
			})
		} 
		const queue = await player.createQueue(interaction.guild)
		if(!queue.connection) await queue.connect(interaction.member.voice.channel)
		await interaction.reply('Joining Queue!')
		let embed = new EmbedBuilder();
		if (interaction.options.getSubcommand() === 'song')
		{
			let url = interaction.options.getString('url');

			const result = await player.search(url , {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_VIDEO
			});

			if (result.tracks.length === 0)
			{
				return interaction.editReply({
					content: `No Results Found for URL:${url}`,
					ephemeral: true,
				})
			}
			const song = result.tracks[0]
			await queue.addTrack(song);

			embed
				.setDescription(`Added **[${song.title}](${song.url})** to the queue!`)
				.setThumbnail(song.thumbnail)
				.setFooter({ text: `Duration: ${song.duration}`});
		}
		else if (interaction.options.getSubcommand() === 'playlist')
		{
			let url = interaction.options.getString('url');

			const result = await player.search(url , {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_PLAYLIST
			});

			if (result.tracks.length === 0)
			{
				return interaction.editReply({
					content: `No Results Found for Playlist:${url}`,
					ephemeral: true,
				})
			}
			const playlist = result.playlist;
			await queue.addTracks(playlist);

			embed
				.setDescription(`Added **[${playlist.title}](${playlist.url})** to the queue!`)
				.setThumbnail(playlist.thumbnail)
				.setFooter({ text: `Duration: ${playlist.duration}`});
		} else if (interaction.options.getSubcommand() === 'search')
		{
			let url = interaction.options.getString('searchterms');

			const result = await player.search(url , {
				requestedBy: interaction.user,
				searchEngine: QueryType.AUTO
			});

			if (result.tracks.length === 0)
			{
				return interaction.editReply({
					content: `No Results Found for Playlist:${url}`,
					ephemeral: true,
				})
			}
			const song = result.tracks[0]
			await queue.addTrack(song);

			embed
				.setDescription(`Added **[${song.title}](${song.url})** to the queue!`)
				.setThumbnail(song.thumbnail)
				.setFooter({ text: `Duration: ${song.duration}`});
		}
		await interaction.editReply(`${queue}`)
		if (!queue.playing) await queue.play();
		return;
	},
};