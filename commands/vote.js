const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Client, ModalSubmitFieldsResolver, MessageActionRow, MessageButton, Message } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName("vote")
        .setDescription("Vote on a topic / question!")
        .addStringOption((option) => option
            .setName("title")
            .setDescription("Title of the topic / question to be polled!")
            .setRequired(true)
        )
        .addStringOption((option) => option
        .setName("description")
        .setDescription("Give a brief summary of the topic / question to be polled!")
        .setRequired(false)
        ),
    async execute(Interaction) {
        
        const voteTitle = Interaction.options.getString('title');
        var voteDescription = Interaction.options.getString('description');
        if(!voteDescription) {voteDescription = `See above!`}
        const voteEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`PH Family Vote! - ${voteTitle}`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(Interaction.user.displayAvatarURL())
            .setAuthor({ name: Interaction.member.displayName, iconURL: Interaction.user.displayAvatarURL({ dynamic: true }), url: '' })
            .setDescription(voteTitle)
            .setThumbnail('https://i.ibb.co/xXQ3mmb/7084-E1-DD-6260-4771-92-FD-03-CE9-C8-E5-F89.jpg')
            .addFields(
                { name: `Description`, value: `${voteDescription}` },
            )
            //.setImage(`${Data[0].player_image}`)
            .setTimestamp()
            .setFooter({ text: 'PH Family Vote.', iconURL: 'https://i.ibb.co/r5xScqV/78893-FB5-9973-430-D-ABA2-A81-B13-D5-DC3-B.jpg' });
        const replied = await Interaction.reply({
            //content: `Hey **${Interaction.member.displayName}**, I have found the following details for **${id}**.`,
            //components: [player],
            ephemeral: false,
            embeds: [voteEmbed],
            fetchReply: true,
        });
        await replied.react("✅")
        await replied.react("❌")
        
    },
};
