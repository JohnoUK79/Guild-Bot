const sql = require("../config/Database");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    baseUpgrade: async function (interaction) {
        const guildIcon = interaction.member.guild.iconURL();
		const guildName = interaction.guild.name
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
		const wallet = Level[0].war_coins
		const bank = Level[0].war_chest
		const baseLevel = Level[0].base_level
		const cost = (baseLevel + 1) * 25000
		const upgradeBase = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("buybase")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Cancel')
                    .setStyle(ButtonStyle.Danger),
            )
            const upgradeEmbed = new EmbedBuilder();
            upgradeEmbed
                .setColor('#ff5b05')
                .setThumbnail(guildIcon)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.addFields(
					{ name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
					{ name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
					{ name: `Current Level:`, value: `${baseLevel}`, inline: true }, 
					{ name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
				)
				.setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});
	return interaction.update({embeds: [upgradeEmbed], components: [upgradeBase]})

    }
}