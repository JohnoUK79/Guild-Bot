const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
    cooldown: 28800000,
    data: new SlashCommandBuilder()
        //.setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)
        .setName("daily")
        .setDescription("Claim your Daily War-Coins!"),

    async execute(interaction) {
		guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
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
			if (officer !== '') {officer = 1}
			const dailyBonus = Math.floor(Math.random() * (50000 - 25000 + 1)) + 25000
			console.log(`Daily:${dailyBonus}`)
			const daily = (dailyBonus * officer)
			console.log(daily)

			const newWallet = wallet + daily;
			const dailyUpdate = await sql.Execute(`UPDATE levels SET war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`)
			console.log(`Daily: ${dailyUpdate.info}`)
			embed
				.setDescription(`${interaction.member} You sucessfully claimed **$${daily.toLocaleString()} War-Coins** as a **Daily Bonus** for being **Active**!`)
				// .addFields(
				// 	{ name: `War-Coins:`, value: `$${newWallet.toLocaleString()}`, inline: true }, 
				// 	{ name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
				// )
		return interaction.reply({ embeds: [embed] });
			} 
		}
