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
        guildIcon = Interaction.member.guild.iconURL();
		guildName = Interaction.member.guild.name
        const voteTitle = Interaction.options.getString('title');
        var voteDescription = Interaction.options.getString('description');
        if(!voteDescription) {voteDescription = `See above!`}
        const voteEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${guildName} - Vote!`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(Interaction.user.displayAvatarURL())
            .setAuthor({ name: Interaction.member.displayName, iconURL: Interaction.user.displayAvatarURL({ dynamic: true }), url: '' })
            .setDescription(`**${voteTitle}**`)
            .setThumbnail('http://phfamily.co.uk/img/gifs/Vote.gif')
            .addFields(
                { name: `Description`, value: `${voteDescription}` },
            )
            .setImage(`http://phfamily.co.uk/img/gifs/Vote.gif`)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Vote.`, iconURL: `${guildIcon}` });
        const replied = await Interaction.reply({
            ephemeral: false,
            embeds: [voteEmbed],
            fetchReply: true,
        });
        await replied.react("✅")
        await replied.react("❌")
        
    },
};
