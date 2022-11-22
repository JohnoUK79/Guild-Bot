const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType, QueueRepeatMode } = require('discord-player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a song.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('song')
				.setDescription('Searches for a Song!')
				.addStringOption(option =>
					option
						.setName('searchterms')
						.setDescription('Search Keywords!')
						.setRequired(true)
					)
			)
		// .addSubcommand(subcommand => 
		// 	subcommand
		// 		.setName('playlist')
		// 		.setDescription('Plays a Playlist from YouTube!')
		// 		.addStringOption(option =>
		// 			option
		// 				.setName('url')
		// 				.setDescription('Playlist URL!')
		// 				.setRequired(true)
		// 			)
		// 	)
			.addSubcommand(subcommand =>
				subcommand
					.setName('pause')
					.setDescription('Pauses the Current Song!')
			)
			.addSubcommand(subcommand =>
				subcommand
					.setName('resume')
					.setDescription('Resumes the Current Song!')
			)
			.addSubcommand(subcommand =>
				subcommand
					.setName('back')
					.setDescription('Resumes the Current Song!')
			)
			.addSubcommand(subcommand =>
				subcommand
					.setName('skip')
					.setDescription('Skips the Current Song!')
			)
			.addSubcommand(subcommand =>
				subcommand
					.setName('queue')
					.setDescription('Shows the Current Queue!')
			)
			.addSubcommand(subcommand =>
				subcommand
					.setName('volume')
					.setDescription('Sets the Player Volume!')
					.addIntegerOption(option =>
						option
							.setName('amount')
							.setDescription('Set the Volume Level (0-100)!')
							.setRequired(false)
						)
			)
			.addSubcommand(subcommand =>
				subcommand
					.setName('bassboost')
					.setDescription('Toggles the BassBoost filter!')
			)
			.addSubcommand(subcommand =>
				subcommand
					.setName('loop')
					.setDescription('Sets the LOOP Mode!')
					.addIntegerOption(option =>
						option
							.setName('mode')
							.setDescription('Set the LOOP Type!')
							.setRequired(true)
							.addChoices(
								{
									name:'Off',
									value: QueueRepeatMode.OFF
								},
								{
									name: 'Track',
									value: QueueRepeatMode.TRACK
								},
								{
									name: 'Queue',
									value: QueueRepeatMode.QUEUE
								},
								{
									name: 'Autoplay',
									value: QueueRepeatMode.AUTOPLAY
								}
							)
						)
			)
			.addSubcommand(subcommand =>
				subcommand
					.setName('history')
					.setDescription('Display the Queue History!')
			)
			.addSubcommand(subcommand =>
				subcommand
					.setName('exit')
					.setDescription('Exits the Jukebox & Closes Player!')
			)
			,

				
	async execute(interaction) {
		guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
		const { botJukebox } = require('../bot')
		const player = botJukebox
		if (!interaction.member.voice.channel) {
			return interaction.reply({
				content: 'You Need to Be in **Voice Chat** to Use This Command.',
				ephemeral: true,
			})
		} 
		const queue = await player.createQueue(interaction.guild, {
			ytdlOptions: {
				quality: 'highestaudio',
				highWaterMark: 1 << 30
				},
			leaveOnEnd: false,
			leaveOnStop: true,
			leaveInEmpty: true,
			leaveOnEndCooldown: 15000,
			leaveOnEmptyCooldown: 15000,
			autoSelfDeaf: true,
			initialVolume: 30,
			bufferingTimeout: 4500,
			spotifyBride: true,
			disableVolume: false,
			smoothVolume: true,
			metadata: {
				interaction: interaction,
				channel: interaction.channel,
				guild: interaction.guild,
				user: interaction.user
			}
		})

		if(!queue.connection) await queue.connect(interaction.member.voice.channel)
		await interaction.deferReply({
			fetchReply: true,
			ephemeral: true,
		})
		let embed = new EmbedBuilder();
		if (interaction.options.getSubcommand() === 'song')
		{
			let url = interaction.options.getString('searchterms');

			const result = await player.search(url , {
				requestedBy: interaction.user,
				searchEngine: QueryType.AUTO
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
				.setDescription(`Added [${song.title}](${song.url}) to the queue!`)
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setImage(song.thumbnail)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `Views [${song.views}] ${song.title} - Duration: ${song.duration}`, iconURL: `${guildIcon}`});
		}
		// else if (interaction.options.getSubcommand() === 'playlist')
		// {
		// 	let url = interaction.options.getString('url');

		// 	const result = await player.search(url , {
		// 		requestedBy: interaction.user,
		// 		searchEngine: QueryType.YOUTUBE_PLAYLIST
		// 	});

		// 	if (result.tracks.length === 0)
		// 	{
		// 		return interaction.editReply({
		// 			content: `No Results Found for Playlist:${url}`,
		// 			ephemeral: true,
		// 		})
		// 	}
		// 	const playlist = result.playlist;
		// 	await queue.addTracks(playlist);

		// 	embed
		// 		.setDescription(`Added [${playlist.title}](${playlist.url}) to the queue!`)
		// 		.setColor('#ffff00')
		// 		.setThumbnail(guildIcon)
		// 		.setImage(playlist.thumbnail)
		// 		.setTimestamp()
		// 		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
		// 		.setFooter({ text: `${guildName} - ${playlist.title} - Duration: ${playlist.duration}`, iconURL: `${guildIcon}`});
		// 	} 
		else if (interaction.options.getSubcommand() === 'back')
		{
			if (!queue.playing) {
				embed
				.setDescription(`Sorry <@${interaction.member.id}>, there is no **Song** Playing.`)
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
				return interaction.editReply({
					embeds: [embed],
				}) 
			} 
			queue.back();
			const currentSong = queue.current;


			embed
				.setDescription(`✅ | Playing the previous track`)
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setImage(currentSong.thumbnail)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `Views [${currentSong.views}] ${currentSong.title} - Duration: ${currentSong.duration}`, iconURL: `${guildIcon}`});
		}
		else if (interaction.options.getSubcommand() === 'pause')
		{
			if (!queue.playing) {
				embed
				.setDescription(`Sorry <@${interaction.member.id}>, there is no **Song** Playing.`)
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
				return interaction.editReply({
					embeds: [embed],
				}) 
			} 
			const currentSong = queue.current;
			queue.setPaused(true);

			embed
				.setDescription(`**The Current Song**: [${currentSong.title}](${currentSong.url}) has been **Paused**!`)
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setImage(currentSong.thumbnail)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `Views [${currentSong.views}] ${currentSong.title} - Duration: ${currentSong.duration}`, iconURL: `${guildIcon}`});
			}
		else if (interaction.options.getSubcommand() === 'resume')
		{
			if (!queue.playing) {
				embed
				.setDescription(`Sorry <@${interaction.member.id}>, there is no **Song** Playing.`)
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
				return interaction.editReply({
					embeds: [embed],
				}) 
			} 
			const currentSong = queue.current;
			queue.setPaused(false);

			embed
				.setDescription(`**The Current Song**: [${currentSong.title}](${currentSong.url}) has been **Resumed**!`)
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setImage(currentSong.thumbnail)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `Views [${currentSong.views}] ${currentSong.title} - Duration: ${currentSong.duration}`, iconURL: `${guildIcon}`});
		}
		else if (interaction.options.getSubcommand() === 'skip')
		{
			if (!queue.playing) {
				embed
				.setDescription(`Sorry <@${interaction.member.id}>, there is no **Song** Playing.`)
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
				return interaction.editReply({
					embeds: [embed],
				}) 
			} 
			const currentSong = queue.current;
			queue.skip();

			embed
				.setDescription(`**The Current Song**: [${currentSong.title}](${currentSong.url}) has been **Skipped**!`)
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setImage(currentSong.thumbnail)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `Views [${currentSong.views}] ${currentSong.title} - Duration: ${currentSong.duration}`, iconURL: `${guildIcon}`});
		}
		else if (interaction.options.getSubcommand() === 'queue')
		{
			if (!queue.playing) {
				embed
				.setDescription(`Sorry <@${interaction.member.id}> there are no **Songs** in the queue!`)
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
				return interaction.editReply({
					embeds: [embed],
				}) 
			} 
			const currentSong = queue.current;

			if (queue.tracks.length === 0) {
				embed
				.setDescription(`**The Current Song**: [${currentSong.title}](${currentSong.url}) is the only **Song** in the queue!`)
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setImage(currentSong.thumbnail)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `Views [${currentSong.views}] ${currentSong.title} - Duration: ${currentSong.duration}`, iconURL: `${guildIcon}`});
				return interaction.editReply({
					embeds: [embed],
				}) 
			} 
			const queueString = queue.tracks.slice(0, 10).map((song, i) => {
				return `\n**(${i + 1})** [${song.duration}] - [${song.title}](${song.url}) - ${song.requestedBy}`;
			}).join('\n');
	
			embed
			.setColor('#ffff00')
			.setDescription(`**Currently Playing**\n[${currentSong.title}](${currentSong.url})`)
			.setThumbnail(guildIcon)
			.addFields(
				{ name: `Requested By:`, value: `<@${currentSong.requestedBy.id}>`, inline: true },
				{ name: 'Playing Next.', value: `${queueString}`, inline: false },
				)
			.setImage(currentSong.thumbnail)
			.setTimestamp()
			.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
			.setFooter({ text: `Views [${currentSong.views}] ${currentSong.title} - Duration: ${currentSong.duration}`, iconURL: `${guildIcon}`});
		}
		else if (interaction.options.getSubcommand() === 'volume')
		{
			if (!queue.playing) {
				embed
				.setDescription(`Sorry <@${interaction.member.id}>, there is no **Song** Playing.`)
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
				return interaction.editReply({
					embeds: [embed],
				}) 
			} 
			const amount = interaction.options.getInteger('amount')
			const vol = parseInt(amount)
			if (!vol) return interaction.editReply({ content: `🎧 | Current volume is **${queue.volume}**%!` });
			if (vol < 0 || vol > 100) return interaction.editReply({ content: '❌ | Volume range must be 0-100' });
			const success = queue.setVolume(vol);
			return interaction.editReply({
				content: success ? `✅ | Volume set to **${vol}%**!` : '❌ | Something went wrong!'
			});
		}
		else if (interaction.options.getSubcommand() === 'bassboost')
		{
			if (!queue.playing) {
				embed
				.setDescription(`Sorry <@${interaction.member.id}>, there is no **Song** Playing.`)
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
				return interaction.editReply({
					embeds: [embed],
				}) 
			} 
			embed
					.setDescription(`🎵 | Bassboost ${queue.getFiltersEnabled().includes('bassboost') ? 'Enabled' : 'Disabled'}!`)
					.setColor('#ffff00')
					.setThumbnail(guildIcon)
					.setTimestamp()
					.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
					.setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});

			await queue.setFilters({
				bassboost: !queue.getFiltersEnabled().includes('bassboost'),
				normalizer2: !queue.getFiltersEnabled().includes('bassboost') // because we need to toggle it with bass
			});

			setTimeout(() => {
			return interaction.editReply({ content: `🎵 | Bassboost ${queue.getFiltersEnabled().includes('bassboost') ? 'Enabled' : 'Disabled'}!` });
			}, queue.options.bufferingTimeout);
		}
		else if (interaction.options.getSubcommand() === 'loop')
		{
			if (!queue.playing) {
				embed
					.setDescription(`Sorry <@${interaction.member.id}>, there is no **Song** Playing.`)
					.setColor('#ffff00')
					.setThumbnail(guildIcon)
					.setTimestamp()
					.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
					.setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
				return interaction.editReply({
					embeds: [embed],
				}) 
			} 
			const loopMode = interaction.options.getInteger('mode');
			const success = queue.setRepeatMode(loopMode);
			const mode = loopMode === QueueRepeatMode.TRACK ? '🔂' : loopMode === QueueRepeatMode.QUEUE ? '🔁' : '▶';
			console.log(mode)
			//return interaction.editReply({ content: success ? `${mode} | Updated loop mode!` : '❌ | Could not update loop mode!' });
			embed
				.setDescription(success ? `${mode} | Updated loop mode!` : '❌ | Could not update loop mode!')
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
		}
		else if (interaction.options.getSubcommand() === 'exit')
		{
			if (!queue.playing) {
				embed
					.setDescription(`Sorry <@${interaction.member.id}>, there is no **Song** Playing.`)
					.setColor('#ffff00')
					.setThumbnail(guildIcon)
					.setTimestamp()
					.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
					.setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
				return interaction.editReply({
					embeds: [embed],
				}) 
			} 
			queue.destroy();

			embed
				.setDescription(`The Current queue has been **Cleared**!`)
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
		}
		await interaction.editReply({embeds: [embed], ephemeral: false })
		if (!queue.playing) await queue.play();
		return;
	},
};