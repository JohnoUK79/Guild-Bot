const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
const { battle } = require('../functions/battleMechanics');
setDate = timestamp.UTCdefault()

module.exports = {
    cooldown: 900000,
    data: new SlashCommandBuilder()
        //.setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)
        .setName("battle")
        .setDescription("Battle with a fellow Member!")
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('Member to Fight with!')
				.setRequired(true)
			),

    async execute(interaction) {
		await interaction.deferReply({
			fetchReply: true,
			ephemeral: false,
		})
		try {
		battle(interaction)
		} catch (err) {console.log(err)}
			} 
		}
