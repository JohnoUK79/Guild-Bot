const { TextInputStyle, ModalBuilder, TextInputBuilder, ActionRowBuilder, EmbedBuilder} = require('discord.js');
const sql = require("../config/Database");
module.exports = {
    playerUpdateModal: async function (interaction) {
        const dashboardPlayerUpdate = new ModalBuilder()
        .setCustomId('UpdatePlayer')
        .setTitle('Update A Players Bot Profile')
        
        const dashboarduidInput = new TextInputBuilder()
            .setCustomId('AddUID')
            .setLabel('Please provide the players User ID!')
            .setStyle(TextInputStyle.Short);

        const dashboardusernameInput = new TextInputBuilder()
            .setCustomId('AddUsername')
            .setLabel('Add current in game name (Be Exact!).')
            .setStyle(TextInputStyle.Short);

        const dashboardallianceTagInput = new TextInputBuilder()
            .setCustomId('AddTag')
            .setLabel('Add current Alliance TAG (Be Exact!).')
            .setStyle(TextInputStyle.Short);

        const dashboardcityInput = new TextInputBuilder()
            .setCustomId('AddCity')
            .setLabel('Add current in game City (Be Exact!).')
            .setStyle(TextInputStyle.Short);

        const dashboardaffiliationInput = new TextInputBuilder()
            .setCustomId('Affiliation')
            .setLabel('Update/Add Affiliation notes.')
            .setStyle(TextInputStyle.Short);



        const ActionRow1 = new ActionRowBuilder().addComponents(dashboarduidInput);
        const ActionRow2 = new ActionRowBuilder().addComponents(dashboardusernameInput);
        const ActionRow3 = new ActionRowBuilder().addComponents(dashboardallianceTagInput);
        const ActionRow4 = new ActionRowBuilder().addComponents(dashboardcityInput);
        const ActionRow5 = new ActionRowBuilder().addComponents(dashboardaffiliationInput);

        dashboardPlayerUpdate.addComponents(ActionRow1, ActionRow2, ActionRow3, ActionRow4, ActionRow5 );

        await interaction.showModal(dashboardPlayerUpdate);
    },
    playerUpdateResponses: async function (interaction) {
		const guildIcon = interaction.member.guild.iconURL();
		const setDate = time.default()
		const guildName = interaction.guild.name
        const uidInput = interaction.fields.getTextInputValue('AddUID');
        const usernameInput = interaction.fields.getTextInputValue('AddUsername');
        const tagInput = interaction.fields.getTextInputValue('AddTag');
        const cityInput = interaction.fields.getTextInputValue('AddCity');
        const affiliationInput = interaction.fields.getTextInputValue('Affiliation');
        const id = parseInt(uidInput);
        if(isNaN(id)) return interaction.reply( {content: `**${interaction.member.displayName}**, You have entered invalid details.\n**${uidInput} - ${usernameInput} - ${tagInput} - ${cityInput} - ${affiliationInput}**.\nPlease input a valid User ID instead of **${uidInput}**! Any issues, message **<@322100798651760640>**`});
        lookup = await sql.Execute(`select * from players where player_id = ${id};`);
        if (lookup.length === 0) return interaction.reply ( {content: `**${interaction.member.displayName}**, You have entered an unrecognised User ID **${id}**, please contact **<@322100798651760640>**`});
        //Information Already on Bot
        const nameLookup = lookup[0].last_known_name
        const tagLookup = lookup[0].last_known_tag
        const cityLookup = lookup[0].last_city
        const discordIDLookup = lookup[0].discord
        const discordNameLookup = lookup[0].discord_name
        const affiliationLookup = lookup[0].affiliation
        const oldInfo = (`${nameLookup} - ${tagLookup} - ${affiliationLookup} - ${discordIDLookup} - ${discordNameLookup} - ${cityLookup}`)
        const newInfo = (`${usernameInput} - ${tagInput} - ${affiliationInput} - ${discordIDLookup} - ${discordNameLookup} - ${cityInput}`)
        const dashboardUpdatePlayer = await sql.Execute(`UPDATE players SET last_known_name = '${usernameInput}', last_known_tag = '${tagInput}', affiliation = '${affiliationInput}', last_city = '${cityInput}', last_seen_by = '${interaction.member.displayName}', date_last_known = '${setDate}' WHERE player_id = '${uidInput}';`)
        const changeLogUpdate = await sql.Execute(`INSERT INTO changelog (player_id, discord_id, discord_name, old_info, new_info, change_date) VALUES ('${uidInput}', '${interaction.user.id}', '${interaction.member.displayName}', '${oldInfo}', '${newInfo}', '${setDate}')`)
        console.log(dashboardUpdatePlayer, changeLogUpdate)
		const playerUpdateEmbed = new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle(`${guildName} - Player Updated`)
		.setURL('http://www.phfamily.co.uk/leaderboard.php')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
		.setDescription(`Hey **${interaction.member.displayName}**! Player Updated.`)
		.addFields(
			{ name: `User ID:`, value: `Updated` },
			//{ name: `Player Name:`, value: `${usernameInput}` },
			//{ name: 'TAG:', value: `${tagInput}` },
			//{ name: 'City:', value: `${cityInput}` },
			//{ name: 'Affiliation:', value: `${affiliationInput}` },
			)
		.setImage(`${guildIcon}`) 
		.setTimestamp()
		.setFooter({ text: `${guildName} - Player Updated.`, iconURL: `${guildIcon}` });


        interaction.reply({ 
            ephemeral: true,
            embeds: [playerUpdateEmbed],
            content: `**${interaction.member.displayName}**, Your **Update** of User ID: **${uidInput}** has been completed.\nAny issues message **<@322100798651760640>**`,
        });
    },
    selfUpdateModal: async function (interaction) {
        const playerUpdate = new ModalBuilder()
        .setCustomId('UpdateUID')
        .setTitle('Add your in Game User ID to Bot Profile')
    
    const uidInput = new TextInputBuilder()
        .setCustomId('AddUID')
        .setLabel('Please provide your Account User ID')
        .setStyle(TextInputStyle.Short);

    const usernameInput = new TextInputBuilder()
        .setCustomId('AddUsername')
        .setLabel('Add your current in game name (Be Exact!).')
        .setStyle(TextInputStyle.Short);

    const allianceTagInput = new TextInputBuilder()
        .setCustomId('AddTag')
        .setLabel('Add your current Alliance TAG (Be Exact!).')
        .setStyle(TextInputStyle.Short);

    const cityInput = new TextInputBuilder()
        .setCustomId('AddCity')
        .setLabel('Add current in game City (Be Exact!).')
        .setStyle(TextInputStyle.Short);

    const firstActionRow = new ActionRowBuilder().addComponents(uidInput);
    const secondActionRow = new ActionRowBuilder().addComponents(usernameInput);
    const thirdActionRow = new ActionRowBuilder().addComponents(allianceTagInput);
    const fourthActionRow = new ActionRowBuilder().addComponents(cityInput);

    playerUpdate.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow );

    await interaction.showModal(playerUpdate);

    },
    selfUpdateResponses: async function (interaction) {
        const uidInput = interaction.fields.getTextInputValue('AddUID');
        const usernameInput = interaction.fields.getTextInputValue('AddUsername');
        const tagInput = interaction.fields.getTextInputValue('AddTag');
        const cityInput = interaction.fields.getTextInputValue('AddCity');
        const id = parseInt(uidInput);
        if(isNaN(id)) return interaction.reply( {content: `**${interaction.member.displayName}**, You have entered invalid details.\n**${uidInput} - ${usernameInput} - ${tagInput} - ${cityInput}**.\nPlease input a valid User ID instead of **${uidInput}**! Any issues, message **<@322100798651760640>**`});
        lookup = await sql.Execute(`select * from players where player_id = ${id};`);
        if (lookup.length === 0) return interaction.reply ( {content: `**${interaction.member.displayName}**, You have entered an unrecognised User ID **${id}**, please contact **<@322100798651760640>**`});
        registerCheck = await sql.Execute(`select * from levels where discord_id = ${interaction.member.id}`)
        if (registerCheck.length === 0) {
            console.log('Not Registered for Levels')
            return interaction.reply({ 
                content: `**${interaction.member.displayName}**, You have not registered on the server yet, please say Hi! and try again!\nAny issues, message **<@322100798651760640>**`, 
                ephemeral: false,
            })
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
                let updatePlayers = await sql.Execute(`UPDATE players SET last_known_name = '${usernameInput}', last_known_tag = '${tagInput}', last_city = '${cityInput}', date_last_known = '${setDate}', discord ='${interaction.member.id}', discord_name = '${interaction.member.displayName}', discord_server = '${guildName}', last_city = '${cityInput}' WHERE player_id = ${uidInput}`)

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
            let updatePlayers = await sql.Execute(`UPDATE players SET last_known_name = '${usernameInput}', last_known_tag = '${tagInput}', last_city = '${cityInput}', date_last_known = '${setDate}', discord ='${interaction.member.id}', discord_name = '${interaction.member.displayName}', discord_server = '${guildName}', last_city = '${cityInput}' WHERE player_id = ${uidInput}`)
            let changeLog = await sql.Execute(`INSERT INTO changelog (player_id, discord_id, discord_name, old_info, new_info) VALUES ('${uidInput}', '${interaction.member.id}', '${interaction.member.displayName}', '${oldInfo}', '${newInfo}')`)
            return interaction.reply({ 
                ephemeral: true,
                content: `**${interaction.member.displayName}**, Your **Update** of User ID: **${uidInput}** has been completed.\n\nUse the **/search** command to see your new details.\nAny issues message **<@322100798651760640>**`,
            })
        } else
        if (discordLookup !== interaction.member.id) {
            console.log('Already Registered')
            return interaction.reply ( {
                content: `**<@${interaction.member.id}>**, That User ID has already been registered to **<@${discordLookup}>**. Please contact **<@322100798651760640>**`})
        } 
        else {
        let result = await sql.Execute(`INSERT INTO playerupdates (request_uid, request_name, request_discord_id, request_discord_username, request_tag, request_city) VALUES ('${uidInput}', '${usernameInput}', '${interaction.member.id}', '${interaction.member.displayName}', '${tagInput}', '${cityInput}');`)
        return interaction.reply({ 
            content: `**${interaction.member.displayName}**, Your **Submission** of User ID: **${uidInput}** has been received.\n\nThis Will be reviewed and updated shortly. Any issues message **<@322100798651760640>**`,
            ephemeral: false,
        });
        }
    }
}