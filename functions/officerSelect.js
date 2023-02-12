const sql = require("../config/Database");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    officerSelect: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const selectOfficerEmbed = new EmbedBuilder();
        const selectOfficerButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Done')
                    .setStyle(ButtonStyle.Success),
            )
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name	
        const Officer = await sql.Execute(`SELECT Officer_Name, Officer_Camp, Skill FROM officers WHERE Officer_Type = 'GROUND'`)
        const officerSelection = Officer[Math.floor(Math.random() * Officer.length)]
        console.log(Officer)

        selectOfficerEmbed
            .setColor('#ff5b05')
            .setThumbnail(guildIcon)
            .setTimestamp()
            .setDescription(`**${interaction.member}, Officer Selection Successful**`)
            .addFields(
                { name: `Officer:`, value: `${officerSelection.Officer_Name}`, inline: true }, 
                { name: `Camp:`, value: `${officerSelection.Officer_Camp}`, inline: true },
                { name: `Skill:`, value: `${officerSelection.Skill}`, inline: true }, 
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});
    const updateOfficer = await sql.Execute(`UPDATE levels SET officer = '${officerSelection.Officer_Name}' WHERE discord_id = '${interaction.member.id}'`)

    return interaction.update({embeds: [selectOfficerEmbed], components: [selectOfficerButtons]})	

}}