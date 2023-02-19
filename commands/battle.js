const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
const { battle } = require('../functions/battleMechanics');
setDate = timestamp.UTCdefault()

module.exports = {
    //cooldown: 1800000,
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
		// const guildIcon = interaction.member.guild.iconURL();
		// const guildName = interaction.member.guild.name
		// const Economy = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`)
		// const embed = new EmbedBuilder();
		// 	embed
		// 		.setColor('#ff5b05')
		// 		.setThumbnail(guildIcon)
		// 		.setTimestamp()
		// 		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
		// 		.setFooter({ text: `${guildName} - Warpath Battles`, iconURL: `${guildIcon}`});


		// 		const victim = interaction.options.getUser('victim');
		// 		if (victim.bot === true) return interaction.editReply(`${interaction.member} Stop trying to **BULLY PIXELS**, You can only **FIGHT** real members\nMan Up and pick a better foe!`)
		// 		victimDB = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${victim.id}`)
		// 		if (victim.id === interaction.member.id) {
		// 		embed
		// 			.setDescription(`${interaction.member}, Stop picking fights with yourself!\nPlease select a worthy adversary!`)
	
		// 			return interaction.editReply({ embeds: [embed] })
		// 		}
		// 		const victimWallet = victimDB[0].war_coins 

		// 		const bounty = Math.floor(Math.random() * victimWallet) + 1;
		// 		const playerDB = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`);
		// 		const playerWallet = playerDB[0].war_coins
		// 		const newWallet = playerWallet + bounty
		// 		const newVictim = victimWallet - bounty
	
		// 		embed
		// 			.setDescription(`**${interaction.member}** you sucessfully stole **$${bounty.toLocaleString()}** from ${victim}!\nYou now have **$${newWallet.toLocaleString()} War-Coins** in your Wallet!`)
				
		// 		updatePlayer = await sql.Execute(`UPDATE levels SET war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`);
		// 		updateVictim = await sql.Execute(`UPDATE levels SET war_coins = '${newVictim}' WHERE discord_id = ${victim.id}`)
		// return interaction.editReply({ embeds: [embed] });
			} 
		}
