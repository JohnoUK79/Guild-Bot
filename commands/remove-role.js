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

    async execute(Interaction) {
        guildIcon = Interaction.member.guild.iconURL();
		guildName = Interaction.member.guild.name
        var guildId = Interaction.guildId
        var message = Interaction.options.getString('message');
        var emoji = Interaction.options.getString('emoji');
        var role = Interaction.options.getString('role');
        
        const removeRole = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${guildName} - Reaction Roles`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(Interaction.user.displayAvatarURL())
            .setAuthor({ name: Interaction.member.displayName, iconURL: Interaction.user.displayAvatarURL({ dynamic: true })})
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
            await Interaction.reply({

            ephemeral: true,
            embeds: [removeRole],
        });
        
        
    },
};
