const sql = require("../config/Database");
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Colours } = require('../data/colours')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('battle-lb')
		.setDescription('Battle Leaderboard!'),
	async execute(interaction) {
		guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
		const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
		const board = await sql.Execute(`SELECT * FROM levels WHERE battle_wins > 0 ORDER BY battle_wins DESC, battle_losses ASC;`);

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
		.setColor(Colours.Black)
		.setTitle(`Battles Leaderboard`)
		.setURL('http://www.battle-bot.com/leaderboard.php')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
		.setDescription(`${interaction.member.displayName}! Here's the **Battles Board**\n**Top 3 Receive Rewards 00:00 UTC MONDAYS**\n**Wins - Losses**`)
		.setImage(`${guildIcon}`)
		.setTimestamp()
		.setFooter({ text: `${guildName} - Battles Leaderboard.`, iconURL: `${guildIcon}` });

        for (let i = 0; i < 25 && board[i]; i++) leaderBoard.addFields(
            { name: `Rank ${i + 1} `, value: `<@${board[i].discord_id}> ${board[i].battle_wins} - ${board[i].battle_losses}` })
		return interaction.reply({ embeds: [leaderBoard]})
	},
};