const sql = require("../config/Database");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    officerUpgrade: async function (interaction) {
        const upgradeOfficerEmbed = new EmbedBuilder();
        const guildIcon = interaction.member.guild.iconURL();
		const guildName = interaction.guild.name
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const wallet = Level[0].war_coins
        const bank = Level[0].war_chest
        const officer = Level[0].officer
        const officerLevel = Level[0].officer_level
        const cost = (officerLevel + 1) * 50000

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
            const chooseOfficerButtons = new ActionRowBuilder()
    		.addComponents(
                new ButtonBuilder()
                    .setCustomId("random")
                    .setLabel('Free')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("pick")
                    .setLabel('Pick')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Cancel')
                    .setStyle(ButtonStyle.Danger),
            )
if (!officer) {

    upgradeOfficerEmbed
        .setColor('#ff5b05')
        .setThumbnail(guildIcon)
        .setTimestamp()
        .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setDescription(`**${interaction.member}**, First you need to pick your **Officer**!\nYou can get a random selection for **FREE** or pick your **CAMP** for **$10,000 War-Coins**!`)
            .addFields(
                { name: `War-Coins:`, value: `$${wallet}`, inline: true }, 
                { name: `War-Chest:`, value: `$${bank}`, inline: true },
            )
        .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

return interaction.update({embeds: [upgradeOfficerEmbed], components: [chooseOfficerButtons]})        

} else
            upgradeOfficerEmbed
                .setColor('#ff5b05')
                .setThumbnail(guildIcon)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setDescription(`**${interaction.member}, Confirm the upgrade your Officer**?`)
                .addFields(
                    { name: `War-Coins:`, value: `$${wallet}`, inline: true }, 
                    { name: `War-Chest:`, value: `$${bank}`, inline: true },
                    { name: `Officer Level:`, value: `${officerLevel}`, inline: true }, 
                    { name: `Upgrade Cost:`, value: `$${cost}`, inline: true },
                )
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

    return interaction.update({embeds: [upgradeOfficerEmbed], components: [upgradeOfficerButtons]})        
    },
}