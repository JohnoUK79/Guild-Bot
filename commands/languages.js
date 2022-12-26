const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()
//$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\username\Downloads[FILE_NAME].json"; node yourappstartupfile.js
module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)

        .setName("languages")
        .setDescription("Translator!"),

    async execute(Interaction) {
        guildIcon = Interaction.member.guild.iconURL();
		guildName = Interaction.member.guild.name
        /**
         * TODO(developer): Uncomment the following line before running the sample.
         */
        const projectId = 'upbeat-glow-372800';

        // Imports the Google Cloud client library
        const {Translate} = require('@google-cloud/translate').v2;

        // Instantiates a client
        const translate = new Translate({projectId});
            const [languages] = await translate.getLanguages();
        
            console.log("Languages:");
            languages.forEach((language) => {
                console.log(language)
            });
                
        const languagesEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${guildName} - Translator`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(Interaction.user.displayAvatarURL())
            .setAuthor({ name: Interaction.member.displayName, iconURL: Interaction.user.displayAvatarURL({ dynamic: true })})
            //.setDescription(`**Reaction Role Added!**`)
            .setThumbnail('http://phfamily.co.uk/img/gifs/Poll.gif')

            for (let i = 0; i < 25 && languages[i]; i++) languagesEmbed.addFields(
                { name: `${languages[i].name}`, value: `**Code:** ${languages[i].code} ` })

            .setImage(`${guildIcon}`)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Translator.`, iconURL: `${guildIcon}` });
            await Interaction.reply({
            ephemeral: true,
            embeds: [languagesEmbed],
        });
    },
};
