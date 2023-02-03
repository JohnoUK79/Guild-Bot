const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warpath')
		.setDescription('Discord Mini Warpath!')
		.addSubcommand(subcommand =>
			subcommand
				.setName('balance')
				.setDescription('Shows current War-Coins Balance!')
			)
		.addSubcommand(subcommand =>
			subcommand
				.setName('beg')
				.setDescription('Begs for additional War-Coins!')
			)
		.addSubcommand(subcommand =>
			subcommand
				.setName('deposit')
				.setDescription('Deposit War-Coins safetly in the War-Chest!')
				.addIntegerOption(option =>
					option
						.setName('dep_amount')
						.setDescription('Amount to be Deposited!')
						.setRequired(true)
					)
			)
		.addSubcommand(subcommand =>
			subcommand
				.setName('withdraw')
				.setDescription('Withdraw War-Coins from the War-Chest!')
				.addIntegerOption(option =>
					option
						.setName('wdw_amount')
						.setDescription('Amount to be Withdrawn!')
						.setRequired(true)
					)
			)
		.addSubcommand(subcommand =>
			subcommand
				.setName('daily')
				.setDescription('Claim your Daily War-Coins!')
			)
		.addSubcommand(subcommand =>
			subcommand
				.setName('shop')
				.setDescription('Shop Coming Soon!')
			)
		.addSubcommand(subcommand =>
			subcommand
				.setName('steal')
				.setDescription('Steal War-Coins from fellow Member!')
				.addUserOption(option =>
					option
						.setName('victim')
						.setDescription('Member to Steal from!')
						.setRequired(true)
					)
			),

				
	async execute(interaction) {
		await interaction.deferReply({
			fetchReply: true,
			ephemeral: false,
		})
		guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
		Economy = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`)
		let embed = new EmbedBuilder();
			embed
				.setColor('#ff5b05')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Mini Warpath`, iconURL: `${guildIcon}`});

		if (interaction.options.getSubcommand() === 'balance')
		{
			const balance = Economy[0].war_coins
			const bank = Economy[0].war_chest
			console.log(balance, bank)
			embed
				.setDescription(`${interaction.member} You have **$${balance} War-Coins** in your **Wallet**!\nYou have **$${bank} War-Coins** in the **War-Chest**!`)

		}
		else if (interaction.options.getSubcommand() === 'beg')
		{
			const wallet = Economy[0].war_coins
			const bank = Economy[0].war_chest
			const randomNumber = Math.floor(Math.random() * 500) + 1;
			const newWallet = wallet + randomNumber;
			console.log(wallet, bank, randomNumber, newWallet)
			begUpdate = await sql.Execute(`UPDATE levels SET war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`)

			embed
				.setDescription(`${interaction.member} You sucessfully **Begged $${randomNumber} War-Coins**!\nYou now have **$${newWallet} War-Coins!**`)
			} 
		else if (interaction.options.getSubcommand() === 'deposit')
		{
			const amount = interaction.options.getInteger('dep_amount');
			const wallet = Economy[0].war_coins
			const bank = Economy[0].war_chest
			const bankLevel = Economy[0].chest_level
			const bankMax = bankLevel * 10000

			if (amount <= 0) {
			embed
				.setDescription(`${interaction.member} are you **Broke**? Try adding some **War-Coins** to the **War-Chest**!`)
			return interaction.editReply({ embeds: [embed] })
			}
			
			if (amount + bank > bankMax) {
			embed
				.setDescription(`${interaction.member} your **War-Chest** can't hold that many **War-Coins**, try upgrading your **War-Chest** to hold more!\nYou have space for **$${bankMax - bank}** **War-Coins** in your **War-Chest**!`)
			return interaction.editReply({ embeds: [embed] })
			}

			try {
				if (amount > wallet) {
				embed
					.setDescription(`${interaction.member} You do not have enough **War-Coins** for that Deposit!\nYou have **$${wallet} War-Coins** available!`)
				return interaction.editReply({ embeds: [embed] });
				} 

				const newWallet = wallet - amount
				const newBank = bank + amount
				
				embed
					.addFields(
						{ name: `War-Coins:`, value: ` ${newWallet}`, inline: true }, 
						{ name: `War-Chest:`, value: `${newBank}`, inline: true },
					)
				depositUpdate = await sql.Execute(`UPDATE levels SET war_coins = '${newWallet}', war_chest = '${newBank}' WHERE discord_id = ${interaction.member.id}`)

			} catch (err) {
				console.log(err);
			}

			console.log(amount)
			embed
				.setDescription(`**Deposit Sucessful**!`)
			}
		else if (interaction.options.getSubcommand() === 'withdraw')
		{
			const amount = interaction.options.getInteger('wdw_amount');
			const wallet = Economy[0].war_coins
			const bank = Economy[0].war_chest
			try {
				if (amount > bank) return interaction.editReply(`You do not have enough **War-Coins** in the **War-Chest** for that withdrawal!\nYou have **$${bank}** **War-Coins** in the **War-Chest**!`);
				const newWallet = wallet + amount
				const newBank = bank - amount
				embed
					.setDescription(`**Withdrawal Sucessful**!`)
					.addFields(
						{ name: `War-Coins:`, value: ` ${newWallet}`, inline: true }, 
						{ name: `War-Chest:`, value: `${newBank}`, inline: true },
					)
				withdrawUpdate = await sql.Execute(`UPDATE levels SET war_coins = '${newWallet}', war_chest = '${newBank}' WHERE discord_id = ${interaction.member.id}`)

			} catch (err) {
				console.log(err);
			}
		}
		else if (interaction.options.getSubcommand() === 'daily')
		{
			const wallet = Economy[0].war_coins
			const bank = Economy[0].war_chest
			const randomNumber = Math.floor(Math.random() * 5000) + 1;
			const newWallet = wallet + randomNumber;
			console.log(wallet, bank, randomNumber, newWallet)
			begUpdate = await sql.Execute(`UPDATE levels SET war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`)

			embed
				.setDescription(`${interaction.member} You sucessfully claimed **$${randomNumber} War-Coins** as a Daily Bonus for being Active!\nYou now have **$${newWallet} War-Coins!**`)
			} 
		else if (interaction.options.getSubcommand() === 'shop')
		{
			embed
				.setDescription(`**Coming Soon**!`)
		}
		else if (interaction.options.getSubcommand() === 'steal')
		{
			const victim = interaction.options.getUser('victim');
			if (victim.bot === true) return interaction.editReply(`${interaction.member} **Bots** Don't have any money!\nWhat on Earth are you thinking?\nMan Up and pick a better foe!`)
			victimDB = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${victim.id}`)
			if (victim.id === interaction.member.id) {
			embed
				.setDescription(`${interaction.member}, it's not stealing, if you pick your own pockets!\nPlease select a worthy adversary!`)

				return interaction.editReply({ embeds: [embed] })
			}
			const victimWallet = victimDB[0].war_coins 
			if (victimWallet < 1000) {
			embed
				.setDescription(`**${interaction.member}**, rob from the Rich & Not The Poor!\n**${victim}** does not have enough **War-Coins**!\nPlease pick a new **Victim**!`)

			return interaction.editReply({ embeds: [embed] })
			} 
			const bounty = Math.floor(Math.random() * victimWallet) + 1;
			playerDB = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`);
			playerWallet = playerDB[0].war_coins
			newWallet = playerWallet + bounty
			newVictim = victimWallet - bounty

			embed
				.setDescription(`**${interaction.member}** you sucessfully stole **$${bounty}** from ${victim}!\nYou now have **$${newWallet} War-Coins** in your Wallet!`)
			
			updatePlayer = await sql.Execute(`UPDATE levels SET war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`);
			updateVictim = await sql.Execute(`UPDATE levels SET war_coins = '${newVictim}' WHERE discord_id = ${victim.id}`)
			console.log(updatePlayer)
			console.log(updateVictim)

			}
		await interaction.editReply({embeds: [embed], ephemeral: false })
		return;
	},
};