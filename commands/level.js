const { SlashCommandBuilder } = require('@discordjs/builders');
const sql = require("../config/Database");
const { MessageEmbed, Client, ModalSubmitFieldsResolver, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('level')
		.setDescription('Check your current Levels Rank!'),
	async execute(interaction) {
		guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
		level = await sql.Execute(`select * from levels where discord_id = '${interaction.user.id}';`);
		player = level[0].player_id
		Players = await sql.Execute(`select * from players where player_id = ${player}`)
		discord = interaction.member.username
		points = level[0].points
		oldlevel = level[0].level
		seen = level[0].last_seen
		seenDiscord = level[0].last_seen_server

		if (!player) {
			var playerImage = "http://phfamily.co.uk/img/gifs/NotFound.png"
		} else var playerImage = Players[0].player_image

		search = await sql.Execute(`select * from players where player_id = '${player}';`);
		
		const updatePlayer =  new MessageActionRow()
				.addComponents(
		new MessageButton()
				.setCustomId('UID')
				.setLabel('Add/Update Your in Game Bot profile!')
				.setStyle('PRIMARY'),
		)


		const unknownLevel = new MessageEmbed()
		.setColor('GREEN')
		.setTitle(`${guildName} - Rank Card`)
		.setURL('http://www.phfamily.co.uk/leaderboard.php')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }), url: '' })
		.setDescription(`Your Rank **${interaction.member.displayName}**!`)
		.addFields(
			{ name: `Name:`, value: `${interaction.member.displayName}` },
			{ name: `Points:`, value: `${points}` },
			{ name: 'Level.', value: `${oldlevel}`, inline: true },
			)
		.setImage(playerImage)
		.setTimestamp()
		.setFooter({ text: `${guildName} - Rank - ${interaction.member.displayName}.`, iconURL: `${guildIcon}` });

		const playerLevel = new MessageEmbed()
		.setColor('GREEN')
		.setTitle(`${guildName} - Rank Card`)
		.setURL('http://www.phfamily.co.uk/leaderboard.php')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }), url: '' })
		.setDescription(`Your Rank **${interaction.member.displayName}**!`)
		.addFields(
			{ name: `Name:`, value: `${interaction.member.displayName}` },
			{ name: `Points:`, value: `${points}` },
			{ name: 'Level.', value: `${oldlevel}`, inline: true },
			{ name: 'Last Seen.', value: `${seen}`, inline: true },
			{ name: 'Last Seen Discord Server.', value: `${seenDiscord}`, inline: true },
			)
		.setImage(playerImage)
		.setTimestamp()
		.setFooter({ text: `${guildName} - Rank - ${interaction.member.displayName}.`, iconURL: `${guildIcon}` });
		if(!oldlevel) {oldlevel = 0}
		if (oldlevel > 10) {
			playerLevel.setColor('#2e8f37') //forest green
		}
		if (oldlevel > 20) {
			playerLevel.setColor('DARK_GREEN') //dark green
		}
		if (oldlevel > 30) {
			playerLevel.setColor('#00ff80') //spring green
		}
		if (oldlevel > 40) {
			playerLevel.setColor('#00ffff') //cyan
		}	
		if (oldlevel > 50) {
			playerLevel.setColor('#0080ff') //dodger blue
		}	
		if (oldlevel > 60) {
			playerLevel.setColor('#0000ff') //blue
		}	
		if (oldlevel > 70) {
			playerLevel.setColor('#8000ff') //purple
		} 
		if (oldlevel > 80) {
			playerLevel.setColor('#ff0080') //magenta
		} 
		if (oldlevel > 90) {
			playerLevel.setColor('#ff0000') //red
		} 
		if (oldlevel > 100) {
			playerLevel.setColor('#ffff00') //yellow
		} 

		if (!player) {
			return interaction.reply({ embeds: [unknownLevel], components: [updatePlayer] });
		} else return interaction.reply({ embeds: [playerLevel], components: [updatePlayer] });
		
	},
};
