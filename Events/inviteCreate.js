const { MessageEmbed, Client, MessageAttachment, ModalSubmitFieldsResolver, MessageActionRow, MessageButton, Guild, Interaction } = require('discord.js');
const sql = require(`../config/Database`)

module.exports = {
    name: 'inviteCreate',
    async execute(invite) {
        settings = await sql.Execute(`SELECT * FROM settings WHERE guild_id = '${invite.guild.id}'`)
        let guildName = invite.guild.name
        let guildLogo = settings[0].guild_icon
        let channel = invite.channel.name
        let code = invite.code
        let inviterID = invite.inviter.id

        var sendChannel = settings[0].updates_channel
        if (!sendChannel) var sendChannel = settings[0].system_channel
        console.log(guildName, channel, code, sendChannel)
        const inviteEmbed = new MessageEmbed()
        .setColor('DARK_GREEN')
        .setTitle(`New Invite.`)
        .setURL('http://www.phfamily.co.uk/')
        .setThumbnail(guildLogo)
        .setAuthor({ name: invite.inviter.username })
        .setDescription(`Invite Created!`)
        .addFields(
            { name: `Channel:`, value: `${channel}`, inline: true },
            { name: `Code:`, value: `${code}`, inline: true },
            { name: `Created By:`, value: `<@${inviterID}>`, inline: true },
            { name: `Uses:`, value: `${invite.uses}`, inline: true },


        )
        .setImage(`${guildLogo}`)
        .setTimestamp()
        .setFooter({ text: `New Invite.`, iconURL: `${guildLogo}` });


        await invite.guild.channels.cache.get(sendChannel).send({ embeds: [inviteEmbed] })
        //console.log(invite)

    }
};