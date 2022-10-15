const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Client, ModalSubmitFieldsResolver, MessageActionRow, MessageButton, Message } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Get help with using the server Guild Bot"),


    async execute(Interaction) {
        guildIcon = Interaction.member.guild.iconURL();
		guildName = Interaction.member.guild.name
        guildId = Interaction.guildId

        const helpEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${guildName} - Help Menu`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(Interaction.user.displayAvatarURL())
            .setAuthor({ name: Interaction.member.displayName, iconURL: Interaction.user.displayAvatarURL({ dynamic: true }), url: '' })
            .setDescription(`**${guildName} - Bot Help!**`)
            .setThumbnail(`${guildIcon}`)
            .addFields(
                { name: `**Welcome Role & Message**`, value: `The bot has the option to assign a Welcome Role & Messages to users upon entry of your server.\nAdministrators can set this up using the **/welcome** command.` },
                { name: `Levels`, value: `Active members score points based on how active they are in your servers.\nThis is a fun way to keep members engaged.\nUse the **/level** command to see your progress.` },
                { name: `Leaderboard`, value: `See how your score compares with members from many S17 servers.\nUse the **/leaderboard** command to see if you made the cut!\n**Full Scoreboard** available on the link at the top of the Leaderboard!` },
                { name: `Rank System`, value: `In addition to the Levels feature, System Adminstrators can create Level Up Ranks.\nThis allows members to be recognised for their participation in your servers.\nSystem Administrators please use the **/set-ranks** command to set up for your server.` },
                { name: `Vote`, value: `Got a question you want to put to your members?\nUse the **/vote** command and sit back and tally the results.` },
                { name: `Poll`, value: `Need to engage the opinions of your members?\nPoll it using the **/poll** command.` },
                { name: `Player Database`, value: `Our Data Masters have compiled details of almost 30k player profiles and affiliations.\nUse the **/search** command to find your player ID. **Registered members can update their own Bot Profiles**` },
                { name: `Coming Soon!`, value: `Jukebox - Play your favourite songs whilst burning & building!` },
                { name: `Coming Soon!`, value: `Guild Dashboard - Officers & Leaders will be able to evaluate & score members based on activity & contribution to the alliance.` },
                { name: `Coming Soon!`, value: `Server Website!` },
            )
            .setImage(`${guildIcon}`)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Rank Roles.`, iconURL: `${guildIcon}` });
            await Interaction.reply({

            ephemeral: true,
            embeds: [helpEmbed],
        });
    },
};
