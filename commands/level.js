const { SlashCommandBuilder } = require('@discordjs/builders');
const sql = require("../config/Database");
const { MessageEmbed, Client, ModalSubmitFieldsResolver, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('level')
		.setDescription('Check your current Levels Rank!'),
	async execute(interaction) {
		
		level = await sql.Execute(`select * from levels where discord_id = '${interaction.user.id}';`);
		player = level[0].player_id
		Players = await sql.Execute(`select * from players where player_id = ${player}`)
		discord = interaction.member.username
		points = level[0].points
		level = level[0].level

		if (!player) {
			var playerImage = "http://phfamily.co.uk/img/gifs/NotFound.png"
		} else var playerImage = Players[0].player_image
		//seen = level[0].last_seen
		//seenDiscord = level[0].last_seen_server

		search = await sql.Execute(`select * from players where player_id = '${player}';`);
		
		const updatePlayer =  new MessageActionRow()
				.addComponents(
		new MessageButton()
				.setCustomId('UID')
				.setLabel('Add in Game User ID to profile!')
				.setStyle('PRIMARY'),
		)


		const unknownLevel = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('PH Family Rank Card')
		.setURL('http://www.phfamily.co.uk/leaderboard.php')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }), url: '' })
		.setDescription(`Your Rank **${interaction.member.displayName}**!`)
		.addFields(
			{ name: `Name:`, value: `${interaction.member.displayName}` },
			{ name: `Points:`, value: `${points}` },
			{ name: 'Level.', value: `${level}`, inline: true },
			)
		.setImage(playerImage)
		.setTimestamp()
		.setFooter({ text: `PH Family Rank - ${interaction.member.displayName}.`, iconURL: 'https://i.ibb.co/r5xScqV/78893-FB5-9973-430-D-ABA2-A81-B13-D5-DC3-B.jpg' });

		const playerLevel = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('PH Family Rank Card')
		.setURL('http://www.phfamily.co.uk/leaderboard.php')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }), url: '' })
		.setDescription(`Your Rank **${interaction.member.displayName}**!`)
		.addFields(
			{ name: `Name:`, value: `${interaction.member.displayName}` },
			{ name: `Points:`, value: `${points}` },
			{ name: 'Level.', value: `${level}`, inline: true },
			//{ name: 'Last Seen.', value: `${seen}`, inline: true },
			//{ name: 'Last Seen Discord Server.', value: `${seenDiscord}`, inline: true },
			)
		.setImage(playerImage)
		.setTimestamp()
		.setFooter({ text: `PH Family Rank - ${interaction.member.displayName}.`, iconURL: 'https://i.ibb.co/r5xScqV/78893-FB5-9973-430-D-ABA2-A81-B13-D5-DC3-B.jpg' });



		if (!player) {
			return interaction.reply({ embeds: [unknownLevel], components: [updatePlayer] });
		} else return interaction.reply({ embeds: [playerLevel], components: [updatePlayer] });
		
	},
};
            //components: [player],
