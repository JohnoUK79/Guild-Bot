const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Client, ModalSubmitFieldsResolver, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('modal-test')
		.setDescription('Testing How A Modal Works!'),
	async execute(interaction) {

		const modalButtons =  new MessageActionRow()
				.addComponents(
		new MessageButton()
				.setCustomId('Add')
				.setLabel('Add in Game User ID to bot Database!')
				.setStyle('PRIMARY'),
		new MessageButton()
				.setCustomId('Update')
				.setLabel('Update GIF on Bot profile!')
				.setStyle('SECONDARY'),
		)

		const modalEmbed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('PH Family Rank Card')
		.setURL('http://www.phfamily.co.uk/')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }), url: '' })
		.setDescription(`Your Rank **${interaction.member.displayName}**!`)
		.addFields(
			{ name: `Name:`, value: `${interaction.member.displayName}` },
			)
		//.setImage(`${search[0].player_image}`)
		.setTimestamp()
		.setFooter({ text: `PH Family.`, iconURL: 'https://i.ibb.co/r5xScqV/78893-FB5-9973-430-D-ABA2-A81-B13-D5-DC3-B.jpg' });



		return interaction.reply({ embeds: [modalEmbed], components: [modalButtons], empheral: true });
	},
};