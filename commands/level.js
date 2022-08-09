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
		discord = level[0].discord_username
		points = level[0].points
		level = level[0].level
		//seen = level[0].last_seen
		//discord_last_seen = level[0].last_seen_server

		search = await sql.Execute(`select * from players where player_id = '${player}';`);
				console.log(level)

		const checkLevel = new MessageEmbed()
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
		//.setImage(`${search[0].player_image}`)
		.setTimestamp()
		.setFooter({ text: `PH Family Rank - ${interaction.member.displayName}.`, iconURL: 'https://i.ibb.co/r5xScqV/78893-FB5-9973-430-D-ABA2-A81-B13-D5-DC3-B.jpg' });





		return interaction.reply({ embeds: [checkLevel] });
	},
};