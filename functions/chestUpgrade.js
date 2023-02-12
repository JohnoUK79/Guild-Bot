const sql = require("../config/Database");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    chestUpgrade: async function (interaction) {
        const guildIcon = interaction.member.guild.iconURL();
		const setDate = time.default()
		const guildName = interaction.guild.name
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const wallet = Level[0].war_coins
        const bank = Level[0].war_chest
        const bankLevel = Level[0].chest_level
        const cost = (bankLevel + 1) * 10000

		const upgradeChestButtons = new ActionRowBuilder()
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



            const upgradeChestEmbed = new EmbedBuilder();
            upgradeChestEmbed
                .setColor('#ff5b05')
                .setThumbnail(guildIcon)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setDescription(`**${interaction.member}, Confirm the upgrade your War-Chest**?`)
                .addFields(
                    { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
                    { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                    { name: `Current Level:`, value: `${bankLevel}`, inline: true }, 
                    { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
                )
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

    return interaction.update({embeds: [upgradeChestEmbed], components: [upgradeChestButtons]})        
    },
}