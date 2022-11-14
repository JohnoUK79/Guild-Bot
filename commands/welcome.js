const { PermissionFlagsBits } = require('discord-api-types/v10');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)

        .setName("welcome")
        .setDescription("Set Up the **Welcome Channel** & **Welcome Role**!")

        .addStringOption((option) => option
            .setName("channel")
            .setDescription("Please select the channel you would like all **Welcome Messages** to be posted!")
            .setRequired(true)
        )
        .addStringOption((option) => option
        .setName("role")
        .setDescription("Role to be Provided with Reaction Selected!")
        .setRequired(true)
        ),

    async execute(Interaction) {
        guildIcon = Interaction.member.guild.iconURL();
		guildName = Interaction.member.guild.name
        var guildId = Interaction.guildId
        var channel = Interaction.options.getString('channel');
        var role = Interaction.options.getString('role');

        const welcomeEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${guildName} - Welcome Channel & Roles.`)
            .setURL('http://www.phfamily.co.uk/')
            .setThumbnail(Interaction.user.displayAvatarURL())
            .setAuthor({ name: Interaction.member.displayName, iconURL: Interaction.user.displayAvatarURL({ dynamic: true })})
            .setDescription(`Welcome Channel & Roles`)
            .setThumbnail('http://phfamily.co.uk/img/gifs/Poll.gif')
            .addFields(
                { name: `Channel`, value: `${channel}` },
                { name: `Role`, value: `${role}` },
            )
            .setImage(`${guildIcon}`)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Welcome Channel & Roles.`, iconURL: `${guildIcon}` });
            await Interaction.reply({
            ephemeral: true,
            embeds: [welcomeEmbed],
        });
        let roleDB = role.replace(/\D+/g, '');
        let channelDB = channel.replace(/\D+/g, '');
        console.log(roleDB, channelDB)
        welcomeDB = await sql.Execute(`UPDATE settings SET guild_name = '${guildName}', welcome_channel_id = '${channelDB}', welcome_role_id = '${roleDB}', guild_icon = '${guildIcon}' WHERE guild_id = '${guildId}'`)
        //updatePlayers = await sql.Execute(`UPDATE players SET date_last_known = '${setDate}', discord ='${message.author.id}', discord_server = '${GuildName}' WHERE player_id = ${playerId}`)

        console.log(welcomeDB)
    },
};
