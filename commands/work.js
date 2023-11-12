const { SlashCommandBuilder, EmbedBuilder, Collection } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
const { Colours } = require('../data/colours');
setDate = timestamp.UTCdefault()

module.exports = {
    cooldown: 14400000,
    data: new SlashCommandBuilder()
        .setName("work")
        .setDescription("Go to Work for War-Coins!"),

    async execute(interaction) {
		guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
		let Economy = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`)
	if (Economy.length === 0) {
		const warcoins = 5000000
		const newRegistration = await sql.Execute(`INSERT INTO levels (discord_id, war_coins) VALUES ('${interaction.member.id}', '${warcoins}');`)
		Economy = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`)
		console.log(newRegistration)
	}
		const wallet = Economy[0].war_coins
		let officerlevel = Economy[0].officer_level;
		if (officerlevel === 0) {officerlevel = 1}
		const workBonus = Math.floor(Math.random() * (25000 - 10000 + 1)) + 10000
		const work = Math.round(workBonus * officerlevel)

		const Job = {
			Job1: `${interaction.member} spent **${Math.floor(Math.random() * (12 - 1 + 1)) + 1}** hours **Cleaning Toilets** & **Earned $${work.toLocaleString()} War-Coins** from **Work**!`,
			Job2: `${interaction.member} spent **${Math.floor(Math.random() * (12 - 1 + 1)) + 1}** hours **Waiting Tables** & **Earned $${work.toLocaleString()} War-Coins** from **Work**!`,
			Job3: `${interaction.member} spent **${Math.floor(Math.random() * (12 - 1 + 1)) + 1}** hours **Stocking Shelves** & **Earned $${work.toLocaleString()} War-Coins** from **Work**!`,
			Job4: `${interaction.member} spent **${Math.floor(Math.random() * (12 - 1 + 1)) + 1}** hours **Filling Gas** & **Earned $${work.toLocaleString()} War-Coins** from **Work**!`,
			Job5: `${interaction.member} spent **${Math.floor(Math.random() * (12 - 1 + 1)) + 1}** hours **Delivering Groceries** & **Earned $${work.toLocaleString()} War-Coins** from **Work**!`,
			Job6: `${interaction.member} spent **${Math.floor(Math.random() * (12 - 1 + 1)) + 1}** hours **Delivering Pizza** & **Earned $${work.toLocaleString()} War-Coins** from **Work**!`,
			Job7: `${interaction.member} spent **${Math.floor(Math.random() * (12 - 1 + 1)) + 1}** hours on **Bar Duty** & **Earned $${work.toLocaleString()} War-Coins** from **Work**!`,
			Job8: `${interaction.member} spent **${Math.floor(Math.random() * (12 - 1 + 1)) + 1}** hours on **The Checkout** & **Earned $${work.toLocaleString()} War-Coins** from **Work**!`,
			Job9: `${interaction.member} spent **${Math.floor(Math.random() * (12 - 1 + 1)) + 1}** hours **Standing Guard** & **Earned $${work.toLocaleString()} War-Coins** from **Work**!`,
			Job10: `${interaction.member} spent **${Math.floor(Math.random() * (12 - 1 + 1)) + 1}** hours **Doing Nothing** & **Earned $${work.toLocaleString()} War-Coins** from **Work**!`,
		}
		let jobsArray = Object.keys(Job);
		let randomNumber = Math.random();
		let jobsIndex = Math.floor(randomNumber * jobsArray.length);
		let randomJob = jobsArray[jobsIndex];
		let jobsValue = Job[randomJob]
		console.log(jobsValue)

		const embed = new EmbedBuilder();
			embed
				.setColor(Colours.Yellow)
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Working`, iconURL: `${guildIcon}`});

			const newWallet = wallet + work;
			const workUpdate = await sql.Execute(`UPDATE levels SET war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`)
			console.log(`Work ${interaction.member.displayName}: ${workUpdate.info}`)
			
			embed
				.setDescription(jobsValue)
		return interaction.reply({ embeds: [embed] });
			} 
		}
