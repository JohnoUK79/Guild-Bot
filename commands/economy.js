const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('economy')
		.setDescription('Warpath Discord Economy!')
		.addSubcommand(subcommand =>
			subcommand
				.setName('balance')
				.setDescription('Shows current Balance!')
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
				.setName('steal')
				.setDescription('Steal War-Coins from fellow Member!')
			)
		.addSubcommand(subcommand =>
			subcommand
				.setName('daily')
				.setDescription('Claim your Daily War-Coins!')
			)
		.addSubcommand(subcommand =>
			subcommand
				.setName('shop')
				.setDescription('Removes a Track from the Queue!')
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

		if (interaction.options.getSubcommand() === 'balance')
		{
			const balance = Economy[0].war_coins
			const bank = Economy[0].war_chest
			console.log(balance, bank)
			embed
				.setDescription(`You have **$${balance} War-Coins** in your **Wallet**!\nYou have **$${bank} War-Coins** in the **Bank**!`)
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Economy`, iconURL: `${guildIcon}`});
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
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Economy`, iconURL: `${guildIcon}`});
			} 
		else if (interaction.options.getSubcommand() === 'deposit')
		{
			const amount = interaction.options.getInteger('dep_amount');
			const wallet = Economy[0].war_coins
			const bank = Economy[0].war_chest
			const bankLevel = Economy[0].chest_level * 1000
			if (amount <= 0) return interaction.editReply(`${interaction.member} are you **Broke**? Try adding some **War-Coins** to the **War-Chest**!`)
			if (amount < bankLevel) return interaction.editReply(`${interaction.member} your **War-Chest** can't hold that many **War-Coins**, try upgrading your **War-Chest** to hold more!\nYou have space for **$${bankLevel - bank}** **War-Coins** in your **War-Chest**!`)
			try {
				if (amount > wallet) return interaction.editReply(`You do not have enough **War-Coins** for that Deposit!`);
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
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Economy`, iconURL: `${guildIcon}`});
			}
		else if (interaction.options.getSubcommand() === 'steal')
		{
			embed
				.setDescription(`**Coming Soon**!`)
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Economy`, iconURL: `${guildIcon}`});
		}
		else if (interaction.options.getSubcommand() === 'daily')
		{
			embed
				.setDescription(`**Coming Soon**!`)
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Economy`, iconURL: `${guildIcon}`});
		}
		else if (interaction.options.getSubcommand() === 'shop')
		{
			embed
				.setDescription(`**Coming Soon**!`)
				.setColor('#ffff00')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Economy`, iconURL: `${guildIcon}`});
		}
		await interaction.editReply({embeds: [embed], ephemeral: false })
		return;
	},
};