const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
    cooldown: 900000,
    data: new SlashCommandBuilder()
        .setName("steal")
        .setDescription("Steal War-Coins from fellow Member!")
		.addUserOption(option =>
			option
				.setName('victim')
				.setDescription('Member to Steal from!')
				.setRequired(true)
			),

    async execute(interaction) {
		await interaction.deferReply({
			fetchReply: true,
			ephemeral: false,
		})
		const guildIcon = interaction.member.guild.iconURL();
		const guildName = interaction.member.guild.name
		const Economy = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`)
		const embed = new EmbedBuilder();
			embed
				.setColor('#ff5b05')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Steal `, iconURL: `${guildIcon}`});


				const victim = interaction.options.getUser('victim');
				if (victim.bot === true) return interaction.editReply(`${interaction.member} **Bots** Don't have any money!\nWhat on Earth are you thinking?\nMan Up and pick a better foe!`)
				victimDB = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${victim.id}`)
				if (victim.id === interaction.member.id) {
				embed
					.setDescription(`${interaction.member}, it's not stealing, if you pick your own pockets!\nPlease select a worthy adversary!`)
	
					return interaction.editReply({ embeds: [embed] })
				}
				if (!victimDB[0]) {
					embed
						.setDescription(`**${interaction.member}**, You have tried to **Steal** from an Inactive player!\n**${victim}** has not been **Active** in a while!\nPlease pick an **Active Victim**!`)
		
					return interaction.editReply({ embeds: [embed] })
					} 
				const victimWallet = victimDB[0].war_coins 
				if (victimWallet < 1000) {
				embed
					.setDescription(`**${interaction.member}**, Rob from the Rich & Not The Poor!\n**${victim}** does not have enough **War-Coins**!\nPlease pick a new **Victim**!`)
	
				return interaction.editReply({ embeds: [embed] })
				} 
				const bounty = Math.floor(Math.random() * victimWallet) + 1;
				const playerDB = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`);
				const playerWallet = playerDB[0].war_coins
				const newWallet = playerWallet + bounty
				const newVictim = victimWallet - bounty
	
				embed
					.setDescription(`**${interaction.member}** you sucessfully stole **$${bounty.toLocaleString()} War-Coins** from ${victim}!`)
				
				updatePlayer = await sql.Execute(`UPDATE levels SET war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`);
				updateVictim = await sql.Execute(`UPDATE levels SET war_coins = '${newVictim}' WHERE discord_id = ${victim.id}`)
		return interaction.editReply({ embeds: [embed] });
			} 
		}
