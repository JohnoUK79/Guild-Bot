const sql = require("../config/Database");
const { TextInputStyle, ModalBuilder, EmbedBuilder, TextInputBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
    cancel: async function (interaction) {
		const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const wallet = Level[0].war_coins
        const bank = Level[0].war_chest
        const upgradeButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("bank")
                    .setLabel('War-Chest Upgrade')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("base")
                    .setLabel('Base Upgrade')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("officer")
                    .setLabel('Officer Promotion')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("troop")
                    .setLabel('Unit Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("reset")
                    .setLabel('Reset Mini Warpath Profile!')
                    .setStyle(ButtonStyle.Danger),
                )
		const upgradeEmbed = new EmbedBuilder();
		upgradeEmbed
			.setColor('#ff5b05')
			.setThumbnail(guildIcon)
			.setTimestamp()
			.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            .setDescription(`**${interaction.member}, What would you like to upgrade**?`)
            .addFields(
                { name: `War-Coins:`, value: `$${wallet}`, inline: true }, 
                { name: `War-Chest:`, value: `$${bank}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});
        return interaction.update({embeds: [upgradeEmbed], components: [upgradeButtons]})

    }
}