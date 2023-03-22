const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useMasterPlayer, useQueue, QueryType, QueueRepeatMode } = require('discord-player');
const { lyricsExtractor } = require("@discord-player/extractor")
const search = lyricsExtractor()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jukebox')
		.setDescription('Welcome to the Guild Jukebox!')
		.addSubcommand(subcommand =>
			subcommand
				.setName('song')
				.setDescription('Searches for a Song!')
				.addStringOption(option =>
					option
						.setName('query')
						.setDescription('Search Keywords!')
						.setRequired(true)
					)
		)
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
				.setDescription('Plays The Previous Song!')
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('skip')
				.setDescription('Skips the Current Song!')
		)
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Removes a Track from the Queue!')
                .addIntegerOption(option =>
                    option
                        .setName('track')
                        .setDescription('The number of the track to remove!')
                        .setRequired(true)
                    )
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
                .setName('lyrics')
                .setDescription('Search for Lyrics to a Song!')
                .addStringOption(option =>
                    option
                        .setName('name')
                        .setDescription('Name of the Song!')
                        .setRequired(true)
                    )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription('Clears the Queue History!')
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
        ),
	async execute(interaction) {
		guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
        const player = useMasterPlayer(); // Get the player instance that we created earlier
        const channel = interaction.member.voice.channel;
        const playEmbed = new EmbedBuilder();
        if (!channel) {
            playEmbed
                .setDescription(`<@${interaction.member.id}>, you need to be connected to a **Voice Channel** to use the **Jukebox**.`)
                .setColor('#ffff00')
                .setThumbnail(guildIcon)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
            return interaction.reply({embeds: [playEmbed], ephemeral: true}); 

        }
        // let's defer the interaction as things can take time to process
        await interaction.deferReply({
            fetchReply: true,
			ephemeral: true,
        });
        if (interaction.options.getSubcommand() === 'song') {
        const query = interaction.options.getString('query', true); // we need input/query to play
        const searchResult = await player.search(query, { requestedBy: interaction.user });
        if (!searchResult.hasTracks()) {
            // If player didn't find any songs for this query
            await interaction.editReply(`We found no tracks for ${query}!`);
            return;
        } else {
            try {
                await player.play(channel, searchResult, {
                    nodeOptions: {
                        metadata: {
                        channel: interaction.channel,
                        client: interaction.guild.members.me,
                        requestedBy: interaction.user,
                        },
                    selfDeaf: true,
                    volume: 50,
                    leaveOnEmpty: true,
                    leaveOnEmptyCooldown: 300000,
                    leaveOnEnd: true,
                    leaveOnEndCooldown: 300000,
                    },
                });
                const queue = useQueue(interaction.guild.id);
                const song = searchResult.tracks[0]
                playEmbed
                    .setDescription(`Added [${song.title}](${song.url}) to the queue!`)
                    .setColor('#ffff00')
                    .setThumbnail(guildIcon)
                    .setImage(song.thumbnail)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                    .setFooter({ text: `${song.author} ${song.title} - Duration: ${song.duration}`, iconURL: `${guildIcon}`});

                    await interaction.editReply({embeds: [playEmbed]});
            } catch (e) {
                // let's return error if something failed
                return interaction.followUp(`Something went wrong: ${e}`);
            }
        }    
        }
        else if (interaction.options.getSubcommand() === 'pause') {
            const queue = useQueue(interaction.guild.id);
			if (!queue) {
				playEmbed
                    .setDescription(`Sorry <@${interaction.member.id}>, there is no **Song** Playing.`)
                    .setColor('#ffff00')
                    .setThumbnail(guildIcon)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                    .setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
				return interaction.editReply({
					embeds: [playEmbed],
				}) 
			} 
            const currentTrack = queue.currentTrack
            queue.node.setPaused(!queue.node.isPaused());

            playEmbed
                .setDescription(`[${currentTrack.title}](${currentTrack.url}) has been Paused!`)
                .setColor('#ffff00')
                .setThumbnail(guildIcon)
                .setImage(currentTrack.thumbnail)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setFooter({ text: `${currentTrack.author} ${currentTrack.title} - Duration: ${currentTrack.duration}`, iconURL: `${guildIcon}`});

            await interaction.editReply({embeds: [playEmbed]});
        }
		else if (interaction.options.getSubcommand() === 'resume') {
            const queue = useQueue(interaction.guild.id);
			if (!queue) {
				playEmbed
				.setDescription(`Sorry <@${interaction.member.id}>, there is no **Song** Playing.`)
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
				return interaction.editReply({
					embeds: [playEmbed],
				}) 
			} 
            const currentTrack = queue.currentTrack
            queue.node.resume();
            

            playEmbed
                .setDescription(`[${currentTrack.title}](${currentTrack.url}) has been Resumed!`)
                .setColor('#ffff00')
                .setThumbnail(guildIcon)
                .setImage(currentTrack.thumbnail)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setFooter({ text: `${currentTrack.author} ${currentTrack.title} - Duration: ${currentTrack.duration}`, iconURL: `${guildIcon}`});

            await interaction.editReply({embeds: [playEmbed]});
        }
		else if (interaction.options.getSubcommand() === 'back') {
            const queue = useQueue(interaction.guild.id);

            if (!queue) {
				playEmbed
                    .setDescription(`Sorry <@${interaction.member.id}>, there is no **Song** Playing.`)
                    .setColor('#ffff00')
                    .setThumbnail(guildIcon)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                    .setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
				return interaction.editReply({
					embeds: [playEmbed],
				}) 
			} 

            const currentTrack = queue.currentTrack

            if(!queue.history.previousTrack){
                console.log(`No History`)
                playEmbed
                    .setDescription(`[${currentTrack.title}](${currentTrack.url}) is the first song on the Queue!`)
                    .setColor('#ffff00')
                    .setThumbnail(guildIcon)
                    .setImage(currentTrack.thumbnail)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                    .setFooter({ text: `${currentTrack.author} ${currentTrack.title} - Duration: ${currentTrack.duration}`, iconURL: `${guildIcon}`});

            return interaction.editReply({embeds: [playEmbed]});
            }

            const previousTrack = queue.history.previousTrack

            queue.history.back()

            playEmbed
                .setDescription(`[${previousTrack.title}](${previousTrack.url}) has been Rewound!`)
                .setColor('#ffff00')
                .setThumbnail(guildIcon)
                .setImage(previousTrack.thumbnail)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setFooter({ text: `${previousTrack.author} ${previousTrack.title} - Duration: ${previousTrack.duration}`, iconURL: `${guildIcon}`});

            await interaction.editReply({embeds: [playEmbed]});
        }
        else if (interaction.options.getSubcommand() === 'skip') {
            const queue = useQueue(interaction.guild.id);
			if (!queue) {
				playEmbed
                    .setDescription(`Sorry <@${interaction.member.id}>, there is no **Song** Playing.`)
                    .setColor('#ffff00')
                    .setThumbnail(guildIcon)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                    .setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
				return interaction.editReply({
					embeds: [playEmbed],
				}) 
			} 
            const currentTrack = queue.currentTrack
            queue.node.skip();

            playEmbed
                .setDescription(`[${currentTrack.title}](${currentTrack.url}) has been Skipped!`)
                .setColor('#ffff00')
                .setThumbnail(guildIcon)
                .setImage(currentTrack.thumbnail)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setFooter({ text: `${currentTrack.author} ${currentTrack.title} - Duration: ${currentTrack.duration}`, iconURL: `${guildIcon}`});

            await interaction.editReply({embeds: [playEmbed]});
        }
        else if (interaction.options.getSubcommand() === 'remove') {
            const queue = useQueue(interaction.guild.id);
			if (!queue) {
				playEmbed
                    .setDescription(`Sorry <@${interaction.member.id}>, there is no **Song** Playing.`)
                    .setColor('#ffff00')
                    .setThumbnail(guildIcon)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                    .setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
				return interaction.editReply({
					embeds: [playEmbed],
				}) 
			} 
			const trackNumber = interaction.options.getInteger('track') -1
            const tracks = queue.tracks.toArray()
			const trackName = tracks[trackNumber];
			queue.removeTrack(trackNumber);

            playEmbed
                .setDescription(`[${trackName.title}](${trackName.url}) has been removed from the Queue!`)
                .setColor('#ffff00')
                .setThumbnail(guildIcon)
                .setImage(trackName.thumbnail)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setFooter({ text: `${trackName.author} ${trackName.title} - Duration: ${trackName.duration}`, iconURL: `${guildIcon}`});

            await interaction.editReply({embeds: [playEmbed]});
        }
        else if (interaction.options.getSubcommand() === 'queue') {
            //TODO - Fix Queue Slice for Embed
            const queue = useQueue(interaction.guild.id);
			if (!queue) {
				playEmbed
                    .setDescription(`Sorry <@${interaction.member.id}>, there is no **Song** Playing.`)
                    .setColor('#ffff00')
                    .setThumbnail(guildIcon)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                    .setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
				return interaction.editReply({
					embeds: [playEmbed],
				}) 
			} 
            const currentTrack = queue.currentTrack;

            let tracks;
            try {
                tracks = currentTrack.playlist.tracks;
            } catch (e) {
                tracks = null;
            }
        
            const embed = new EmbedBuilder()
                .setColor('#ffff00')
                .setTitle('Queue')
                .setDescription(`**Now playing:** ${currentTrack.title} (${currentTrack.duration})`);
        
            if (!tracks)
                return main_interaction.followUp({
                    embeds: [embed],
                    ephemeral: true,
                });
        
            for (let i = 1; i < 25; i++) {
                if (i === 25) {
                    embed.addFields({
                        name: `Tracks ${i + 1} - ${tracks.size}`,
                        value: `...`,
                    });
                    break;
                }
                embed.addFields({
                    name: `Track ${i + 1}`,
                    value: `${tracks[i].title} **(${tracks[i].duration})**`,
                });
            }
        
            return interaction.followUp({
                embeds: [embed],
                ephemeral: true,
            });
    
        }
        else if (interaction.options.getSubcommand() === 'volume') {
            const queue = useQueue(interaction.guild.id);

            if (!queue) {
				playEmbed
                    .setDescription(`Sorry <@${interaction.member.id}>, there is no **Song** Playing.`)
                    .setColor('#ffff00')
                    .setThumbnail(guildIcon)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                    .setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
				return interaction.editReply({
					embeds: [playEmbed],
				}) 
			} 
			const amount = interaction.options.getInteger('amount')
			const vol = parseInt(amount)
			if (!vol) {
                playEmbed
                    .setDescription(`🎧 | Current volume is **${queue.node.volume}**%!`)
                    .setColor('#ffff00')
                    .setThumbnail(guildIcon)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                    .setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
                return interaction.editReply({ embeds: [playEmbed]});
            }
			if (vol < 0 || vol > 100) {
                playEmbed
                    .setDescription(`❌ | Volume range must be 0-100.`)
                    .setColor('#ffff00')
                    .setThumbnail(guildIcon)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                    .setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
                return interaction.editReply({ embeds: [playEmbed]});
            }
			const success = queue.node.setVolume(vol);
                playEmbed
                    .setDescription(success ? `✅ | Volume set to **${vol}%**!` : '❌ | Something went wrong!')
                    .setColor('#ffff00')
                    .setThumbnail(guildIcon)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                    .setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
			return interaction.editReply({embeds: [playEmbed]});
        }
        else if (interaction.options.getSubcommand() === 'loop') {
            const queue = useQueue(interaction.guild.id);
			if (!queue) {
				playEmbed
                    .setDescription(`Sorry <@${interaction.member.id}>, there is no **Song** Playing.`)
                    .setColor('#ffff00')
                    .setThumbnail(guildIcon)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                    .setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
				return interaction.editReply({
					embeds: [playEmbed],
				}) 
			} 
            try {        
                if (!queue || !queue.isPlaying()) {
                    playEmbed
                        .setDescription(`Sorry <@${interaction.member.id}>, there is no **Song** Playing.`)
                        .setColor('#ffff00')
                        .setThumbnail(guildIcon)
                        .setTimestamp()
                        .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                        .setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});

                    return interaction.editReply({ embeds: [playEmbed] })
                }
                const loopMode = interaction.options.getInteger("mode")
                queue.setRepeatMode(loopMode)
                const mode = loopMode === QueueRepeatMode.TRACK ? `🔂` : loopMode === QueueRepeatMode.QUEUE ? `🔁` : `▶`

                    playEmbed
                        .setDescription(`${mode} | Updated loop mode`)
                        .setColor('#ffff00')
                        .setThumbnail(guildIcon)
                        .setTimestamp()
                        .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                        .setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});

                return interaction.editReply({ embeds:[playEmbed]})
            } catch (error) {
                console.log(error)
            }        
        }
        else if (interaction.options.getSubcommand() === 'lyrics') {
            try{                
                const queue = useQueue(interaction.guild.id);
                const music = interaction.options.getString("name")
                if(!queue && !music) {
                    return interaction.editReply({ content: "There is no queue and you didn't mention any song name!"})
                }
        
                if (queue || music) {
                const result = await search.search(music ?? queue.currentTrack.title)
        
                if (!result) {
                    return interaction.editReply({ content: `No lyrics found for: ${music ? music : queue.currentTrack.title}` })
                } 
        
                const trimmedLyrics = result.lyrics.substring(0, 1997);
        
                const embed = new EmbedBuilder()
                    .setTitle(`${result.title}`)
                    .setThumbnail(`${result.thumbnail}`)
                    .setDescription(trimmedLyrics.length === 1997 ? `${trimmedLyrics}...` : trimmedLyrics)
                await interaction.editReply({ embeds: [embed] })
            }
        }catch (error) {
            console.log(error)
        }
        
        }
        else if (interaction.options.getSubcommand() === 'bassboost') {
            const queue = useQueue(interaction.guild.id);
            if (!queue) {
				playEmbed
                    .setDescription(`Sorry <@${interaction.member.id}>, there is no **Song** Playing.`)
                    .setColor('#ffff00')
                    .setThumbnail(guildIcon)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                    .setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
				return interaction.editReply({
					embeds: [playEmbed],
				}) 
        }
        //TODO Add Bassboost Filter Toggle
        await queue.filters.ffmpeg.toggle(['bassboost', 'nightcore']);
        console.log(queue.filters.ffmpeg)
            playEmbed
                    .setDescription(`Filter applied.`)
				return interaction.editReply({
					embeds: [playEmbed],
				}) 

    }
        else if (interaction.options.getSubcommand() === 'history') {
            //TODO Add Queue history
        }
        else if (interaction.options.getSubcommand() === 'exit') {
            const queue = useQueue(interaction.guild.id);
            if (!queue) {
				playEmbed
                    .setDescription(`Sorry <@${interaction.member.id}>, there is no **Song** Playing.`)
                    .setColor('#ffff00')
                    .setThumbnail(guildIcon)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                    .setFooter({ text: `${guildName} - Jukebox`, iconURL: `${guildIcon}`});
				return interaction.editReply({
					embeds: [playEmbed],
				}) 
            }    
            queue.delete();    
            return interaction.editReply({ content: "Player has been stopped, see you next time! ✅" });    
        }
	}
}