const { PermissionFlagsBits } = require('discord-api-types/v10');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
const { Colours } = require('../data/colours');
setDate = timestamp.UTCdefault()

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)
        .setName("welcome")
        .setDescription("Set Up the **Welcome Channel**!")

        .addStringOption((option) => option
            .setName("channel")
            .setDescription("Please select the channel you would like all **Welcome Messages** to be posted!")
            .setRequired(true)
        ),

    async execute(interaction) {
        guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
        var guildId = interaction.guildId
        var channel = interaction.options.getString('channel');

        const welcomeEmbed = new EmbedBuilder()
            .setColor(Colours.LimeGreen)
            .setTitle(`${guildName} - Welcome Channel.`)
            .setURL('http://www.battle-bot.co.uk/')
            .setThumbnail(interaction.user.displayAvatarURL())
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setDescription(`Welcome Channel`)
            .setThumbnail('http://battle-bot.com/img/gifs/Poll.gif')
            .addFields(
                { name: `Channel`, value: `${channel}` },
            )
            .setImage(`${guildIcon}`)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Welcome Channel.`, iconURL: `${guildIcon}` });
            await interaction.reply({
            ephemeral: true,
            embeds: [welcomeEmbed],
        });
        let channelDB = channel.replace(/\D+/g, '');
        console.log(roleDB, channelDB)
        welcomeDB = await sql.Execute(`UPDATE settings SET guild_name = '${guildName}', guild_icon = '${guildIcon}' WHERE guild_id = '${guildId}'`)
        console.log(`Welcome Updated`)
        console.log(welcomeDB)
    },
};