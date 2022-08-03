const { SlashCommandBuilder } = require('@discordjs/builders');
const sql = require("../config/Database");
const { MessageEmbed, Client, ModalSubmitFieldsResolver, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('PH Family Levels Leaderboard!'),
	async execute(interaction) {

		const buttonsCP =   new MessageActionRow()
			        .addComponents(
                new MessageButton()
                    .setCustomId("Top10")
                    .setName("Top10")
					.setLabel('Show Top 10')
                    .setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId("Top20")
					.setName("Top20")
					.setLabel('Show 11 - 20')
					.setStyle('SUCCESS'),
				new MessageButton()
					.setCustomId("Top30")
					.setName("Top30")
					.setLabel('Show 21 - 30')
					.setStyle('DANGER'),
				)
		board = await sql.Execute(`select * from levels where 1 ORDER BY points DESC;`);
		user = board[0].discord_username
		points = board[0].points
		level = board[0].level
		server = board[0].last_seen_server
		result = (`${user} - ${level} - ${points}`)
		console.log(user)

		const leaderBoard = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('PH Family Levels Leaderboard')
		.setURL('http://www.phfamily.co.uk')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }), url: '' })
		.setDescription(`Hey **${interaction.member.displayName}**! Here is the board you asked for.`)
		.addFields(
			{ name: `PH Family Levels Board`, value: `**Name - Level - Points**\n` },
			{ name: `Rank 1 :first_place::`, value: `${board[0].discord_username} - ${board[0].level} - ${board[0].points}` },
			{ name: `Rank 2 :second_place::`, value: `${board[1].discord_username} - ${board[1].level} - ${board[1].points}` },
			{ name: 'Rank 3 :third_place::', value: `${board[2].discord_username} - ${board[2].level} - ${board[2].points}` },
			{ name: 'Best of the Rest:', value: `**Rank - Name - Level - Points**\n\n**Rank 4:** ${board[3].discord_username} - ${board[3].level} - ${board[3].points}\n\n**Rank 5:** ${board[4].discord_username} - ${board[4].level} - ${board[4].points}\n\n**Rank 6:** ${board[5].discord_username} - ${board[5].level} - ${board[5].points}\n\n**Rank 7:** ${board[6].discord_username} - ${board[6].level} - ${board[6].points}\n\n**Rank 8:** ${board[7].discord_username} - ${board[7].level} - ${board[7].points}\n\n**Rank 9:** ${board[8].discord_username} - ${board[8].level} - ${board[8].points}\n\n**Rank 10:** ${board[9].discord_username} - ${board[9].level} - ${board[9].points}` },

			)
		//.setImage(`${Data[0].player_image}`) // to be linked to player search gif 
		.setTimestamp()
		.setFooter({ text: 'PH Family Shit Talker Leaderboard.', iconURL: 'https://i.ibb.co/r5xScqV/78893-FB5-9973-430-D-ABA2-A81-B13-D5-DC3-B.jpg' });


		return interaction.reply({ embeds: [leaderBoard], components: [buttonsCP]})
	},
};