const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
const { Colours } = require('../data/colours');
setDate = timestamp.UTCdefault()

module.exports = {
    cooldown: 900000,
    data: new SlashCommandBuilder()
        .setName("work")
        .setDescription("Go to Work for War-Coins!"),

    async execute(interaction) {
		guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
		Economy = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`)
		const embed = new EmbedBuilder();
			embed
				.setColor(Colours.Black)
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Working`, iconURL: `${guildIcon}`});

			const wallet = Economy[0].war_coins
			let officerlevel = Economy[0].officer_level;
			if (officerlevel === 0) {officerlevel = 1}
			const begBonus = Math.floor(Math.random() * (25000 - 10000 + 1)) + 10000
			const beg = Math.round(begBonus * officerlevel)
			const newWallet = wallet + beg;
			const begUpdate = await sql.Execute(`UPDATE levels SET war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`)
			console.log(`Beg ${interaction.member.displayName}: ${begUpdate.info}`)
			
			embed
				.setDescription(`${interaction.member} You sucessfully **Earned $${beg.toLocaleString()} War-Coins from Work**!`)
		return interaction.reply({ embeds: [embed] });
			} 
		}
