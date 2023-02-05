const { PermissionFlagsBits } = require('discord-api-types/v10');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)

        .setName("update-enemy")
        .setDescription("Update Players Status on Bot!")

        .addStringOption((option) => option
            .setName("player-id")
            .setDescription("Player ID to Update Status!")
            .setRequired(true)
        )
        .addStringOption((option) => option
        .setName("player-status")
        .setDescription("Status of the Player Selected!")
        .setRequired(true)
        .setChoices(
            { name: "Set Player As Enemy!", value: "Yes" },
            { name: "Set Player As Ally!", value: "No" },
            { name: "Set Player As NAP!", value: "NAP" }
        )),
        

    async execute(interaction) {
        guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
        let playerStatus = interaction.options.getString('player-status');
		const id = parseInt(interaction.options.getString("player-id"));
        if(isNaN(id)) return interaction.reply( {content: `You have entered invalid details, please input a valid User ID!\n**${interaction.options.getString("player-id")}** is not a Valid user ID!\nAny issues message **<@322100798651760640>**`});
        Players = await sql.Execute('select * from players where player_id = '+ id +';');

        if (Players.length === 0) return interaction.reply({ content: `I could not find any player with the ID **${id}**, please check the ID and try again! Any issues messages Genesis or **<@322100798651760640>**.`, ephemeral: false });


        const updateEnemyEmbed = new EmbedBuilder()
            .setColor('#008000')
            .setTitle(`${guildName} - Status Updated`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(interaction.user.displayAvatarURL())
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setDescription(`**Player Status Updated!**`)
            .setThumbnail('http://phfamily.co.uk/img/gifs/Updates.gif')
            .addFields(
                { name: `Player ID:`, value: `${id}`, inline: true },
                { name: `Enemy Status:`, value: `${playerStatus}`, inline: true },
                { name: `Player Name:`, value: `${Players[0].last_known_name}`, inline: true },
            )
            .setImage(`${guildIcon}`)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Player Status Updated!`, iconURL: `${guildIcon}` });

            if (playerStatus === 'Yes') {updateEnemyEmbed.setColor('#FF0000')}
            if (playerStatus === 'NAP') {updateEnemyEmbed.setColor('#0000FF')}

            await interaction.reply({
            ephemeral: true,
            embeds: [updateEnemyEmbed],
        });
		let playerStatusDB = await sql.Execute (`UPDATE players SET enemy = '${playerStatus}', date_last_known = '${setDate}', last_seen_by = '${interaction.member.displayName}' WHERE player_id = '${id}'`)
    },
};
