const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder, ActivityType } = require('discord.js');
const sql = require("../config/Database");
const { OWNER } = require('../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)
        .setName("cleanup")
        .setDescription("Admin Database Cleanup Tool!"),

    async execute(interaction) {
        const { client } = require('../bot')
        const owner = await interaction.client.users.fetch(OWNER);
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

        await interaction.deferReply({
            ephemeral: true,
            fetchReply: true
        });
        const options = [
            {
                type: ActivityType.Watching,
                text: 'over the Battle Empire!',
                status: 'Online'
            },
            {
                type: ActivityType.Listening,
                text: 'for Warriors in need with /battle-help',
                status: 'idle'
            },
            {
                type: ActivityType.Competing,
                text: 'with Warriors across the Globe!',
                status: 'DND'
            }
        ]
        const option = options[Math.floor(Math.random() * options.length)];
        console.log(option)
        interaction.client.user
            .setPresence({
                activities: [
                    {
                        name: option.text,
                        type: option.type        
                    },
                ],
                status: option.status
            })

        //interaction.member.setPresence({ activities: [{ name: `Battle-Bot with ${interaction.client.id} Warriors!` }], status: 'Online' })
        // for (let i = 0; i < units.length; i++) {
        //         console.log(units[i])
        //         let ID = units[i].Unit_ID
        //         let type = units[i].Unit_Type
        //         let camp = units[i].Camp
        //         const image = camp + type + '.jpg'
        //         const images = await sql.Execute(`UPDATE units SET Image = '${image}' WHERE Unit_ID = '${ID}'`)
        //         console.log(images)
        //     }
            await interaction.editReply({
            embeds: [cleanupEmbed],
        });

    },
};
