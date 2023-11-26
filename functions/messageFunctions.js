const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const sql = require("../config/Database");
const time = require('../config/timestamp')
const nodemailer = require('nodemailer');

module.exports = {
    dmReceived: async function(message) {
        const setDate = time.UTCdefault()
			if (message.content === '') {
				var embedContent = 'No Message Content'				
			} else var embedContent = message.content		

			const dmReceived = new EmbedBuilder()
			.setColor('#0099ff')
			.setTitle('Direct Message Received!')
			.setURL('http://battle-bot.com/')
			.setThumbnail(message.author.displayAvatarURL())
			.setAuthor({ name: `${message.author.username}#${message.author.discriminator}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
			.setDescription(`Message Received By the Bot!`)
			.addFields(
				{ name: `Content:`, value: `${embedContent}` },
				{ name: `Sent By:`, value: `<@${message.author.id}>` },
				)
			.setTimestamp()
			.setFooter({ text: 'Message Received!.', iconURL: 'http://battle-bot.com/img/gifs/Warpath.jpg' });

			//970409125227950110 PH Family Bot Messages
			//1033492139964895302 SE17 Bot Messages
			let dmSent = message.client.channels.cache.get("1033492139964895302")
			dmSent.send({
				embeds: [dmReceived],
			})
			dmReceived.setDescription('Your messaged will be reviewed by our BOT Team and we will come back to you if we need further information!')
			dmReceived.setFooter({ text: 'Message Sent!.', iconURL: 'http://battle-bot.com/img/gifs/Warpath.jpg' })
			dmReceived.setTitle('Your Message Has Been Sent!')

			await message.reply ({
				embeds: [dmReceived]
			})
			//If Attachments Sent
			const attachmentReceived = new EmbedBuilder()
				.setColor('#0099ff')
				.setTitle('Direct Message Received!')
				.setURL('http://battle-bot.com/')
				.setThumbnail(message.author.displayAvatarURL())
				.setAuthor({ name: `${message.author.username}#${message.author.discriminator}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
				.setDescription(`Attachment Received By the Bot!`)
				.setTimestamp()
				.setFooter({ text: 'Attachment Received!.', iconURL: 'http://battle-bot.com/img/gifs/Warpath.jpg' });

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
			.setColor('#C32148')
			.setTitle(`${guildName} - Translator`)
			.setURL('http://www.battle-bot.com')
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
	sendEmail: async function (interaction) {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			  user: 'johnouk79@gmail.com',
			  pass: 'rhtnneqghwneywwi'
			}
		  });
		  const recipient = interaction.options.getString('recipient')
		  const mailSubject = interaction.options.getString('subject')
		  const mailContent = interaction.options.getString('content')
		  const mailOptions = {
			from: 'johnouk79@gmail.com',
			to: recipient,
			subject: mailSubject,
			text: mailContent
		  };
		  
		  transporter.sendMail(mailOptions, function(error, info){
			if (error) {
			  console.log(error);
			} else {
			  console.log('Email sent: ' + info.response);
			}
		  });
		  const addRole = new EmbedBuilder()
		  .setColor('#0099ff')
		  .setTitle(`${guildName} - Bot Emails`)
		  .setURL('http://www.battle-bot.com/')
		  .setThumbnail(interaction.user.displayAvatarURL())
		  .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
		  .setDescription(`**Email Sent!**`)
		  .setThumbnail('http://battle-bot.com/Poll.gif')
		  .addFields(
			  { name: `Recipient`, value: `${recipient}` },
			  { name: `Subject`, value: `${mailSubject}` },
			  { name: `Content`, value: `${mailContent}` },
		  )
		  //.setImage(`${guildIcon}`)
		  .setTimestamp()
		  .setFooter({ text: `Battle Bot™`, iconURL: `http://battle-bot.com/img/GeneralDeath.png` });
		  await interaction.reply({
		  ephemeral: true,
		  embeds: [addRole],
	  });
	},
	emailAlert: async function (interaction) {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			  user: 'johnouk79@gmail.com',
			  pass: 'rhtnneqghwneywwi'
			}
		  });
		  const recipient = 'johnouk79@gmail.com'
		  const mailSubject = 'Bot Alert'
		  const mailContent = `${interaction.member.displayName} used ${interaction.toString()} in ${interaction.guild.name} at ${time.UTCdefault()} UTC`
		  const mailOptions = {
			from: 'johnouk79@gmail.com',
			to: recipient,
			subject: mailSubject,
			text: mailContent
		  };
		  
		  transporter.sendMail(mailOptions, function(error, info){
			if (error) {
			  console.log(error);
			} else {
			  console.log('Email sent: ' + info.response);
			}
		  });
	}
}
