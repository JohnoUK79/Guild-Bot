const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)
        .setName("remove-role")
        .setDescription("Remove Reactions Roles from Selected Message!")

        .addStringOption((option) => option
            .setName("message")
            .setDescription("Message ID to Remove Reaction Role(s)!")
            .setRequired(true)
        )
        .addStringOption((option) => option
        .setName("emoji")
        .setDescription("Emoji that was used for the selected Role!")
        .setRequired(true)
        )
        .addStringOption((option) => option
        .setName("role")
        .setDescription("Role that was Provided with Reaction Selected!")
        .setRequired(true)
        ),

    async execute(interaction) {
        guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
        var guildId = interaction.guildId
        var message = interaction.options.getString('message');
        var emoji = interaction.options.getString('emoji');
        var role = interaction.options.getString('role');
        
        const removeRole = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${guildName} - Reaction Roles`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(interaction.user.displayAvatarURL())
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setDescription(`**Reaction Role Removed!**`)
            .setThumbnail('http://phfamily.co.uk/img/gifs/Poll.gif')
            .addFields(
                { name: `Message ID`, value: `${message}` },
                { name: `Emoji`, value: `${emoji}` },
                { name: `Role`, value: `${role}` },
            )
            .setImage(guildIcon)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Reaction Roles.`, iconURL: `${guildIcon}` });
            await interaction.reply({

            ephemeral: true,
            embeds: [removeRole],
        });
        
        
    },
};
