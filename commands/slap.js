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

	



			
	async execute(Interaction) {
	var randomGif = gifs[Math.floor(Math.random() * gifs.length)];
    guildIcon = Interaction.member.guild.iconURL();
	guildName = Interaction.member.guild.name;
	var target = Interaction.options.getUser('target');




	const slapEmbed = new EmbedBuilder()
		.setColor('#2e8f37')
		.setTitle(`**SLAP!!**`)
		.setURL('http://www.phfamily.co.uk/')
		.setThumbnail(Interaction.user.displayAvatarURL())
		.setAuthor({ name: Interaction.member.displayName, iconURL: Interaction.user.displayAvatarURL({ dynamic: true })})
		.setDescription(`<@${Interaction.member.id}> has **Slapped** ${target}`)
		.setThumbnail(randomGif)
		.setImage(randomGif)
		.setTimestamp()
		.setFooter({ text: `${guildName} - You Got Bitch Slapped!!.`, iconURL: `${guildIcon}` });
		await Interaction.reply({
		ephemeral: false,
		embeds: [slapEmbed],
	});
	},
};