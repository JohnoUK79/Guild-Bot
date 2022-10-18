const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Client, ModalSubmitFieldsResolver, MessageActionRow, MessageButton } = require('discord.js');
const sql = require("../config/Database");
const interactionCreate = require("../Events/interactionCreate");
const { execute } = require("../events/ready");
const timestamp = require('time-stamp');

const admin =   new MessageActionRow()
			        .addComponents(
                new MessageButton()
                    .setCustomId('city')
                    .setLabel('Update City')
                    .setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('player')
					.setLabel('Update Player')
					.setStyle('SUCCESS'),
				new MessageButton()
					.setCustomId('enemy')
					.setLabel('Update Enemy')
					.setStyle('DANGER'),
				)

const player =  new MessageActionRow()
                        .addComponents(
                new MessageButton()
                        .setCustomId('city')
                        .setLabel('Update City')
                        .setStyle('PRIMARY'),
                new MessageButton()
                        .setCustomId('request')
                        .setLabel('Request Player Update')
                        .setStyle('SECONDARY'),
                )

const updatePlayer =  new MessageActionRow()
				.addComponents(
		new MessageButton()
				.setCustomId('UID')
				.setLabel('Add/Update profile on the Search Bot!')
				.setStyle('PRIMARY'),
		)
    

const full = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('player')
					.setLabel('Update Player')
					.setStyle('SUCCESS'),
				new MessageButton()
					.setCustomId('enemy')
					.setLabel('Update Enemy')
					.setStyle('DANGER'),
				new MessageButton()
					.setCustomId('city')
					.setLabel('Update City')
					.setStyle('PRIMARY'),
                new MessageButton()
					.setCustomId('request')
					.setLabel('Request Player Update')
					.setStyle('SECONDARY'),
			)


module.exports = {

    data: new SlashCommandBuilder()
        .setName("search")
        .setDescription("Searches our Player Database!")
        .addStringOption((option) => option
            .setName("id")
            .setDescription("Player ID of the player to be looked up!")
            .setRequired(true)
        ),
    async execute(Interaction) {
        guildIcon = Interaction.member.guild.iconURL();
		guildName = Interaction.member.guild.name
        const id = parseInt(Interaction.options.getString("id"));
        if(isNaN(id)) return Interaction.reply( {content: `You have entered invalid details, please input a valid User ID!\n**${Interaction.options.getString("id")}** is not a Valid user ID!\nAny issues message **<@322100798651760640>**`});
        
        Data = await sql.Execute('select * from players where player_id = '+ id +';');

        if (Data.length === 0) return Interaction.reply({ content: `I could not find any player with the ID **${id}**, please check the ID and try again! Any issues messages Genesis or **<@322100798651760640>**.`, ephemeral: false });
        var lastCity = Data[0].last_city
        if (!lastCity) {
            var lastCity = 'Location Unknown'
        } 
        var playerHistory = Data[0].history
        if (!playerHistory) {
            var playerHistory = 'Limited History of Player!'
        } 
        var playerDiscord = Data[0].discord
        if (!playerDiscord) {
            var playerDiscord = 'Account Not Linked to Discord!'
        } 
        var playerLastSeen = Data[0].date_last_known
        if (!playerLastSeen) {
            var playerLastSeen = 'Last Location Unknown!'
        } 
        console.log(`City: ${lastCity} History: ${playerHistory} Discord: ${playerDiscord} Last Seen: ${playerLastSeen}`)
        const playersearch = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${guildName} - Player Database`)
            .setURL('http://www.phfamily.co.uk/player.html')
            .setThumbnail(Interaction.user.displayAvatarURL())
            .setAuthor({ name: Interaction.member.displayName, iconURL: Interaction.user.displayAvatarURL({ dynamic: true }), url: '' })
            .setDescription(` Player ID: ${Data[0].player_id}`)
            .setThumbnail(`${guildIcon}`)
            .addFields(
                //{ name: `Name: ${Data[0].last_known_name}`, value: `Affiliation: ${Data[0].affiliation}` },
                { name: `Name:`, value: `${Data[0].last_known_name}`, inline: true },
                { name: `Tag:`, value: `${Data[0].last_known_tag}`, inline: true },
                { name: `Affiliation:`, value: ` ${Data[0].affiliation}`, inline: true },
                { name: `Known History of Player:`, value: `${playerHistory}`, inline: true }, //needs error handling for null
                { name: `Discord:`, value: `<@${playerDiscord}>`, inline: true }, //needs error handling for null
                { name: `Last Known City:`, value: ` ${lastCity}`, inline: true }, //needs error handling for null
                { name: `Date Last Seen:`, value: ` ${playerLastSeen}`, inline: true }, //needs error handling for null
                //{ name: `Last Seen By:`, value: `${Data[0].last_seen_by}`, inline: true }, //needs error handling for null
            )
            .setImage(`${Data[0].player_image}`)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Search Tool.`, iconURL: `${guildIcon}` });

        Interaction.reply({
            content: `Hey **${Interaction.member.displayName}**, I have found the following details for **${id}**.`,
            components: [updatePlayer],
            ephemeral: false,
            embeds: [playersearch]
        });
    },
};
