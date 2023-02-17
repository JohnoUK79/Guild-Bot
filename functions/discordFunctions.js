const time = require('../config/timestamp')
const sql = require("../config/Database");
const { TextInputStyle, ModalBuilder, EmbedBuilder, TextInputBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
    top10: async function(interaction) {
		const guildIcon = interaction.member.guild.iconURL();
		const setDate = time.default()
		const guildName = interaction.guild.name
        const board = await sql.Execute(`select * from levels where 1 ORDER BY points DESC;`);
		const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
		var playerLevel = Level[0].level
		if (playerLevel === null) {var playerLevel = 0}

        const Levels = new ActionRowBuilder()
			        .addComponents(
                new ButtonBuilder()
                    .setCustomId("Top10")
                    .setLabel('Show Top 10')
                    .setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId("Top20")
					.setLabel('Show 11 -20')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId("Top30")
					.setLabel('Show 21 - 30')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId("Top40")
					.setLabel('Show 31 - 40')
					.setStyle(ButtonStyle.Danger),
				new ButtonBuilder()
					.setCustomId("Top50")
					.setLabel('Show 41 - 50')
					.setStyle(ButtonStyle.Danger),
				)

            const Top10 = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`${guildName} - XP Leaderboard`)
                .setURL('http://www.phfamily.co.uk/leaderboard.php')
                .setThumbnail(interaction.member.displayAvatarURL())
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setDescription(`Hey **${interaction.member.displayName}**! Here is the board you asked for.`)
                .addFields(
                    { name: `${guildName} - XP Leaderboard`, value: `**Name - Level - XP**\n` },
                    { name: `Rank 1 :first_place::`, value: `${board[0].discord_username} - ${board[0].level} - ${board[0].points}` },
                    { name: `Rank 2 :second_place::`, value: `${board[1].discord_username} - ${board[1].level} - ${board[1].points}` },
                    { name: 'Rank 3 :third_place::', value: `${board[2].discord_username} - ${board[2].level} - ${board[2].points}` },
                    { name: 'Best of the Rest:', value: `**Rank - Name - Level - XP**\n\n**Rank 4:** ${board[3].discord_username} - ${board[3].level} - ${board[3].points}\n\n**Rank 5:** ${board[4].discord_username} - ${board[4].level} - ${board[4].points}\n\n**Rank 6:** ${board[5].discord_username} - ${board[5].level} - ${board[5].points}\n\n**Rank 7:** ${board[6].discord_username} - ${board[6].level} - ${board[6].points}\n\n**Rank 8:** ${board[7].discord_username} - ${board[7].level} - ${board[7].points}\n\n**Rank 9:** ${board[8].discord_username} - ${board[8].level} - ${board[8].points}\n\n**Rank 10:** ${board[9].discord_username} - ${board[9].level} - ${board[9].points}` },
        
                    )
                .setImage(`${guildIcon}`) // to be linked to player search gif 
                .setTimestamp()
                .setFooter({ text: `${guildName} - XP Leaderboard.`, iconURL: `${guildIcon}` });
                if (playerLevel > 9) {
                    Top10.setColor('#2e8f37') //forest green
                }
                if (playerLevel > 19) {
                    Top10.setColor('DARK_GREEN') //dark green
                }
                if (playerLevel > 29) {
                    Top10.setColor('#00ff80') //spring green
                }
                if (playerLevel > 39) {
                    Top10.setColor('#00ffff') //cyan
                }	
                if (playerLevel > 49) {
                    Top10.setColor('#0080ff') //dodger blue
                }	
                if (playerLevel > 59) {
                    Top10.setColor('#0000ff') //blue
                }	
                if (playerLevel > 69) {
                    Top10.setColor('#8000ff') //purple
                } 
                if (playerLevel > 79) {
                    Top10.setColor('#ff0080') //magenta
                } 
                if (playerLevel > 89) {
                    Top10.setColor('#ff0000') //red
                } 
                if (playerLevel > 99) {
                    Top10.setColor('#ffff00') //yellow
                } 
                await interaction.update( { embeds: [Top10], components: [Levels], ephemeral: false })                   
    },
    top20: async function(interaction) {
		const setDate = time.default()
		const guildName = interaction.guild.name
        const guildIcon = interaction.member.guild.iconURL();
        const board = await sql.Execute(`select * from levels where 1 ORDER BY points DESC;`);
		const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
		var playerLevel = Level[0].level
		if (playerLevel === null) {var playerLevel = 0}

        const Levels = new ActionRowBuilder()
			        .addComponents(
                new ButtonBuilder()
                    .setCustomId("Top10")
                    .setLabel('Show Top 10')
                    .setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId("Top20")
					.setLabel('Show 11 -20')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId("Top30")
					.setLabel('Show 21 - 30')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId("Top40")
					.setLabel('Show 31 - 40')
					.setStyle(ButtonStyle.Danger),
				new ButtonBuilder()
					.setCustomId("Top50")
					.setLabel('Show 41 - 50')
					.setStyle(ButtonStyle.Danger),
				)
        const Top20 = new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle(`${guildName} - XP Leaderboard`)
		.setURL('http://www.phfamily.co.uk/leaderboard.php')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
		.setDescription(`Hey **${interaction.member.displayName}**! Here is the board you asked for.`)
		.addFields(
			{ name: `${guildName} - XP Leaderboard`, value: `**Name - Level - XP**\n` },
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
		.setImage(`${guildIcon}`) 
		.setTimestamp()
		.setFooter({ text: `${guildName} - XP Leaderboard.`, iconURL: `${guildIcon}` });

        if (playerLevel > 9) {
            Top20.setColor('#2e8f37') //forest green
        }
        if (playerLevel > 19) {
            Top20.setColor('DARK_GREEN') //dark green
        }
        if (playerLevel > 29) {
            Top20.setColor('#00ff80') //spring green
        }
        if (playerLevel > 39) {
            Top20.setColor('#00ffff') //cyan
        }	
        if (playerLevel > 49) {
            Top20.setColor('#0080ff') //dodger blue
        }	
        if (playerLevel > 59) {
            Top20.setColor('#0000ff') //blue
        }	
        if (playerLevel > 69) {
            Top20.setColor('#8000ff') //purple
        } 
        if (playerLevel > 79) {
            Top20.setColor('#ff0080') //magenta
        } 
        if (playerLevel > 89) {
            Top20.setColor('#ff0000') //red
        } 
        if (playerLevel > 99) {
            Top20.setColor('#ffff00') //yellow
        } 
        await interaction.update({ embeds: [Top20], components: [Levels], ephemeral: false })
    },
    top30: async function(interaction) {
		const setDate = time.default()
		const guildName = interaction.guild.name
        const guildIcon = interaction.member.guild.iconURL();
        const board = await sql.Execute(`select * from levels where 1 ORDER BY points DESC;`);
		const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
		var playerLevel = Level[0].level
		if (playerLevel === null) {var playerLevel = 0}

        const Levels = new ActionRowBuilder()
			        .addComponents(
                new ButtonBuilder()
                    .setCustomId("Top10")
                    .setLabel('Show Top 10')
                    .setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId("Top20")
					.setLabel('Show 11 -20')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId("Top30")
					.setLabel('Show 21 - 30')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId("Top40")
					.setLabel('Show 31 - 40')
					.setStyle(ButtonStyle.Danger),
				new ButtonBuilder()
					.setCustomId("Top50")
					.setLabel('Show 41 - 50')
					.setStyle(ButtonStyle.Danger),
				)
        const Top30 = new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle(`${guildName} - Levels Leaderboard`)
		.setURL('http://www.phfamily.co.uk/leaderboard.php')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
		.setDescription(`Hey **${interaction.member.displayName}**! Here is the board you asked for.`)
		.addFields(
			{ name: `${guildName} - XP Leaderboard`, value: `**Name - Level - XP**\n` },
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
		.setImage(`${guildIcon}`) 
		.setTimestamp()
		.setFooter({ text: `${guildName} - XP Leaderboard.`, iconURL: `${guildIcon}` });

        if (playerLevel > 9) {
            Top30.setColor('#2e8f37') //forest green
        }
        if (playerLevel > 19) {
            Top30.setColor('DARK_GREEN') //dark green
        }
        if (playerLevel > 29) {
            Top30.setColor('#00ff80') //spring green
        }
        if (playerLevel > 39) {
            Top30.setColor('#00ffff') //cyan
        }	
        if (playerLevel > 49) {
            Top30.setColor('#0080ff') //dodger blue
        }	
        if (playerLevel > 59) {
            Top30.setColor('#0000ff') //blue
        }	
        if (playerLevel > 69) {
            Top30.setColor('#8000ff') //purple
        } 
        if (playerLevel > 79) {
            Top30.setColor('#ff0080') //magenta
        } 
        if (playerLevel > 89) {
            Top30.setColor('#ff0000') //red
        } 
        if (playerLevel > 99) {
            Top30.setColor('#ffff00') //yellow
        } 
        await interaction.update({ embeds: [Top30], components: [Levels], ephemeral: false })
    },
    top40: async function(interaction) {
		const setDate = time.default()
		const guildName = interaction.guild.name
        const guildIcon = interaction.member.guild.iconURL();
        const board = await sql.Execute(`select * from levels where 1 ORDER BY points DESC;`);
		const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
		var playerLevel = Level[0].level
		if (playerLevel === null) {var playerLevel = 0}

        const Levels = new ActionRowBuilder()
			        .addComponents(
                new ButtonBuilder()
                    .setCustomId("Top10")
                    .setLabel('Show Top 10')
                    .setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId("Top20")
					.setLabel('Show 11 -20')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId("Top30")
					.setLabel('Show 21 - 30')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId("Top40")
					.setLabel('Show 31 - 40')
					.setStyle(ButtonStyle.Danger),
				new ButtonBuilder()
					.setCustomId("Top50")
					.setLabel('Show 41 - 50')
					.setStyle(ButtonStyle.Danger),
				)
        const Top40 = new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle(`${guildName} - XP Leaderboard`)
		.setURL('http://www.phfamily.co.uk/leaderboard.php')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
		.setDescription(`Hey **${interaction.member.displayName}**! Here is the board you asked for.`)
		.addFields(
			{ name: `${guildName} - XP Leaderboard`, value: `**Name - Level - XP**\n` },
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
		.setImage(`${guildIcon}`) 
		.setTimestamp()
		.setFooter({ text: `${guildName} - XP Leaderboard.`, iconURL: `${guildIcon}` });
        if (playerLevel > 9) {
            Top40.setColor('#2e8f37') //forest green
        }
        if (playerLevel > 19) {
            Top40.setColor('DARK_GREEN') //dark green
        }
        if (playerLevel > 29) {
            Top40.setColor('#00ff80') //spring green
        }
        if (playerLevel > 39) {
            Top40.setColor('#00ffff') //cyan
        }	
        if (playerLevel > 49) {
            Top40.setColor('#0080ff') //dodger blue
        }	
        if (playerLevel > 59) {
            Top40.setColor('#0000ff') //blue
        }	
        if (playerLevel > 69) {
            Top40.setColor('#8000ff') //purple
        } 
        if (playerLevel > 79) {
            Top40.setColor('#ff0080') //magenta
        } 
        if (playerLevel > 89) {
            Top40.setColor('#ff0000') //red
        } 
        if (playerLevel > 99) {
            Top40.setColor('#ffff00') //yellow
        } 
        await interaction.update({ embeds: [Top40], components: [Levels], ephemeral: false })
    },
    top50: async function(interaction) {
		const setDate = time.default()
		const guildName = interaction.guild.name
        const guildIcon = interaction.member.guild.iconURL();
        const board = await sql.Execute(`select * from levels where 1 ORDER BY points DESC;`);
		Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
		var playerLevel = Level[0].level
		if (playerLevel === null) {var playerLevel = 0}

        const Levels = new ActionRowBuilder()
			        .addComponents(
                new ButtonBuilder()
                    .setCustomId("Top10")
                    .setLabel('Show Top 10')
                    .setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId("Top20")
					.setLabel('Show 11 -20')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId("Top30")
					.setLabel('Show 21 - 30')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId("Top40")
					.setLabel('Show 31 - 40')
					.setStyle(ButtonStyle.Danger),
				new ButtonBuilder()
					.setCustomId("Top50")
					.setLabel('Show 41 - 50')
					.setStyle(ButtonStyle.Danger),
				)
		const Top50 = new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle(`${guildName} - XP Leaderboard`)
		.setURL('http://www.phfamily.co.uk/leaderboard.php')
		.setThumbnail(interaction.member.displayAvatarURL())
		.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
		.setDescription(`Hey **${interaction.member.displayName}**! Here is the board you asked for.`)
		.addFields(
			{ name: `${guildName} - XP Leaderboard`, value: `**Name - Level - XP**\n` },
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
		.setImage(`${guildIcon}`) 
		.setTimestamp()
		.setFooter({ text: `${guildName} - XP Leaderboard.`, iconURL: `${guildIcon}` });
        if (playerLevel > 9) {
            Top50.setColor('#2e8f37') //forest green
        }
        if (playerLevel > 19) {
            Top50.setColor('DARK_GREEN') //dark green
        }
        if (playerLevel > 29) {
            Top50.setColor('#00ff80') //spring green
        }
        if (playerLevel > 39) {
            Top50.setColor('#00ffff') //cyan
        }	
        if (playerLevel > 49) {
            Top50.setColor('#0080ff') //dodger blue
        }	
        if (playerLevel > 59) {
            Top50.setColor('#0000ff') //blue
        }	
        if (playerLevel > 69) {
            Top50.setColor('#8000ff') //purple
        } 
        if (playerLevel > 79) {
            Top50.setColor('#ff0080') //magenta
        } 
        if (playerLevel > 89) {
            Top50.setColor('#ff0000') //red
        } 
        if (playerLevel > 99) {
            Top50.setColor('#ffff00') //yellow
        } 
        await interaction.update({ embeds: [Top50], components: [Levels], ephemeral: false })
}
}