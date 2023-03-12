const sql = require("../config/Database");
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('battle-lb')
		.setDescription('Battle Leaderboard!'),
	async execute(interaction) {
		guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
		const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
		const board = await sql.Execute(`SELECT * FROM levels WHERE battle_wins > 0 ORDER BY battle_wins DESC;`);
		console.log(board)
		if (!board[0]) {
			return await interaction.reply({content: `No Battle Data Available`, ephemeral: true})
		} else
		var playerLevel = Level[0].level
		if (!playerLevel) {var playerLevel = 0}
		user = board[0].discord_username
		wins = board[0].battle_wins
		losses = board[0].battle_losses
		server = board[0].last_seen_server
		result = (`${user} - ${wins} - ${losses}`)

		const leaderBoard = new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle(`Battles Leaderboard`)
		.setURL('http://www.phfamily.co.uk/leaderboard.php')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
		.setDescription(`${interaction.member.displayName}! Here's the **Battles Board**\n**Top 3 Receive Rewards 00:00 UTC MONDAYS**\n**Wins - Losses**`)
		.setImage(`${guildIcon}`)
		.setTimestamp()
		.setFooter({ text: `${guildName} - Battles Leaderboard.`, iconURL: `${guildIcon}` });

        for (let i = 0; i < 25 && board[i]; i++) leaderBoard.addFields(
            { name: `Rank ${i + 1} ${board[i].discord_username}`, value: `${board[i].battle_wins} - ${board[i].battle_losses}` })


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