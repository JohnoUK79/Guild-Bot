const { SlashCommandBuilder } = require('@discordjs/builders');
const sql = require("../config/Database");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Levels Leaderboard!'),
	async execute(interaction) {
		board = await sql.Execute(`select * from levels where 1;`);
		console.log(board)
		return interaction.reply(`${board}`);
	},
};