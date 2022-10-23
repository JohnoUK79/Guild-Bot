const { MessageEmbed, Client, MessageAttachment, ModalSubmitFieldsResolver, MessageActionRow, MessageButton, Guild, Interaction } = require('discord.js');
const sql = require(`../config/Database`)

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState) {
        settings = await sql.Execute(`SELECT * FROM settings where guild_id = '${oldState.guild.id}'`)
        let guildLogo = settings[0].guild_icon
        var sendChannel = newState.channelId
        if(!sendChannel) {var sendChannel = oldState.channelId}

        let oldVoiceChannel = await oldState.guild.channels.cache.get(oldState.channelId)
        let newVoiceChannel = await oldState.guild.channels.cache.get(newState.channelId)
        let member = await oldState.guild.members.cache.get(oldState.id)

        const voiceJoinEmbed = new MessageEmbed()
        .setColor('DARK_ORANGE')
        .setTitle(`Joined Voice Chat.`)
        .setURL('http://www.phfamily.co.uk/')
        .setThumbnail(guildLogo)
        .setAuthor(member.nickname)
        .setDescription(`Member Joined!`)
        .addFields(
            { name: `Member:`, value: `${member}`, inline: true },
            { name: `Voice Channel:`, value: `${newVoiceChannel}`, inline: true },
            { name: `Session ID:`, value: `${newState.sessionId}`, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: `Voice Chat Joined.`, iconURL: `${guildLogo}` });
		
		const voiceLeaveEmbed = new MessageEmbed()
        .setColor('DARK_ORANGE')
        .setTitle(`Left Voice Chat.`)
        .setURL('http://www.phfamily.co.uk/')
        .setThumbnail(guildLogo)
        .setAuthor(member.nickname)
        .setDescription(`Member Left!`)
        .addFields(
            { name: `Member:`, value: `${member}`, inline: true },
            { name: `Voice Channel:`, value: `${oldVoiceChannel}`, inline: true },
            { name: `Session ID:`, value: `${oldState.sessionId}`, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: `Voice Chat Left.`, iconURL: `${guildLogo}` });

        const voiceStateEmbed = new MessageEmbed()
        .setColor('DARK_ORANGE')
        .setTitle(`Voice Chat Status.`)
        .setURL('http://www.phfamily.co.uk/')
        .setThumbnail(guildLogo)
        .setAuthor(member.nickname)
        .setDescription(`Status Changed!`)
        .addFields(
            { name: `Member:`, value: `${member}`, inline: true },
            { name: `Voice Channel:`, value: `${oldVoiceChannel}`, inline: true },
            { name: `Deafen by Server:`, value: `${newState.serverDeaf}`, inline: true },
            { name: `Muted by Server:`, value: `${newState.serverMute}`, inline: true },
            { name: `Deafen by Self:`, value: `${newState.selfDeaf}`, inline: true },
            { name: `Mute by Self:`, value: `${newState.selfMute}`, inline: true },
            { name: `Video by Self:`, value: `${newState.selfVideo}`, inline: true },
            { name: `Streaming:`, value: `${newState.streaming}`, inline: true },
            { name: `Session ID:`, value: `${newState.sessionId}`, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: `Voice Status Update.`, iconURL: `${guildLogo}` });

        if (!oldVoiceChannel) {
            await oldState.guild.channels.cache.get(sendChannel).send({ embeds: [voiceJoinEmbed]})
            return
        }
        if (!newVoiceChannel) {
            await oldState.guild.channels.cache.get(sendChannel).send({ embeds: [voiceLeaveEmbed]})
            return
        }
 
        await oldState.guild.channels.cache.get(sendChannel).send({ embeds: [voiceStateEmbed]})
    }
};