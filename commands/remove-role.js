const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { MessageEmbed, Client, ModalSubmitFieldsResolver, MessageActionRow, MessageButton, Message } = require('discord.js');

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
        
        var guildId = Interaction.guildId
        var message = Interaction.options.getString('message');
        var emoji = Interaction.options.getString('emoji');
        var role = Interaction.options.getString('role');
        
        const removeRole = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`SE17 - Elite`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(Interaction.user.displayAvatarURL())
            .setAuthor({ name: Interaction.member.displayName, iconURL: Interaction.user.displayAvatarURL({ dynamic: true }), url: '' })
            .setDescription(`**Reaction Role Removed!**`)
            .setThumbnail('http://phfamily.co.uk/img/gifs/Poll.gif')
            .addFields(
                { name: `Message ID`, value: `${message}` },
                { name: `Emoji`, value: `${emoji}` },
                { name: `Role`, value: `${role}` },
            )
            .setImage(`http://phfamily.co.uk/img/gifs/SE17-Logo.jpg`)
            .setTimestamp()
            .setFooter({ text: 'PH Family - Reaction Roles.', iconURL: 'http://phfamily.co.uk/img/gifs/SE17-Logo.jpg' });
            await Interaction.reply({

            ephemeral: true,
            embeds: [removeRole],
        });
        
        
    },
};
