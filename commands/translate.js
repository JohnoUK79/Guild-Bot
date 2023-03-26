const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()
module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)

        .setName("translate")
        .setDescription("Translator!")
        .addStringOption((option) => option
        .setName("message")
            .setDescription("Message to be Translated!")
            .setRequired(true)
        )
        .addStringOption((option) => option
        .setName("code")
            .setDescription("Country Code for the Translation!")
            .setRequired(true)
        ),
            

    async execute(interaction) {
        var text = interaction.options.getString('message');
        var target = interaction.options.getString('code');

        guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name

        const projectId = 'upbeat-glow-372800';
        const {Translate} = require('@google-cloud/translate').v2;
        const translate = new Translate({projectId});

        const [translation] = await translate.translate(text, target);
        console.log(`Text: ${text}`);
        console.log(`Translation: ${translation}`);
        
        const addRole = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${guildName} - Translator`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(interaction.user.displayAvatarURL())
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            //.setDescription(`**Reaction Role Added!**`)
            .setThumbnail('http://phfamily.co.uk/img/gifs/Poll.gif')
            .addFields(
                { name: `Text:`, value: `${text}` },
                { name: `Translation: Code = ${target}`, value: `${translation}` },
            )
            .setImage(`${guildIcon}`)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Translator.`, iconURL: `${guildIcon}` });
            await interaction.reply({
            ephemeral: true,
            embeds: [addRole],
        });
    },
};
