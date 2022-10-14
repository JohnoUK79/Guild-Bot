const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Client, ModalSubmitFieldsResolver, MessageActionRow, MessageButton, Message } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Poll Vote from a List of Options!")
        .addStringOption((option) => option
            .setName("title")
            .setDescription("Question / Scenario to be polled!")
            .setRequired(true)
        )
        .addStringOption((option) => option
        .setName("option1")
        .setDescription("First Option!")
        .setRequired(true)
        )
        .addStringOption((option) => option
        .setName("option2")
        .setDescription("Second Option!")
        .setRequired(true)
        )
        .addStringOption((option) => option
        .setName("option3")
        .setDescription("Third Option!")
        .setRequired(true)
        )
        .addStringOption((option) => option
        .setName("option4")
        .setDescription("Fourth Option!")
        .setRequired(false)
        ),
    async execute(Interaction) {
        
        const pollTitle = Interaction.options.getString('title');
        var pollOption1 = Interaction.options.getString('option1');
        var pollOption2 = Interaction.options.getString('option2');
        var pollOption3 = Interaction.options.getString('option3');
        var pollOption4 = Interaction.options.getString('option4');

        if(!pollOption4) {pollOption4 = `Option Not Selected!`}

        const pollEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`SE17 Elite - Poll!`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(Interaction.user.displayAvatarURL())
            .setAuthor({ name: Interaction.member.displayName, iconURL: Interaction.user.displayAvatarURL({ dynamic: true }), url: '' })
            .setDescription(`**${pollTitle}**`)
            .setThumbnail('http://phfamily.co.uk/img/gifs/Poll.gif')
            .addFields(
                { name: `🅰️`, value: `${pollOption1}` },
                { name: `🅱️`, value: `${pollOption2}` },
                { name: `✅`, value: `${pollOption3}` },
                { name: `❎`, value: `${pollOption4}` },

            )
            .setImage(`http://phfamily.co.uk/img/gifs/Poll.gif`)
            .setTimestamp()
            .setFooter({ text: 'SE17 Elitue - Poll!.', iconURL: 'http://phfamily.co.uk/img/gifs/SE17-Logo.jpg' });
        const replied = await Interaction.reply({

            ephemeral: false,
            embeds: [pollEmbed],
            fetchReply: true,
        });
        await replied.react("🅰️")
        await replied.react("🅱️")
        await replied.react("✅")
        await replied.react("❎")
        
    },
};
