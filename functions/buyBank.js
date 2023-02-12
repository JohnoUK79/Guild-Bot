const sql = require("../config/Database");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    buyBank: async function (interaction) {
		const upgradeBankEmbed = new EmbedBuilder();
		const upgradeBankButtons = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId("buybank")
				.setLabel('Upgrade')
				.setStyle(ButtonStyle.Success),
			new ButtonBuilder()
				.setCustomId("cancel")
				.setLabel('Cancel')
				.setStyle(ButtonStyle.Danger),
		)

        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name	
        const wallet = Level[0].war_coins
        const bank = Level[0].war_chest
        const baseLevel = Level[0].base_level
        const bankLevel = Level[0].chest_level
        const cost = (bankLevel + 1) * 10000
        if (bankLevel > baseLevel) {
            console.log(`Base Upgrade Needed`),
            upgradeBankEmbed
                .setColor('#ff5b05')
                .setThumbnail(guildIcon)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setDescription(`${interaction.member}, You need to upgrade your **War-Base** for this upgrade.`)
                .addFields(
                        { name: `War-Coins:`, value: `$${wallet}`, inline: true }, 
                        { name: `War-Chest:`, value: `$${bank}`, inline: true },
                        { name: `Bank Level:`, value: `${bankLevel}`, inline: true }, 
                        { name: `Base Level:`, value: `${baseLevel}`, inline: true },
                    )
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

        return interaction.update({embeds: [upgradeBankEmbed], components: [upgradeBankButtons]})
        }
        if (cost > wallet) {
            console.log(`No Money`),
            upgradeBankEmbed
                .setColor('#ff5b05')
                .setThumbnail(guildIcon)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setDescription(`${interaction.member}, You do not have enough **War-Coins** for this upgrade.\nYou are **$${cost - wallet} War-Coins** short!\nTry withdrawing from your **War-Chest**!`)
                .addFields(
                        { name: `War-Coins:`, value: `$${wallet}`, inline: true }, 
                        { name: `War-Chest:`, value: `$${bank}`, inline: true },
                        { name: `Current Level:`, value: `${bankLevel}`, inline: true }, 
                        { name: `Upgrade Cost:`, value: `$${cost}`, inline: true },
                    )
                    .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

        return interaction.update({embeds: [upgradeBankEmbed], components: [upgradeBankButtons]})	
        }
        const newWallet = wallet - cost
        const newBank = bankLevel + 1
        upgradeBankEmbed
        .setColor('#ff5b05')
        .setThumbnail(guildIcon)
        .setTimestamp()
        .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
		.setDescription(`**${interaction.member}, War-Chest Upgrade Successful**`)
			.addFields(
				{ name: `War-Coins:`, value: `$${newWallet}`, inline: true }, 
				{ name: `War-Chest:`, value: `$${bank}`, inline: true },
				{ name: `New Level:`, value: `${newBank}`, inline: true }, 
			)
		.setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

    const bankUpgrade = await sql.Execute(`UPDATE levels SET war_coins = ${newWallet}, chest_level = '${newBank}' WHERE discord_id = '${interaction.member.id}'`)
    console.log(bankUpgrade)
    return interaction.update({embeds: [upgradeBankEmbed], components: [upgradeBankButtons]})	
    }

    }