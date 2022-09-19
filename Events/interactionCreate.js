const timestamp = require('time-stamp');
const time = require('../config/timestamp')
const sql = require("../config/Database");
const { MessageEmbed, Client, ModalSubmitFieldsResolver, MessageActionRow, MessageButton, Modal, TextInputComponent, Guild } = require('discord.js');
const { ModalBuilder } = require('@discordjs/builders');
const { TextInputStyle } = require('discord-api-types/v10');


module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
		const setDate = time.default()
		GuildName = interaction.guild.name
		console.log(GuildName)
        board = await sql.Execute(`select * from levels where 1 ORDER BY points DESC;`);

        const Levels =   new MessageActionRow()
			        .addComponents(
                new MessageButton()
                    .setCustomId("Top10")
                    .setLabel('Show Top 10')
                    .setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId("Top20")
					.setLabel('Show 11 -20')
					.setStyle('SUCCESS'),
				new MessageButton()
					.setCustomId("Top30")
					.setLabel('Show 21 - 30')
					.setStyle('SUCCESS'),
				new MessageButton()
					.setCustomId("Top40")
					.setLabel('Show 31 - 40')
					.setStyle('DANGER'),
				new MessageButton()
					.setCustomId("Top50")
					.setLabel('Show 41 - 50')
					.setStyle('DANGER'),

				)

        const Top10 = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('PH Family Levels Leaderboard')
		.setURL('http://www.phfamily.co.uk/leaderboard.php')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }), url: '' })
		.setDescription(`Hey **${interaction.member.displayName}**! Here is the board you asked for.`)
		.addFields(
			{ name: `PH Family Levels Board`, value: `**Name - Level - Points**\n` },
			{ name: `Rank 1 :first_place::`, value: `${board[0].discord_username} - ${board[0].level} - ${board[0].points}` },
			{ name: `Rank 2 :second_place::`, value: `${board[1].discord_username} - ${board[1].level} - ${board[1].points}` },
			{ name: 'Rank 3 :third_place::', value: `${board[2].discord_username} - ${board[2].level} - ${board[2].points}` },
			{ name: 'Best of the Rest:', value: `**Rank - Name - Level - Points**\n\n**Rank 4:** ${board[3].discord_username} - ${board[3].level} - ${board[3].points}\n\n**Rank 5:** ${board[4].discord_username} - ${board[4].level} - ${board[4].points}\n\n**Rank 6:** ${board[5].discord_username} - ${board[5].level} - ${board[5].points}\n\n**Rank 7:** ${board[6].discord_username} - ${board[6].level} - ${board[6].points}\n\n**Rank 8:** ${board[7].discord_username} - ${board[7].level} - ${board[7].points}\n\n**Rank 9:** ${board[8].discord_username} - ${board[8].level} - ${board[8].points}\n\n**Rank 10:** ${board[9].discord_username} - ${board[9].level} - ${board[9].points}` },

			)
		//.setImage(`${Data[0].player_image}`) // to be linked to player search gif 
		.setTimestamp()
		.setFooter({ text: 'PH Family Shit Talker Leaderboard.', iconURL: 'https://i.ibb.co/r5xScqV/78893-FB5-9973-430-D-ABA2-A81-B13-D5-DC3-B.jpg' });

        const Top20 = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('PH Family Levels Leaderboard')
		.setURL('http://www.phfamily.co.uk/leaderboard.php')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }), url: '' })
		.setDescription(`Hey **${interaction.member.displayName}**! Here is the board you asked for.`)
		.addFields(
			{ name: `PH Family Levels Board`, value: `**Name - Level - Points**\n` },
			{ name: `Rank 11 :`, value: `${board[10].discord_username} - ${board[10].level} - ${board[10].points}` },
			{ name: `Rank 12 :`, value: `${board[11].discord_username} - ${board[11].level} - ${board[11].points}` },
			{ name: 'Rank 13 :', value: `${board[12].discord_username} - ${board[12].level} - ${board[12].points}` },
			{ name: 'Rank 14 :', value: `${board[13].discord_username} - ${board[13].level} - ${board[12].points}` },
			{ name: 'Rank 15 :', value: `${board[14].discord_username} - ${board[14].level} - ${board[12].points}` },
			{ name: 'Rank 16 :', value: `${board[15].discord_username} - ${board[15].level} - ${board[12].points}` },
			{ name: 'Rank 17 :', value: `${board[16].discord_username} - ${board[16].level} - ${board[12].points}` },
			{ name: 'Rank 18 :', value: `${board[17].discord_username} - ${board[17].level} - ${board[12].points}` },
			{ name: 'Rank 19 :', value: `${board[18].discord_username} - ${board[18].level} - ${board[12].points}` },
			{ name: 'Rank 20 :', value: `${board[19].discord_username} - ${board[19].level} - ${board[12].points}` },

			)
		//.setImage(`${Data[0].player_image}`) // to be linked to player search gif 
		.setTimestamp()
		.setFooter({ text: 'PH Family Shit Talker Leaderboard.', iconURL: 'https://i.ibb.co/r5xScqV/78893-FB5-9973-430-D-ABA2-A81-B13-D5-DC3-B.jpg' });


        const Top30 = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('PH Family Levels Leaderboard')
		.setURL('http://www.phfamily.co.uk/leaderboard.php')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }), url: '' })
		.setDescription(`Hey **${interaction.member.displayName}**! Here is the board you asked for.`)
		.addFields(
			{ name: `PH Family Levels Board`, value: `**Name - Level - Points**\n` },
			{ name: `Rank 21 :`, value: `${board[20].discord_username} - ${board[20].level} - ${board[20].points}` },
			{ name: `Rank 22 :`, value: `${board[21].discord_username} - ${board[21].level} - ${board[21].points}` },
			{ name: 'Rank 23 :', value: `${board[22].discord_username} - ${board[22].level} - ${board[22].points}` },
			{ name: 'Rank 24 :', value: `${board[23].discord_username} - ${board[23].level} - ${board[23].points}` },
			{ name: 'Rank 25 :', value: `${board[24].discord_username} - ${board[24].level} - ${board[24].points}` },
			{ name: 'Rank 26 :', value: `${board[25].discord_username} - ${board[25].level} - ${board[25].points}` },
			{ name: 'Rank 27 :', value: `${board[26].discord_username} - ${board[26].level} - ${board[26].points}` },
			{ name: 'Rank 28 :', value: `${board[27].discord_username} - ${board[27].level} - ${board[27].points}` },
			{ name: 'Rank 29 :', value: `${board[28].discord_username} - ${board[28].level} - ${board[28].points}` },
			{ name: 'Rank 30 :', value: `${board[29].discord_username} - ${board[29].level} - ${board[29].points}` },

			)
		//.setImage(`${Data[0].player_image}`) // to be linked to player search gif 
		.setTimestamp()
		.setFooter({ text: 'PH Family Shit Talker Leaderboard.', iconURL: 'https://i.ibb.co/r5xScqV/78893-FB5-9973-430-D-ABA2-A81-B13-D5-DC3-B.jpg' });

        const Top40 = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('PH Family Levels Leaderboard')
		.setURL('http://www.phfamily.co.uk/leaderboard.php')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }), url: '' })
		.setDescription(`Hey **${interaction.member.displayName}**! Here is the board you asked for.`)
		.addFields(
			{ name: `PH Family Levels Board`, value: `**Name - Level - Points**\n` },
			{ name: `Rank 31 :`, value: `${board[30].discord_username} - ${board[30].level} - ${board[30].points}` },
			{ name: `Rank 32 :`, value: `${board[31].discord_username} - ${board[31].level} - ${board[31].points}` },
			{ name: 'Rank 33 :', value: `${board[32].discord_username} - ${board[32].level} - ${board[32].points}` },
			{ name: 'Rank 34 :', value: `${board[33].discord_username} - ${board[33].level} - ${board[33].points}` },
			{ name: 'Rank 35 :', value: `${board[34].discord_username} - ${board[34].level} - ${board[34].points}` },
			{ name: 'Rank 36 :', value: `${board[35].discord_username} - ${board[35].level} - ${board[35].points}` },
			{ name: 'Rank 37 :', value: `${board[36].discord_username} - ${board[36].level} - ${board[36].points}` },
			{ name: 'Rank 38 :', value: `${board[37].discord_username} - ${board[37].level} - ${board[37].points}` },
			{ name: 'Rank 39 :', value: `${board[38].discord_username} - ${board[38].level} - ${board[38].points}` },
			{ name: 'Rank 40 :', value: `${board[39].discord_username} - ${board[39].level} - ${board[39].points}` },

			)
		//.setImage(`${Data[0].player_image}`) // to be linked to player search gif 
		.setTimestamp()
		.setFooter({ text: 'PH Family Shit Talker Leaderboard.', iconURL: 'https://i.ibb.co/r5xScqV/78893-FB5-9973-430-D-ABA2-A81-B13-D5-DC3-B.jpg' });


		const Top50 = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('PH Family Levels Leaderboard')
		.setURL('http://www.phfamily.co.uk/leaderboard.php')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }), url: '' })
		.setDescription(`Hey **${interaction.member.displayName}**! Here is the board you asked for.`)
		.addFields(
			{ name: `PH Family Levels Board`, value: `**Name - Level - Points**\n` },
			{ name: `Rank 41 :`, value: `${board[40].discord_username} - ${board[40].level} - ${board[40].points}` },
			{ name: `Rank 42 :`, value: `${board[41].discord_username} - ${board[41].level} - ${board[41].points}` },
			{ name: 'Rank 43 :', value: `${board[42].discord_username} - ${board[42].level} - ${board[42].points}` },
			{ name: 'Rank 44 :', value: `${board[43].discord_username} - ${board[43].level} - ${board[43].points}` },
			{ name: 'Rank 45 :', value: `${board[44].discord_username} - ${board[44].level} - ${board[44].points}` },
			{ name: 'Rank 46 :', value: `${board[45].discord_username} - ${board[45].level} - ${board[45].points}` },
			{ name: 'Rank 47 :', value: `${board[46].discord_username} - ${board[46].level} - ${board[46].points}` },
			{ name: 'Rank 48 :', value: `${board[47].discord_username} - ${board[47].level} - ${board[47].points}` },
			{ name: 'Rank 49 :', value: `${board[48].discord_username} - ${board[48].level} - ${board[48].points}` },
			{ name: 'Rank 50 :', value: `${board[49].discord_username} - ${board[49].level} - ${board[49].points}` },

			)
		//.setImage(`${Data[0].player_image}`) // to be linked to player search gif 
		.setTimestamp()
		.setFooter({ text: 'PH Family Shit Talker Leaderboard.', iconURL: 'https://i.ibb.co/r5xScqV/78893-FB5-9973-430-D-ABA2-A81-B13-D5-DC3-B.jpg' });




        console.log(`${setDate} - ${interaction.user.tag} in #${interaction.channel.name} triggered the ${interaction.commandName} command or ${interaction.customId} interaction.`);
		//Add Player ID to Bot Modal

		if (interaction.customId === 'UID') {
			const modal = new Modal()
			.setCustomId('UpdateUID')
			.setTitle('Add your in Game User ID to Bot Profile')
			
			const uidInput = new TextInputComponent()
				.setCustomId('AddUID')
				.setLabel('Please provide your Account User ID')
				.setStyle(TextInputStyle.Short);

			const usernameInput = new TextInputComponent()
				.setCustomId('AddUsername')
				.setLabel('Add your current in game name (Be Exact!).')
				.setStyle(TextInputStyle.Short);

			const allianceTagInput = new TextInputComponent()
				.setCustomId('AddTag')
				.setLabel('Add your current Alliance TAG (Be Exact!).')
				.setStyle(TextInputStyle.Short);

			const cityInput = new TextInputComponent()
				.setCustomId('AddCity')
				.setLabel('Add current in game City (Be Exact!).')
				.setStyle(TextInputStyle.Short);

			const firstActionRow = new MessageActionRow().addComponents(uidInput);
			const secondActionRow = new MessageActionRow().addComponents(usernameInput);
			const thirdActionRow = new MessageActionRow().addComponents(allianceTagInput);
			const fourthActionRow = new MessageActionRow().addComponents(cityInput);

			modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow );

			await interaction.showModal(modal);
		}

		//Modal Responses
		if (interaction.customId === 'UpdateUID') {
			const uidInput = interaction.fields.getTextInputValue('AddUID');
			const usernameInput = interaction.fields.getTextInputValue('AddUsername');
			const tagInput = interaction.fields.getTextInputValue('AddTag');
			const cityInput = interaction.fields.getTextInputValue('AddCity');
			const id = parseInt(uidInput);
        	if(isNaN(id)) return interaction.reply( {content: `**${interaction.member.displayName}**, You have entered invalid details, please input a valid User ID **${uidInput}**! Any issues, message **<@322100798651760640>**`});
			lookup = await sql.Execute(`select * from players where player_id = ${id};`);
			if (lookup.length === 0) return interaction.reply ( {content: `**${interaction.member.displayName}**, You have entered an unrecognised User ID **${id}**, please contact **<@322100798651760640>**`});
			registerCheck = await sql.Execute(`select * from levels where discord_id = ${interaction.member.id}`)
			if (registerCheck.length === 0) {
				console.log('Not Registered for Levels')
				return interaction.reply({ content: `**${interaction.member.displayName}**, You have not registered on the server yet, please say Hi! and try again!\nAny issues, message **<@322100798651760640>**`, empheral: true })
			}
			
			//Information Already on Bot
			let idLookup = lookup[0].player_id
			let nameLookup = lookup[0].last_known_name
			let tagLookup = lookup[0].last_known_tag
			let cityLookup = lookup[0].last_city
			let discordLookup = lookup[0].discord
			let registerLookup = registerCheck[0].player_id
			let levelDiscord = registerCheck[0].discord_id

			if (!registerLookup) {
				console.log('No UID Found')

				if (discordLookup.length === 0) {
					console.log("New Registration")
					let result = await sql.Execute(`INSERT INTO playerupdates (request_uid, request_name, request_discord_id, request_discord_username, request_tag, request_city) VALUES ('${uidInput}', '${usernameInput}', '${interaction.member.id}', '${interaction.member.displayName}', '${tagInput}', '${cityInput}');`)
					return interaction.reply({ content: `**${interaction.member.displayName}**, Your submission of User ID: **${uidInput}** has been received.\n\nThis Will be reviewed and updated shortly. Any issues message **<@322100798651760640>**` });
				}
 
			}

			console.log('Profile Updates')
			if (discordLookup === interaction.member.id) {
				console.log("Player Update")
				var oldInfo = (`${nameLookup} - ${tagLookup} - ${cityLookup}`)
				var newInfo = (`${usernameInput} - ${tagInput} - ${cityInput}`)
				let result = await sql.Execute(`INSERT INTO playerupdates (request_uid, request_name, request_discord_id, request_discord_username, request_tag, request_city) VALUES ('${uidInput}', '${usernameInput}', '${interaction.member.id}', '${interaction.member.displayName}', '${tagInput}', '${cityInput}') ON DUPLICATE KEY UPDATE request_name = '${usernameInput}', request_discord_id = '${interaction.member.id}', request_discord_username = '${interaction.member.displayName}', request_tag = '${tagInput}', request_city = '${cityInput}';`)
				let updatePlayers = await sql.Execute(`UPDATE players SET last_known_name = '${usernameInput}', last_known_tag = '${tagInput}', date_last_known = '${setDate}', discord ='${interaction.member.id}', discord_name = '${interaction.member.displayName}', discord_server = '${GuildName}', last_city = '${cityInput}' WHERE player_id = ${uidInput}`)
				let changeLog = await sql.Execute(`INSERT INTO changelog (player_id, discord_id, discord_name, old_info, new_info) VALUES ('${uidInput}', '${interaction.member.id}', '${interaction.member.displayName}', '${oldInfo}', '${newInfo}')`)
				return interaction.reply({ content: `**${interaction.member.displayName}**, Your **Update** of User ID: **${uidInput}** has been completed.\n\nUse the **/search** command to see your new details. Any issues message **<@322100798651760640>**` })
			} else
			if (discordLookup !== interaction.member.id) {
				console.log('Already Registered')
				return interaction.reply ( {
					empheral: true,
					content: `**<@${interaction.member.id}>**, That User ID has already been registered to **<@${discordLookup}>**. Please contact **<@322100798651760640>**`})
			} 
			else {
			let result = await sql.Execute(`INSERT INTO playerupdates (request_uid, request_name, request_discord_id, request_discord_username, request_tag, request_city) VALUES ('${uidInput}', '${usernameInput}', '${interaction.member.id}', '${interaction.member.displayName}', '${tagInput}', '${cityInput}');`)
			return interaction.reply({ content: `**${interaction.member.displayName}**, Your **Submission** of User ID: **${uidInput}** has been received.\n\nThis Will be reviewed and updated shortly. Any issues message **<@322100798651760640>**` });
			}
		}

		//Unregistered Levels Buttons

		if (interaction.customId === 'GIF') {
			await interaction.reply( { content: 'Coming Soon!', ephemeral: true } );
		}
		//Leaderboard Buttons
        if (interaction.customId === 'Top10') {
            await interaction.update( { embeds: [Top10], components: [Levels], ephemeral: false })
        }
        if (interaction.customId === 'Top20') {
            await interaction.update({ embeds: [Top20], components: [Levels], ephemeral: false })
        }
        if (interaction.customId === 'Top30') {
            await interaction.update({ embeds: [Top30], components: [Levels], ephemeral: false })
        }
		if (interaction.customId === 'Top40') {
            await interaction.update({ embeds: [Top40], components: [Levels], ephemeral: false })
        }
        if (interaction.customId === 'Top50') {
            await interaction.update({ embeds: [Top50], components: [Levels], ephemeral: false })
        }


        if (!interaction.isCommand()) return;
    try {
        const command = interaction.client.commands.get(interaction.commandName)
        await command.execute(interaction);
        
    } catch (error) {
        console.error(setDate, error);
        await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
    }

    },
};