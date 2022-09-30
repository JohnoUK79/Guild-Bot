const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Client, ModalSubmitFieldsResolver, MessageActionRow, MessageButton, Message } = require('discord.js');
const sql = require("../config/Database");

module.exports = {
    userPerms:("ADMINISTRATOR"),
    data: new SlashCommandBuilder()
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

    async execute(Interaction) {
        
        var guildId = Interaction.guildId
        var message = Interaction.options.getString('message');
        var emoji = Interaction.options.getString('emoji');
        var role = Interaction.options.getString('role');
        //console.log(Interaction)
        const addRole = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`PH Family`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(Interaction.user.displayAvatarURL())
            .setAuthor({ name: Interaction.member.displayName, iconURL: Interaction.user.displayAvatarURL({ dynamic: true }), url: '' })
            .setDescription(`**Reaction Role Added!**`)
            .setThumbnail('http://phfamily.co.uk/img/gifs/Poll.gif')
            .addFields(
                { name: `Message ID`, value: `${message}` },
                { name: `Emoji`, value: `${emoji}` },
                { name: `Role`, value: `${role}` },
            )
            .setImage(`http://phfamily.co.uk/img/gifs/PH-Family-Red.jpg`)
            .setTimestamp()
            .setFooter({ text: 'PH Family - Reaction Roles.', iconURL: 'http://phfamily.co.uk/img/gifs/PH-Family-Red.jpg' });
            await Interaction.reply({

            ephemeral: true,
            embeds: [addRole],
        });
        
        let id = role.replace(/\D+/g, '');
        addRoleDB = await sql.Execute(`INSERT INTO reactions (guild_id, message_id, emoji, role_id, server_name, added_by) VALUES ('${guildId}', '${message}', '${emoji}', '${id}', '${Interaction.member.guild.name}', '${Interaction.member.nickname}');`)
        console.log(addRoleDB)
    },
};
