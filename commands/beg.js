const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
    cooldown: 900000,
    data: new SlashCommandBuilder()
        //.setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)
        .setName("beg")
        .setDescription("Beg for War-Coins!"),

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
				.setFooter({ text: `${guildName} - Begging`, iconURL: `${guildIcon}`});

			const wallet = Economy[0].war_coins
			const bank = Economy[0].war_chest
			let unitlevel = Economy[0].unit_level;
			if (unitlevel !== '') {officerLevel = 0}
			const randomNumber = Math.floor(Math.random() * 25000) * +1;
			const beg = Math.floor(randomNumber * unitlevel) 
			console.log(beg)

			const newWallet = wallet + beg;
			const begUpdate = await sql.Execute(`UPDATE levels SET war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`)
			console.log(`Beg: ${begUpdate.info}`)
			embed
				.setDescription(`${interaction.member} You sucessfully **Begged $${beg.toLocaleString()} War-Coins**!`)
				.addFields(
					{ name: `War-Coins:`, value: `$${newWallet.toLocaleString()}`, inline: true }, 
					{ name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
				)
		return interaction.reply({ embeds: [embed] });
			} 
		}
