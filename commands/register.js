const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
const { sendEmail, emailAlert } = require('../functions/messageFunctions');
setDate = timestamp.UTCdefault()

module.exports = {
    data: new SlashCommandBuilder()
        .setName("register")
        .setDescription("Register for Battle-Bot!"),

    async execute(interaction) {
        const Levels = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const embed = new EmbedBuilder();
        embed
            .setColor('#ff5b05')
            .setThumbnail(guildIcon)
            .setDescription(`Welcome **${interaction.member.displayName}** you are now registered for **Battle-Bot**\nYou have $25,000,000 War-Coins to get you started.\nPlease use **/Battle-Bot Profile** to get started.\nMention ${interaction.member.client.user} for Help!`)
            .setTimestamp()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            .setFooter({ text: `${guildName} - Welcome to Battle-Bot`, iconURL: `${guildIcon}`});
        console.log(Levels)
        if (Levels.length === 0) {
            interaction.reply({
                embeds: [embed]
            })
            const warcoins = 250000000
            const newRegistration = await sql.Execute(`INSERT INTO levels (discord_id, war_coins) VALUES ('${interaction.member.id}', '${warcoins}');`)
            emailAlert(interaction)
        } else {
            embed   
                .setDescription(`**${interaction.member.displayName}** you are already registered for **Battle-Bot**\nPlease use **/Battle-Bot Profile** to get started.\nMention ${interaction.member.client.user} for Help!`)
            interaction.reply({
                embeds: [embed]
            })
        }
    }

};
