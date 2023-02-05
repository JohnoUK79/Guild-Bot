const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

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
    async execute(interaction) {
        guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
        const voteTitle = interaction.options.getString('title');
        var voteDescription = interaction.options.getString('description');
        if(!voteDescription) {voteDescription = `See above!`}
        const voteEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${guildName} - Vote!`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(interaction.user.displayAvatarURL())
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setDescription(`**${voteTitle}**`)
            .setThumbnail('http://phfamily.co.uk/img/gifs/Vote.gif')
            .addFields(
                { name: `Description`, value: `${voteDescription}` },
            )
            .setImage(`http://phfamily.co.uk/img/gifs/Vote.gif`)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Vote.`, iconURL: `${guildIcon}` });
        const replied = await interaction.reply({
            ephemeral: false,
            embeds: [voteEmbed],
            fetchReply: true,
        });
        await replied.react("✅")
        await replied.react("❌")
        
    },
};
