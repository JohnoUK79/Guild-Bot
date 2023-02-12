const sql = require("../config/Database");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
    cancel: async function (interaction) {
		const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const wallet = Level[0].war_coins
        const bank = Level[0].war_chest
        const upgradeButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("bank")
                    .setLabel('War-Chest')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("base")
                    .setLabel('War-Base')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("officer")
                    .setLabel('Officer')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("troop")
                    .setLabel('Unit')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("reset")
                    .setLabel('Profile')
                    .setStyle(ButtonStyle.Secondary),
                )
		const upgradeEmbed = new EmbedBuilder();
		upgradeEmbed
			.setColor('#ff5b05')
			.setThumbnail(guildIcon)
			.setTimestamp()
			.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            .setDescription(`**${interaction.member}, What would you like to upgrade**?`)
            .addFields(
                { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});
        return interaction.update({embeds: [upgradeEmbed], components: [upgradeButtons]})

    }
}