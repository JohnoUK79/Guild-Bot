const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
    cooldown: 3600000,
    data: new SlashCommandBuilder()
        //.setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)
        .setName("beg")
        .setDescription("Beg for War-Coins!"),

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
				.setFooter({ text: `${guildName} - Begging for War-Coins`, iconURL: `${guildIcon}`});

			const wallet = Economy[0].war_coins
			const bank = Economy[0].war_chest
			const randomNumber = Math.floor(Math.random() * 500) + 1;
			const newWallet = wallet + randomNumber;
			console.log(wallet, bank, randomNumber, newWallet)
			begUpdate = await sql.Execute(`UPDATE levels SET war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`)

			embed
				.setDescription(`${interaction.member} You sucessfully **Begged $${randomNumber} War-Coins**!\nYou now have **$${newWallet} War-Coins!**`)
		return interaction.reply({ embeds: [embed] });
			} 
		}
