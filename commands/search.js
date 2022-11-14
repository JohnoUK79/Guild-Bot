const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const sql = require("../config/Database");
const interactionCreate = require("../Events/interactionCreate");
const { execute } = require("../events/ready");
const timestamp = require('time-stamp');

const admin =   new ActionRowBuilder()
			        .addComponents(
                new ButtonBuilder()
                    .setCustomId('city')
                    .setLabel('Update City')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
					.setCustomId('player')
					.setLabel('Update Player')
                    .setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId('enemy')
					.setLabel('Update Enemy')
                    .setStyle(ButtonStyle.Danger),
				)

const player =  new ActionRowBuilder()
                        .addComponents(
                new ButtonBuilder()
                        .setCustomId('city')
                        .setLabel('Update City')
                        .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                        .setCustomId('request')
                        .setLabel('Request Player Update')
                        .setStyle(ButtonStyle.Secondary),
                        )

const updatePlayer =  new ActionRowBuilder()
				.addComponents(
		new ButtonBuilder()
				.setCustomId('UID')
				.setLabel('Add/Update profile on the Search Bot!')
				.setStyle(ButtonStyle.Primary),
		)
    

const full = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('player')
					.setLabel('Update Player')
                    .setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId('enemy')
					.setLabel('Update Enemy')
                    .setStyle(ButtonStyle.Danger),
				new ButtonBuilder()
					.setCustomId('city')
					.setLabel('Update City')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
					.setCustomId('request')
					.setLabel('Request Player Update')
                    .setStyle(ButtonStyle.Secondary),
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

        var lastName = Data[0].last_known_name
        if (!lastName) {
            var lastName = 'Player Name Removed!'
        } 
        var lastTag = Data[0].last_known_tag
        if (!lastTag) {
            var lastTag = 'No Alliance Information!'
        } 
        var playerAffiliation = Data[0].affiliation
        if (!playerAffiliation) {
            var playerAffiliation = 'No Affiliation Details Known!'
        } 
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
        var lastSeenBy = Data[0].last_seen_by
        if (!lastSeenBy) {
            var lastSeenBy = 'No Player Reports!'
        } 
        var playerImage = Data[0].player_image
        if (!playerImage) {
            var playerImage = 'http://phfamily.co.uk/img/gifs/NotFound.jpg'
        } 

        console.log(`City: ${lastCity} History: ${playerHistory} Discord: ${playerDiscord} Last Seen: ${playerLastSeen}`)
        const playersearch = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${guildName} - Player Database`)
            .setURL('http://www.phfamily.co.uk/player.html')
            .setThumbnail(Interaction.user.displayAvatarURL())
            .setAuthor({ name: Interaction.member.displayName, iconURL: Interaction.user.displayAvatarURL({ dynamic: true })})
            .setDescription(` Player ID: ${Data[0].player_id}`)
            .setThumbnail(`${guildIcon}`)
            .addFields(
                //{ name: `Name: ${Data[0].last_known_name}`, value: `Affiliation: ${Data[0].affiliation}` },
                { name: `Name:`, value: `${lastName}`, inline: true },
                { name: `Tag:`, value: `${lastTag}`, inline: true },
                //{ name: `Affiliation:`, value: ` ${playerAffiliation}`, inline: true },
                //{ name: `Known History of Player:`, value: `${playerHistory}`, inline: true }, 
                { name: `Discord:`, value: `<@${playerDiscord}>`, inline: true }, 
                { name: `Last Known City:`, value: ` ${lastCity}`, inline: true }, 
                { name: `Date Last Seen:`, value: ` ${playerLastSeen}`, inline: true }, 
                { name: `Last Seen By:`, value: `${lastSeenBy}`, inline: true }, //needs error handling for null
            )
            .setImage(playerImage)
            .setTimestamp()
            .setFooter({ text: `${guildName} - Search Tool.`, iconURL: `${guildIcon}` });
            let enemyDB = Data[0].enemy
            if (enemyDB === 'Yes') {
                playersearch.setColor('#FF0000')
            }
            if (enemyDB === 'No') {
                playersearch.setColor('#008000')
            }
            if (enemyDB === 'NAP') {
                playersearch.setColor('#0000FF')
            }

        Interaction.reply({
            content: `Hey **${Interaction.member.displayName}**, I have found the following details for **${id}**.`,
            components: [updatePlayer],
            ephemeral: false,
            embeds: [playersearch]
        });
    },
};
