const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder, Collection } = require('discord.js');
const sql = require("../config/Database");

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)

        .setName("cleanup")
        .setDescription("Admin Database Cleanup Tool!")
        // .addStringOption((option) => option
        //     .setName("message")
        //     .setDescription("Message to be sent!")
        //     .setRequired(true)
        // )
        ,

    async execute(interaction) {
        const { client } = require('../bot')
        const guildIcon = interaction.member.guild.iconURL();
		const guildName = interaction.member.guild.name
        
        const cleanupEmbed = new EmbedBuilder()
            .setColor('#4ec9b0')
            .setTitle(`Database Functions`)
            .setURL('http://www.phfamily.co.uk/')
            .setAuthor({ name: 'WarPath Announcement', iconURL: 'http://phfamily.co.uk/img/gifs/Warpath.png'})
            .setThumbnail('http://phfamily.co.uk/img/gifs/Influencer.gif')
            .setTimestamp()
            .setFooter({ text: `Clean Up Database.`, iconURL: `http://phfamily.co.uk/img/gifs/Influencer.gif` });

        const units = await sql.Execute(`SELECT * FROM units WHERE 1`)
        interaction.deferReply();
        for (let i = 0; i < units.length; i++) {
                console.log(units[i])
                let ID = units[i].Unit_ID
                let type = units[i].Unit_Type
                let camp = units[i].Camp
                const image = camp + type + '.jpg'
                const images = await sql.Execute(`UPDATE units SET Image = '${image}' WHERE Unit_ID = '${ID}'`)
                console.log(images)
            }
            await interaction.editReply({
            ephemeral: true,
            embeds: [cleanupEmbed],
        });

    },
};
