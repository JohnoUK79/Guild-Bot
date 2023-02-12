const sql = require("../config/Database");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    buyOfficer: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const upgradeOfficerEmbed = new EmbedBuilder();
        const upgradeOfficerButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("buyofficer")
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
        const officer = Level[0].officer
        const officerLevel = Level[0].officer_level
        const cost = (officerLevel + 1) * 50000

        if (officerLevel > baseLevel ) {
            console.log(`Base Upgrade Needed`),
            upgradeOfficerEmbed
                .setColor('#ff5b05')
                .setThumbnail(guildIcon)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setDescription(`${interaction.member}, You need to upgrade your **War-Base** for this upgrade.`)
                .addFields(
                        { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
                        { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                        { name: `Base Level:`, value: `${baseLevel}`, inline: true },
                        { name: `Officer Level:`, value: `${officerLevel}`, inline: true }, 
                    )
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

        return interaction.update({embeds: [upgradeOfficerEmbed], components: [upgradeOfficerButtons]})
        }


        if (cost > wallet) {
            console.log(`No Money`),
            difference = cost - wallet
            upgradeOfficerEmbed
                .setColor('#ff5b05')
                .setThumbnail(guildIcon)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setDescription(`${interaction.member}, You do not have enough **War-Coins** for this upgrade.\nYou are **$${difference.toLocaleString()} War-Coins** short!\nTry withdrawing from your **War-Chest**!`)
                .addFields(
                    { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
                    { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                    { name: `Officer Level:`, value: `${officerLevel}`, inline: true }, 
                    { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
                )
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});
        return interaction.update({embeds: [upgradeOfficerEmbed], components: [upgradeOfficerButtons]})	
        }
        const newWallet = wallet - cost
        const newOfficer = officerLevel + 1
        upgradeOfficerEmbed
            .setColor('#ff5b05')
            .setThumbnail(guildIcon)
            .setTimestamp()
            .setDescription(`**${interaction.member}, Officer Upgrade Successful**`)
            .addFields(
                { name: `War-Coins:`, value: `$${newWallet.toLocaleString()}`, inline: true }, 
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                { name: `New Level:`, value: `${newOfficer}`, inline: true }, 
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});
    const baseUpgrade = await sql.Execute(`UPDATE levels SET war_coins = ${newWallet}, officer_level = '${newOfficer}' WHERE discord_id = '${interaction.member.id}'`)

    return interaction.update({embeds: [upgradeOfficerEmbed], components: [upgradeOfficerButtons]})	

}}