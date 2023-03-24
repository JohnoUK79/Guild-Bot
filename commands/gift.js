const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { OWNER } = require('../config.json');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)
        .setName("gift")
        .setDescription("Gift War-Coins!")
		.addUserOption(option =>
			option
				.setName('player')
				.setDescription('Member to Gift Coins to!')
				.setRequired(true)
			)
		.addIntegerOption(option =>
			option
				.setName('amount')
				.setDescription('Amount of War-Coins to gift!')
				.setRequired(true)
			),

    async execute(interaction) {
		await interaction.deferReply({
			fetchReply: true,
			ephemeral: true,
		})
		if (interaction.member.id != OWNER) {return interaction.editReply(`Only the Bot Owner Can Gift Coins! Contact <@${OWNER}> for more details.`)}
		const player = interaction.options.getUser('player');
		const amount = interaction.options.getInteger('amount');
		guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
		Economy = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${player.id}`)
		const embed = new EmbedBuilder();
			embed
				.setColor('#ff5b05')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Gift Rewards`, iconURL: `${guildIcon}`});
       	const wallet = Economy[0].war_coins
		const bank = Economy[0].war_chest
		const newWallet = wallet + amount;
		const giftUpdate = await sql.Execute(`UPDATE levels SET war_coins = '${newWallet}' WHERE discord_id = ${player.id}`)
		console.log(`Gift: ${player.username} ${giftUpdate.info}`)
		embed
			.setDescription(`${interaction.member} You sucessfully gifted **$${amount.toLocaleString()} War-Coins** to ${player}`)
			.addFields(
				{ name: `War-Coins:`, value: `$${newWallet.toLocaleString()}`, inline: true }, 
				{ name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
			)
		return interaction.editReply({ embeds: [embed] });
			} 
		}
