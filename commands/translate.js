const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()
//$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\username\Downloads[FILE_NAME].json"; node yourappstartupfile.js
module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)

        .setName("translate")
        .setDescription("Translator!")
        .addStringOption((option) => option
        .setName("text")
            .setDescription("Text to be Translated!")
            .setRequired(true)
        ),
            

    async execute(Interaction) {
        guildIcon = Interaction.member.guild.iconURL();
		guildName = Interaction.member.guild.name
        var text = Interaction.options.getString('text');

        
        /**
         * TODO(developer): Uncomment the following line before running the sample.
         */
        const projectId = 'upbeat-glow-372800';

        // Imports the Google Cloud client library
        const {Translate} = require('@google-cloud/translate').v2;

        // Instantiates a client
        const translate = new Translate({projectId});

        // The text to translate
        //const text = 'Hello, world!';

        // The target language
        const target = 'es';

        // Translates some text into Russian
        const [translation] = await translate.translate(text, target);
        console.log(`Text: ${text}`);
        console.log(`Translation: ${translation}`);
        
        const addRole = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${guildName} - Translator`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(Interaction.user.displayAvatarURL())
            .setAuthor({ name: Interaction.member.displayName, iconURL: Interaction.user.displayAvatarURL({ dynamic: true })})
            //.setDescription(`**Reaction Role Added!**`)
            .setThumbnail('http://phfamily.co.uk/img/gifs/Poll.gif')
            .addFields(
                { name: `Text:`, value: `${text}` },
                { name: `Translation: Code = ${target}`, value: `${translation}` },
            )
            .setImage(`${guildIcon}`)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Translator.`, iconURL: `${guildIcon}` });
            await Interaction.reply({
            ephemeral: true,
            embeds: [addRole],
        });
    },
};
