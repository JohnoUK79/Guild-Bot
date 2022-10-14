const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { MessageEmbed, Client, ModalSubmitFieldsResolver, MessageActionRow, MessageButton, Message } = require('discord.js');
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
        ),

    async execute(Interaction) {
        guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
        var guildId = Interaction.guildId
        var level10 = Interaction.options.getString('rank10');
        var level20 = Interaction.options.getString('rank20');
        var level30 = Interaction.options.getString('rank30');
        var level40 = Interaction.options.getString('rank40');
        var level50 = Interaction.options.getString('rank50');
        var level60 = Interaction.options.getString('rank60');
        var level70 = Interaction.options.getString('rank70');
        var level80 = Interaction.options.getString('rank80');
        var level90 = Interaction.options.getString('rank90');
        var level100 = Interaction.options.getString('rank100');

        const addRanks = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${guildName} - Set Ranks`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(Interaction.user.displayAvatarURL())
            .setAuthor({ name: Interaction.member.displayName, iconURL: Interaction.user.displayAvatarURL({ dynamic: true }), url: '' })
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
            )
            .setImage(`${guildName}`)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Rank Roles.`, iconURL: `${guildIcon}` });
            await Interaction.reply({

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


        updateRanks = await sql.Execute(`INSERT INTO settings (guild_id, Rank_10, Rank_20, Rank_30, Rank_40, Rank_50, Rank_60, Rank_70, Rank_80, Rank_90, Rank_100) VALUES ('${guildId}', '${r10}', '${r20}', '${r30}', '${r40}', '${r50}', '${r60}', '${r70}', '${r80}', '${r90}', '${r100}') ON DUPLICATE KEY UPDATE Rank_10 = '${r10}', Rank_20 = '${r20}', Rank_30 = '${r30}', Rank_40 = '${r40}', Rank_50 = '${r50}', Rank_60 = '${r60}', Rank_70 = '${r70}', Rank_80 = '${r80}', Rank_90 = '${r90}', Rank_100 = '${r100}', last_updated = '${setDate}';`)
        console.log(updateRanks)
    },
};
