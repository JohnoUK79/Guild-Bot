const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

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
    async execute(interaction) {
        guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
        const pollTitle = interaction.options.getString('title');
        var pollOption1 = interaction.options.getString('option1');
        var pollOption2 = interaction.options.getString('option2');
        var pollOption3 = interaction.options.getString('option3');
        var pollOption4 = interaction.options.getString('option4');

        if(!pollOption4) {pollOption4 = `Option Not Selected!`}

        const pollEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${guildName} - Poll!`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(interaction.user.displayAvatarURL())
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setDescription(`**${pollTitle}**`)
            .setThumbnail('http://phfamily.co.uk/img/gifs/Poll.gif')
            .addFields(
                { name: `🅰️`, value: `${pollOption1}` },
                { name: `🅱️`, value: `${pollOption2}` },
                { name: `✅`, value: `${pollOption3}` },
                { name: `❎`, value: `${pollOption4}` },

            )
            .setTimestamp()
            .setFooter({ text: `${guildName} - Poll!.`, iconURL: `${guildIcon}` });
        const replied = await interaction.reply({

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
