const sql = require("../config/Database");
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('battle-lb')
		.setDescription('Battle Leaderboard!'),
	async execute(interaction) {
		guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
		Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
		board = await sql.Execute(`select * from levels where 1 ORDER BY battle_wins DESC;`);
		var playerLevel = Level[0].level
		if (!playerLevel) {var playerLevel = 0}
		user = board[0].discord_username
		wins = board[0].battle_wins
		losses = board[0].battle_losses
		server = board[0].last_seen_server
		result = (`${user} - ${wins} - ${losses}`)
		console.log(user)

		const leaderBoard = new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle(`Battles Leaderboard`)
		.setURL('http://www.phfamily.co.uk/leaderboard.php')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
		.setDescription(`Hey **${interaction.member.displayName}**! Here is the board you asked for.`)
		.addFields(
			{ name: `Battles Board - **Top 3 Receive Rewards 00:00 UTC MONDAYS**`, value: `**Wins - Losses**` },
			{ name: `Rank 1 :first_place: ${board[0].discord_username}`, value: `${board[0].battle_wins} - ${board[0].battle_losses}` },
			{ name: `Rank 2 :second_place: ${board[1].discord_username}`, value: `${board[1].battle_wins} - ${board[1].battle_losses}` },
			{ name: `Rank 3 :third_place: ${board[2].discord_username}`, value: `${board[2].battle_wins} - ${board[2].battle_losses}` },
			)
		.setImage(`${guildIcon}`)
		.setTimestamp()
		.setFooter({ text: `${guildName} - Battles Leaderboard.`, iconURL: `${guildIcon}` });

        if (playerLevel > 9) {
			leaderBoard.setColor('#1b4332') //dark green
        }
        if (playerLevel > 19) {
			leaderBoard.setColor('#2e8f37') //forest green
        }
		if (playerLevel > 29) {
			leaderBoard.setColor('#00ff80') //spring green
		}
		if (playerLevel > 39) {
			leaderBoard.setColor('#00ffff') //cyan
		}	
		if (playerLevel > 49) {
			leaderBoard.setColor('#0080ff') //dodger blue
		}	
		if (playerLevel > 59) {
			leaderBoard.setColor('#0000ff') //blue
		}	
		if (playerLevel > 69) {
			leaderBoard.setColor('#8000ff') //purple
		} 
		if (playerLevel > 79) {
			leaderBoard.setColor('#ff0080') //magenta
		} 
		if (playerLevel > 89) {
			leaderBoard.setColor('#ff0000') //red
		} 
		if (playerLevel > 99) {
			leaderBoard.setColor('#ffff00') //yellow
		} 
		if (playerLevel > 249) {
			leaderBoard.setColor('#ffbd00') //Deep Yellow
		} 
		if (playerLevel > 499) {
			leaderBoard.setColor('#d81159') //Deep Red
		} 
		if (playerLevel > 999) {
			leaderBoard.setColor('#72ddf7') //Light Blue
		} 

		return interaction.reply({ embeds: [leaderBoard]})
	},
};