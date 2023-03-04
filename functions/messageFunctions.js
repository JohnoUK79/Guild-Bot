const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, AttachmentBuilder } = require('discord.js');
const sql = require("../config/Database");
const time = require('../config/timestamp')
module.exports = {
    dmReceived: async function(message) {
        const setDate = time.UTCdefault()
			if (message.content === '') {
				var embedContent = 'No Message Content'				
			} else var embedContent = message.content		

			const dmReceived = new EmbedBuilder()
			.setColor('#0099ff')
			.setTitle('Direct Message Received!')
			.setURL('http://phfamily.co.uk/')
			.setThumbnail(message.author.displayAvatarURL())
			.setAuthor({ name: `${message.author.username}#${message.author.discriminator}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
			.setDescription(`Message Received By the Bot!`)
			.addFields(
				{ name: `Content:`, value: `${embedContent}` },
				{ name: `Sent By:`, value: `<@${message.author.id}>` },
				)
			.setTimestamp()
			.setFooter({ text: 'Message Received!.', iconURL: 'http://phfamily.co.uk/img/gifs/Warpath.jpg' });

			//970409125227950110 PH Family Bot Messages
			//1033492139964895302 SE17 Bot Messages
			let dmSent = message.client.channels.cache.get("1033492139964895302")
			dmSent.send({
				embeds: [dmReceived],
			})
			dmReceived.setDescription('Your messaged will be reviewed by our BOT Team and we will come back to you if we need further information!')
			dmReceived.setFooter({ text: 'Message Sent!.', iconURL: 'http://phfamily.co.uk/img/gifs/Warpath.jpg' })
			dmReceived.setTitle('Your Message Has Been Sent!')

			await message.reply ({
				embeds: [dmReceived]
			})
			//If Attachments Sent
			const attachmentReceived = new EmbedBuilder()
				.setColor('#0099ff')
				.setTitle('Direct Message Received!')
				.setURL('http://phfamily.co.uk/')
				.setThumbnail(message.author.displayAvatarURL())
				.setAuthor({ name: `${message.author.username}#${message.author.discriminator}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
				.setDescription(`Attachment Received By the Bot!`)
				.setTimestamp()
				.setFooter({ text: 'Attachment Received!.', iconURL: 'http://phfamily.co.uk/img/gifs/Warpath.jpg' });

			let attachments = message.attachments
			for (const attachment of attachments) {
				attachment.map(a => {
					const attachmentURL = a.url
					const attachmentName = a.name
					file = new AttachmentBuilder(attachmentURL, { name: `${attachmentName}`})
					attachmentReceived.setDescription(`Your attachment: **${attachmentName}** will be reviewed by our BOT Team and we will come back to you if we need further information!`)
					attachmentReceived.setTitle(`Your Attachment Has Been Received!`)
					attachmentReceived.setImage(attachmentURL)
				})

				await message.reply({
					embeds: [attachmentReceived],
				})

				attachmentReceived.setDescription(`Attachment: ${file.name} **Received**!`)
				attachmentReceived.setTitle('Attachment Received!')
				dmSent.send({
					embeds: [attachmentReceived],
				})
			} 
        return
    },
	translate: async function (message) {
		console.log(`Translate:`)
		const args = message.content.split(' ')
		target = args[1]
		const messages = await message.channel.messages.fetch(message.reference.messageId);
		text = messages.content
		const projectId = 'upbeat-glow-372800';
		const {Translate} = require('@google-cloud/translate').v2;
		const translate = new Translate({projectId});

		const [translation] = await translate.translate(text, target);
		const translationEmbed = new EmbedBuilder()
			.setColor('	#C32148')
			.setTitle(`${guildName} - Translator`)
			.setURL('http://www.phfamily.co.uk')
			.setThumbnail(guildIcon)
			.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true })})

			.setDescription(`[**Jump to Message!**](${messages.url})`)
			.addFields(
				{ name: `Language Code: ${target}`, value: `${translation}` },
				)
			.setTimestamp()
			.setFooter({ text: `${guildName} - Translator.`, iconURL: `${guildIcon}` });
		await message.reply({ embeds: [translationEmbed] })
		message.delete({ timeout: 500 })
	},
	rankCheck: async function (message) {
		let Settings = await sql.Execute(`select * from settings where guild_id = '${message.guild.id}';`); 
		let Levels = await sql.Execute(`select * from levels where discord_id = '${message.author.id}';`); 
		let scoreLevel = Levels[0].level
		const roleRank10 = Settings[0].Rank_10
		const roleRank20 = Settings[0].Rank_20
		const roleRank30 = Settings[0].Rank_30
		const roleRank40 = Settings[0].Rank_40
		const roleRank50 = Settings[0].Rank_50
		const roleRank60 = Settings[0].Rank_60
		const roleRank70 = Settings[0].Rank_70
		const roleRank80 = Settings[0].Rank_80
		const roleRank90 = Settings[0].Rank_90
		const roleRank100 = Settings[0].Rank_100
		const roleRank250 = Settings[0].Rank_250
		const roleRank500 = Settings[0].Rank_500
		const roleRank1000 = Settings[0].Rank_1000

		if (scoreLevel > 9) {
			if (roleRank10) await message.member.roles.add(roleRank10).catch((e) => console.log(e))
		}
		if (scoreLevel > 19) {
			if (roleRank20) await message.member.roles.add(roleRank20).catch((e) => console.log(e))
		}
		if (scoreLevel > 29) {
			if (roleRank30) await message.member.roles.add(roleRank30).catch((e) => console.log(e))
		}
		if (scoreLevel > 39) {
			if (roleRank40) await message.member.roles.add(roleRank40).catch((e) => console.log(e))
		}	
		if (scoreLevel > 49) {
			if (roleRank50) await message.member.roles.add(roleRank50).catch((e) => console.log(e))
		}	
		if (scoreLevel > 59) {
			if (roleRank60) await message.member.roles.add(roleRank60).catch((e) => console.log(e))
		}	
		if (scoreLevel > 69) {
			if (roleRank70) await message.member.roles.add(roleRank70).catch((e) => console.log(e))
		} 
		if (scoreLevel > 79) {
			if (roleRank80) await message.member.roles.add(roleRank80).catch((e) => console.log(e))
		} 
		if (scoreLevel > 89) {
			if (roleRank90) await message.member.roles.add(roleRank90).catch((e) => console.log(e))
		} 
		if (scoreLevel > 99) {
			if (roleRank100) await message.member.roles.add(roleRank100).catch((e) => console.log(e))
		} 
		if (scoreLevel > 249) {
			if (roleRank250) await message.member.roles.add(roleRank100).catch((e) => console.log(e))
		} 
		if (scoreLevel > 499) {
			if (roleRank500) await message.member.roles.add(roleRank100).catch((e) => console.log(e))
		} 
		if (scoreLevel > 999) {
			if (roleRank1000) await message.member.roles.add(roleRank100).catch((e) => console.log(e))
		} 

	}
}
