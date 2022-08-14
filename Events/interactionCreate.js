const timestamp = require('time-stamp');
const sql = require("../config/Database");
const { MessageEmbed, Client, ModalSubmitFieldsResolver, MessageActionRow, MessageButton, Modal, TextInputComponent } = require('discord.js');
const { ModalBuilder } = require('@discordjs/builders');
const { TextInputStyle } = require('discord-api-types/v10');


module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
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
			{ name: 'Best of the Rest:', value: `**Rank - Name - Level - Points**\n\n**Rank 14:** ${board[13].discord_username} - ${board[13].level} - ${board[13].points}\n\n**Rank 15:** ${board[14].discord_username} - ${board[14].level} - ${board[14].points}\n\n**Rank 16:** ${board[15].discord_username} - ${board[15].level} - ${board[15].points}\n\n**Rank 17:** ${board[16].discord_username} - ${board[16].level} - ${board[16].points}\n\n**Rank 18:** ${board[17].discord_username} - ${board[17].level} - ${board[17].points}\n\n**Rank 19:** ${board[18].discord_username} - ${board[18].level} - ${board[18].points}\n\n**Rank 20:** ${board[19].discord_username} - ${board[19].level} - ${board[19].points}` },

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
			{ name: 'Best of the Rest:', value: `**Rank - Name - Level - Points**\n\n**Rank 24:** ${board[23].discord_username} - ${board[23].level} - ${board[23].points}\n\n**Rank 25:** ${board[24].discord_username} - ${board[24].level} - ${board[24].points}\n\n**Rank 26:** ${board[25].discord_username} - ${board[25].level} - ${board[25].points}\n\n**Rank 27:** ${board[26].discord_username} - ${board[26].level} - ${board[26].points}\n\n**Rank 28:** ${board[27].discord_username} - ${board[27].level} - ${board[27].points}\n\n**Rank 29:** ${board[28].discord_username} - ${board[28].level} - ${board[28].points}\n\n**Rank 30:** ${board[29].discord_username} - ${board[29].level} - ${board[29].points}` },

			)
		//.setImage(`${Data[0].player_image}`) // to be linked to player search gif 
		.setTimestamp()
		.setFooter({ text: 'PH Family Shit Talker Leaderboard.', iconURL: 'https://i.ibb.co/r5xScqV/78893-FB5-9973-430-D-ABA2-A81-B13-D5-DC3-B.jpg' });

        console.log((timestamp.utc('YYYY/MM/DD HH:mm:ss')), `${interaction.user.tag} in #${interaction.channel.name} triggered the ${interaction.commandName} command or ${interaction.customId} interaction.`);

		//Modal Test
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
        	if(isNaN(id)) return interaction.reply( {content: `You have entered invalid details, please input a valid User ID (${uidInput})!`});
			lookup = await sql.Execute(`select * from players where player_id = ${id};`);
			if (lookup.length === 0) return interaction.reply ( {content: `You have entered an unrecognised User ID (${id}), please contact @Admin`});
			//Information Already on Bot
			let idLookup = lookup[0].player_id
			let nameLookup = lookup[0].last_known_name
			let tagLookup = lookup[0].last_known_tag
			let cityLookup = lookup[0].last_city
			let discordLookup = lookup[0].discord
			console.log(idLookup, nameLookup, tagLookup, cityLookup, discordLookup )

			console.log(discordLookup, interaction.member.id)
			if (discordLookup === interaction.member.id) {
				console.log ('Player Already Registered')
				return interaction.reply ( {content: `That User ID has already been registered to <@${discordLookup}>. Please contact @Admin` })
			}
			await interaction.reply({ content: `Your submission of User ID: **${uidInput}** \nUsername: **${usernameInput}** Alliance Tag: **${tagInput}** \nCity: **${cityInput}** was updated successfully!\nYour previous History of \nName: **${nameLookup}** Tag: **${tagLookup}** \nCity: **${cityLookup}** have sucessfully been archived in your History!` });
		}







		//Unregistered Levels Buttons
		if (interaction.customId === 'myUID') {
			await interaction.reply( { content: 'Coming Soon!', ephemeral: true } );
		}

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

        if (!interaction.isCommand()) return;
    try {
        const command = interaction.client.commands.get(interaction.commandName)
        await command.execute(interaction);
        
    } catch (error) {
        console.error((timestamp.utc('YYYY/MM/DD HH:mm:ss')), error);
        await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
    }

    },
};