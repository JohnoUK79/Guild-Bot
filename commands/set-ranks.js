const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)

        .setName("set-ranks")
        .setDescription("Setup the Rank Roles for Levels")

        .addStringOption((option) => option
            .setName("rank10")
            .setDescription("Set the Role for Rank 10 / Private!")
            .setRequired(true)
        )
        
        .addStringOption((option) => option
            .setName("rank20")
            .setDescription("Set the Role for Rank 20 / Corporal!")
            .setRequired(false)
        )
                
        .addStringOption((option) => option
            .setName("rank30")
            .setDescription("Set the Role for Rank 30 / Sergeant!")
            .setRequired(false)
        )
                        
        .addStringOption((option) => option
            .setName("rank40")
            .setDescription("Set the Role for Rank 40 / Lieutenant!")
            .setRequired(false)
        )
                        
        .addStringOption((option) => option
            .setName("rank50")
            .setDescription("Set the Role for Rank 50 / Captain!")
            .setRequired(false)
        )
                        
        .addStringOption((option) => option
            .setName("rank60")
            .setDescription("Set the Role for Rank 60 / Major!")
            .setRequired(false)
        )
                        
        .addStringOption((option) => option
            .setName("rank70")
            .setDescription("Set the Role for Rank 70 / Colonel!")
            .setRequired(false)
        )
                        
        .addStringOption((option) => option
            .setName("rank80")
            .setDescription("Set the Role for Rank 80 / Major General!")
            .setRequired(false)
        )
                        
        .addStringOption((option) => option
            .setName("rank90")
            .setDescription("Set the Role for Rank 90 / General!")
            .setRequired(false)
        )
                        
        .addStringOption((option) => option
            .setName("rank100")
            .setDescription("Set the Role for Rank 100 / General of The Army!")
            .setRequired(false)
        )
                                
        .addStringOption((option) => option
            .setName("rank250")
            .setDescription("Set the Role for Rank 250 / Chief of Staff!")
            .setRequired(false)
        )
                                
        .addStringOption((option) => option
            .setName("rank500")
            .setDescription("Set the Role for Rank 500 / President!")
            .setRequired(false)
        )
                                
        .addStringOption((option) => option
            .setName("rank1000")
            .setDescription("Set the Role for Rank 1000 / God!")
            .setRequired(false)
        ),

    async execute(interaction) {
        guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
        var guildId = interaction.guildId
        var level10 = interaction.options.getString('rank10');
        var level20 = interaction.options.getString('rank20');
        var level30 = interaction.options.getString('rank30');
        var level40 = interaction.options.getString('rank40');
        var level50 = interaction.options.getString('rank50');
        var level60 = interaction.options.getString('rank60');
        var level70 = interaction.options.getString('rank70');
        var level80 = interaction.options.getString('rank80');
        var level90 = interaction.options.getString('rank90');
        var level100 = interaction.options.getString('rank100');
        var level250 = interaction.options.getString('rank250');
        var level500 = interaction.options.getString('rank500');
        var level1000 = interaction.options.getString('rank1000');

        const addRanks = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${guildName} - Set Ranks`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(interaction.user.displayAvatarURL())
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setDescription(`**Levels Rank Roles Added!**`)
            .setThumbnail('http://phfamily.co.uk/img/gifs/Poll.gif')
            .addFields(
                { name: `Rank 10`, value: `${level10}` },
                { name: `Rank 20`, value: `${level20}` },
                { name: `Rank 30`, value: `${level30}` },
                { name: `Rank 40`, value: `${level40}` },
                { name: `Rank 50`, value: `${level50}` },
                { name: `Rank 60`, value: `${level60}` },
                { name: `Rank 70`, value: `${level70}` },
                { name: `Rank 80`, value: `${level80}` },
                { name: `Rank 90`, value: `${level90}` },
                { name: `Rank 100`, value: `${level100}` },
                { name: `Rank 250`, value: `${level250}` },
                { name: `Rank 500`, value: `${level500}` },
                { name: `Rank 1000`, value: `${level1000}` },
            )
            //.setImage(guildName)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Rank Roles.`, iconURL: `${guildIcon}` });
            await interaction.reply({

            ephemeral: true,
            embeds: [addRanks],
        });
        
        let r10 = level10.replace(/\D+/g, '');
        let r20 = level20.replace(/\D+/g, '');
        let r30 = level30.replace(/\D+/g, '');
        let r40 = level40.replace(/\D+/g, '');
        let r50 = level50.replace(/\D+/g, '');
        let r60 = level60.replace(/\D+/g, '');
        let r70 = level70.replace(/\D+/g, '');
        let r80 = level80.replace(/\D+/g, '');
        let r90 = level90.replace(/\D+/g, '');
        let r100 = level100.replace(/\D+/g, '');
        let r250 = level100.replace(/\D+/g, '');
        let r500 = level100.replace(/\D+/g, '');
        let r1000 = level100.replace(/\D+/g, '');


        updateRanks = await sql.Execute(`INSERT INTO settings (guild_id, Rank_10, Rank_20, Rank_30, Rank_40, Rank_50, Rank_60, Rank_70, Rank_80, Rank_90, Rank_100, Rank_250, Rank_500, Rank_1000) 
        VALUES ('${guildId}', '${r10}', '${r20}', '${r30}', '${r40}', '${r50}', '${r60}', '${r70}', '${r80}', '${r90}', '${r100}', '${r250}', '${r500}', '${r1000}') 
        ON DUPLICATE KEY UPDATE Rank_10 = '${r10}', Rank_20 = '${r20}', Rank_30 = '${r30}', Rank_40 = '${r40}', Rank_50 = '${r50}', Rank_60 = '${r60}', Rank_70 = '${r70}', Rank_80 = '${r80}', Rank_90 = '${r90}', Rank_100 = '${r100}', Rank_250 = '${r250}', Rank_500 = '${r500}', Rank_1000 = ${r1000}, last_updated = '${setDate}';`)
        console.log(updateRanks)
    },
};
