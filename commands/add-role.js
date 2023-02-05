const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)

        .setName("add-role")
        .setDescription("Add Reactions Roles to Selected Message!")

        .addStringOption((option) => option
            .setName("message")
            .setDescription("Message ID to Assign Reaction Role(s)!")
            .setRequired(true)
        )
        .addStringOption((option) => option
        .setName("emoji")
        .setDescription("Emoji that will apply the selected Role!")
        .setRequired(true)
        )
        .addStringOption((option) => option
        .setName("role")
        .setDescription("Role to be Provided with Reaction Selected!")
        .setRequired(true)
        ),

    async execute(interaction) {
        guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
        var channel = interaction.channel.name
        var guildId = interaction.guildId
        var message = interaction.options.getString('message');
        var emoji = interaction.options.getString('emoji');
        var role = interaction.options.getString('role');
        console.log(emoji)
        const addRole = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${guildName} - Reaction Roles`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(interaction.user.displayAvatarURL())
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setDescription(`**Reaction Role Added!**`)
            .setThumbnail('http://phfamily.co.uk/img/gifs/Poll.gif')
            .addFields(
                { name: `Message ID`, value: `${message}` },
                { name: `Emoji`, value: `${emoji}` },
                { name: `Role`, value: `${role}` },
            )
            .setImage(`${guildIcon}`)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Reaction Roles.`, iconURL: `${guildIcon}` });
            await interaction.reply({
            ephemeral: true,
            embeds: [addRole],
        });
        let id = role.replace(/\D+/g, '');
        addRoleDB = await sql.Execute(`INSERT INTO reactions (guild_id, message_id, channel_name, emoji, role_id, server_name, added_by, date_added) VALUES ('${guildId}', '${message}', '${channel}', '${emoji}', '${id}', '${interaction.member.guild.name}', '${interaction.member.nickname}', '${setDate}');`)
    },
};
