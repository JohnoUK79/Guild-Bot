const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
    cooldown: 43200000,
    data: new SlashCommandBuilder()
        //.setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)
        .setName("daily")
        .setDescription("Claim your Daily War-Coins!"),

    async execute(interaction) {
		guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
		Economy = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`)
		let embed = new EmbedBuilder();
			embed
				.setColor('#ff5b05')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Daily Rewards`, iconURL: `${guildIcon}`});

        	const wallet = Economy[0].war_coins
			const bank = Economy[0].war_chest
			const randomNumber = Math.floor(Math.random() * 5000) + 1;
			const newWallet = wallet + randomNumber;
			console.log(wallet, bank, randomNumber, newWallet)
			dailyUpdate = await sql.Execute(`UPDATE levels SET war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`)

			embed
				.setDescription(`${interaction.member} You sucessfully claimed **$${randomNumber} War-Coins** as a Daily Bonus for being Active!\nYou now have **$${newWallet} War-Coins!**`)
		return interaction.reply({ embeds: [embed] });
			} 
		}
