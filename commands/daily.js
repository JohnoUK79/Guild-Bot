const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
    cooldown: 43200000,
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Claim your Daily War-Coins!"),

    async execute(interaction) {
		guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
		let Economy = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`)
		if (Economy.length === 0) {
			console.log(`New Player Registered`)
			const registerEmbed = new EmbedBuilder()
				registerEmbed
				.setDescription(`Welcome **${interaction.member.displayName}** you are now registered for **Battle-Bot**\nYou have $3,000,000 War-Coins to get you started.\nPlease use **/Battle-Bot Profile** to get started.\nMention ${interaction.member.client.user} for Help!`)
				const warcoins = 25000000
				const newRegistration = await sql.Execute(`INSERT INTO levels (discord_id, war_coins) VALUES ('${interaction.member.id}', '${warcoins}');`)
				console.log(newRegistration)
		} 
		Economy = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`)

		const embed = new EmbedBuilder();
			embed
				.setColor('#ff5b05')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Daily Rewards`, iconURL: `${guildIcon}`});

        	const wallet = Economy[0].war_coins
			const bank = Economy[0].war_chest
			let officer = Economy[0].officer_level
			if (!officer) {officer = 1}
			const dailyBonus = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000
			const daily = (dailyBonus * officer)

			const newWallet = wallet + daily;
			const dailyUpdate = await sql.Execute(`UPDATE levels SET war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`)
			console.log(`Daily: ${interaction.member.displayName} ${dailyUpdate.info}`)
			embed
				.setDescription(`${interaction.member} You sucessfully claimed **$${daily.toLocaleString()} War-Coins** as a **Daily Bonus** for being **Active**!`)
			return interaction.reply({ embeds: [embed] });
			} 
		}
