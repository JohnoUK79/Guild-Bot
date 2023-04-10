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
        guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name

        // const playerOfficers = await sql.Execute(`SELECT * FROM levels WHERE officer_name NOT LIKE ''`) //level_up_channel_id = '1000526899124117535'
        // console.log(playerOfficers)

        
        const cleanupEmbed = new EmbedBuilder()
            .setColor('#4ec9b0')
            .setTitle(`Database Functions`)
            .setURL('http://www.phfamily.co.uk/')
            .setAuthor({ name: 'WarPath Announcement', iconURL: 'http://phfamily.co.uk/img/gifs/Warpath.png'})
            .setThumbnail('http://phfamily.co.uk/img/gifs/Influencer.gif')
            // .addFields(
            //     { name: `Announcement`, value: `${message}` },
            // )
            .setTimestamp()
            .setFooter({ text: `Clean Up Database.`, iconURL: `http://phfamily.co.uk/img/gifs/Influencer.gif` });
            const Officers = await sql.Execute(`SELECT * FROM officers WHERE Officer_ID NOT IN (SELECT Officer_ID FROM playerofficers WHERE Discord_ID = '${interaction.member.id}');`)
            const officerSelection = Officers[Math.floor(Math.random() * Officers.length)]
            //console.log(officerSelection)
            const currentOfficers = await sql.Execute(`SELECT * FROM playerofficers WHERE discord_id = '${interaction.member.id}'`)
            //console.log(currentOfficers.length)
            // if (currentOfficers.length < 2) {
            //     console.log(`Less Than 2`)
            // } else console.log(`2 or More`)

        const playerUnits = await sql.Execute(`SELECT * FROM playerunits WHERE unit_id NOT LIKE ''`)
        for (let i = 0; i < playerUnits.length; i++) {
                let unitID = playerUnits[i].unit_id
                let image = await sql.Execute(`SELECT * FROM units WHERE Unit_ID = '${unitID}'`)
                let emoji = image[0].Image || 'Guardian_of_the_Truth.png'
                console.log(image)
                emoji = emoji.slice(0, -4); 
                console.log(emoji)
                let update = await sql.Execute(`UPDATE playerunits SET emoji = '${emoji}' WHERE unit_id = '${unitID}'`)
                console.log(update)
            }

        //Added Officers to Main DB Completed 08/04/23
        // const playerOfficers = await sql.Execute(`SELECT * FROM levels WHERE officer_name NOT LIKE ''`)
        // for (let i = 0; i < playerOfficers.length; i++) {
        //     let discord_id = playerOfficers[i].discord_id
        //     let officer_name = playerOfficers[i].officer_name
        //     let officer_level = playerOfficers[i].officer_level
        //     let skill_level = playerOfficers[i].skill_level
        //     console.log(discord_id, officer_name)
        //     const officerDetail = await sql.Execute(`SELECT * FROM officers WHERE Officer_Name = '${officer_name}'`)
        //     console.log(officerDetail)
        //     const updateOfficers = await sql.Execute(`INSERT INTO playerofficers (Discord_ID, Officer_ID, Officer_Name, Officer_Type, Officer_Camp, Skill, Image, Officer_Level, Skill_Level) 
        //     VALUES ('${discord_id}', '${officerDetail[0].Officer_ID}', '${officer_name}', '${officerDetail[0].Officer_Type}', '${officerDetail[0].Officer_Camp}', '${officerDetail[0].Skill}', '${officerDetail[0].Image}', '${officer_level}', '${skill_level}')`)
        // }
        //Loop through announcement channels
        // for (let i = 0; i < levelUpChannelIds.length; i++) {
        //     let levelUpChannelId = levelUpChannelIds[i];
        //     try {
        //         const sendChannel = client.channels.cache.get(levelUpChannelId.level_up_channel_id)                
        //         console.log(sendChannel);
        //         sendChannel.send({ embeds: [announceEmbed] })
        //     }
        //     catch (e) {
        //         console.log(e);
        //         console.log(levelUpChannelId);
        //     }
        // }
            await interaction.reply({
            ephemeral: true,
            embeds: [cleanupEmbed],
        });

    },
};
