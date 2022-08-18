const { SlashCommandBuilder } = require('@discordjs/builders');
const interaction = require('discord-interactions-zero');
const sql = require("../config/Database");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Dummy Command for Testing.'),
	async execute(Interaction) {
		testQuery = await sql.Execute(`select * from players where 1`)
		console.log(testQuery)
		await interaction.reply

	},
};
