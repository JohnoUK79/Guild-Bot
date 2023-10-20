const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const gifs = require('../data/slaps').gifs

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slap')
		.setDescription('Select a member to SLAP!.')
		.addUserOption(option => option
			.setName('target')
			.setRequired(true)
			.setDescription('The member to slap!')),
	
	async execute(interaction) {
	var randomGif = gifs[Math.floor(Math.random() * gifs.length)];
    guildIcon = interaction.member.guild.iconURL();
	guildName = interaction.member.guild.name;
	var target = interaction.options.getUser('target');

	const slapEmbed = new EmbedBuilder()
		.setColor('#2e8f37')
		.setTitle(`**SLAP!!**`)
		.setURL('http://www.phfamily.co.uk/')
		.setThumbnail(interaction.user.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
		.setDescription(`<@${interaction.member.id}> has **Slapped** ${target}`)
		.setImage(randomGif)
		.setThumbnail(target.displayAvatarURL({ dynamic: true }))
		.setTimestamp()
		.setFooter({ text: `${guildName} - You Got Bitch Slapped!!.`, iconURL: `${guildIcon}` });
		await interaction.reply({
		ephemeral: false,
		embeds: [slapEmbed],
	});
	},
};