const time = require('../config/timestamp')
const sql = require("../config/Database");
const { TextInputStyle, ModalBuilder, EmbedBuilder, TextInputBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
	sleep: async function (ms) {
		return new Promise(
		  resolve => setTimeout(resolve, ms)
		);
		},
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
                    { name: `\n${guildName} - Levels Board`, value: `**Level - XP**` },
                    { name: `Rank 1 :first_place: ${board[0].discord_username}`, value: `${board[0].level} - ${board[0].points.toLocaleString()}` },
                    { name: `Rank 2 :second_place: ${board[1].discord_username}`, value: `${board[1].level} - ${board[1].points.toLocaleString()}` },
                    { name: `Rank 3 :third_place: ${board[2].discord_username}`, value: `${board[2].level} - ${board[2].points.toLocaleString()}` },
                    { name: 'Best of the Rest:', value: `**Rank - Name - Level - Points**\n**Rank 4 ${board[3].discord_username}**\n${board[3].level} - ${board[3].points.toLocaleString()}\n**Rank 5 ${board[4].discord_username}**\n${board[4].level} - ${board[4].points.toLocaleString()}\n**Rank 6 ${board[5].discord_username}**\n${board[5].level} - ${board[5].points.toLocaleString()}\n**Rank 7 ${board[6].discord_username}**\n${board[6].level} - ${board[6].points.toLocaleString()}\n**Rank 8 ${board[7].discord_username}**\n${board[7].level} - ${board[7].points.toLocaleString()}\n**Rank 9 ${board[8].discord_username}**\n${board[8].level} - ${board[8].points.toLocaleString()}\n**Rank 10 ${board[9].discord_username}**\n${board[9].level} - ${board[9].points.toLocaleString()}` },
                    )
                .setImage(`${guildIcon}`) // to be linked to player search gif 
                .setTimestamp()
                .setFooter({ text: `${guildName} - XP Leaderboard.`, iconURL: `${guildIcon}` });
                if (playerLevel > 9) {
                    Top10.setColor('#1b4332') //dark green
                }
                if (playerLevel > 19) {
                    Top10.setColor('#2e8f37') //forest green
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
				if (playerLevel > 249) {
					Top10.setColor('#ffbd00') // Deep yellow
				} 
				if (playerLevel > 499) {
					Top10.setColor('#d81159') // Deep Red
				} 
				if (playerLevel > 999) {
					Top10.setColor('#72ddf7') // Light Blue
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
			{ name: `${guildName} - XP Leaderboard`, value: `**Level - XP**\n` },
			{ name: `Rank 11 ${board[10].discord_username}`, value: `${board[10].level} - ${board[10].points.toLocaleString()}` },
			{ name: `Rank 12 ${board[11].discord_username}`, value: `${board[11].level} - ${board[11].points.toLocaleString()}` },
			{ name: `Rank 13 ${board[12].discord_username}`, value: `${board[12].level} - ${board[12].points.toLocaleString()}` },
			{ name: `Rank 14 ${board[13].discord_username}`, value: `${board[13].level} - ${board[13].points.toLocaleString()}` },
			{ name: `Rank 15 ${board[14].discord_username}`, value: `${board[14].level} - ${board[14].points.toLocaleString()}` },
			{ name: `Rank 16 ${board[15].discord_username}`, value: `${board[15].level} - ${board[15].points.toLocaleString()}` },
			{ name: `Rank 17 ${board[16].discord_username}`, value: `${board[16].level} - ${board[16].points.toLocaleString()}` },
			{ name: `Rank 18 ${board[17].discord_username}`, value: `${board[17].level} - ${board[17].points.toLocaleString()}` },
			{ name: `Rank 19 ${board[18].discord_username}`, value: `${board[18].level} - ${board[18].points.toLocaleString()}` },
			{ name: `Rank 20 ${board[19].discord_username}`, value: `${board[19].level} - ${board[19].points.toLocaleString()}` },
			)
		.setImage(`${guildIcon}`) 
		.setTimestamp()
		.setFooter({ text: `${guildName} - XP Leaderboard.`, iconURL: `${guildIcon}` });

        if (playerLevel > 9) {
			Top20.setColor('#1b4332') //dark green
        }
        if (playerLevel > 19) {
			Top20.setColor('#2e8f37') //forest green
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
		if (playerLevel > 249) {
			Top20.setColor('#ffbd00') // Deep yellow
		} 
		if (playerLevel > 499) {
			Top20.setColor('#d81159') // Deep Red
		} 
		if (playerLevel > 999) {
			Top20.setColor('#72ddf7') // Light Blue
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
			{ name: `${guildName} - XP Leaderboard`, value: `**Level - XP**\n` },
			{ name: `Rank 21 ${board[20].discord_username}`, value: `${board[20].level} - ${board[20].points.toLocaleString()}` },
			{ name: `Rank 22 ${board[21].discord_username}`, value: `${board[21].level} - ${board[21].points.toLocaleString()}` },
			{ name: `Rank 23 ${board[22].discord_username}`, value: `${board[22].level} - ${board[22].points.toLocaleString()}` },
			{ name: `Rank 24 ${board[23].discord_username}`, value: `${board[23].level} - ${board[23].points.toLocaleString()}` },
			{ name: `Rank 25 ${board[24].discord_username}`, value: `${board[24].level} - ${board[24].points.toLocaleString()}` },
			{ name: `Rank 26 ${board[25].discord_username}`, value: `${board[25].level} - ${board[25].points.toLocaleString()}` },
			{ name: `Rank 27 ${board[26].discord_username}`, value: `${board[26].level} - ${board[26].points.toLocaleString()}` },
			{ name: `Rank 28 ${board[27].discord_username}`, value: `${board[27].level} - ${board[27].points.toLocaleString()}` },
			{ name: `Rank 29 ${board[28].discord_username}`, value: `${board[28].level} - ${board[28].points.toLocaleString()}` },
			{ name: `Rank 30 ${board[29].discord_username}`, value: `${board[29].level} - ${board[29].points.toLocaleString()}` },
			)
		.setImage(`${guildIcon}`) 
		.setTimestamp()
		.setFooter({ text: `${guildName} - XP Leaderboard.`, iconURL: `${guildIcon}` });

        if (playerLevel > 9) {
			Top30.setColor('#1b4332') //dark green
        }
        if (playerLevel > 19) {
			Top30.setColor('#2e8f37') //forest green
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
		if (playerLevel > 249) {
			Top30.setColor('#ffbd00') // Deep yellow
		} 
		if (playerLevel > 499) {
			Top30.setColor('#d81159') // Deep Red
		} 
		if (playerLevel > 999) {
			Top30.setColor('#72ddf7') // Light Blue
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
			{ name: `${guildName} - XP Leaderboard`, value: `**Level - XP**\n` },
			{ name: `Rank 31 ${board[30].discord_username}`, value: `${board[30].level} - ${board[30].points.toLocaleString()}` },
			{ name: `Rank 32 ${board[31].discord_username}`, value: `${board[31].level} - ${board[31].points.toLocaleString()}` },
			{ name: `Rank 33 ${board[32].discord_username}`, value: `${board[32].level} - ${board[32].points.toLocaleString()}` },
			{ name: `Rank 34 ${board[33].discord_username}`, value: `${board[33].level} - ${board[33].points.toLocaleString()}` },
			{ name: `Rank 35 ${board[34].discord_username}`, value: `${board[34].level} - ${board[34].points.toLocaleString()}` },
			{ name: `Rank 36 ${board[35].discord_username}`, value: `${board[35].level} - ${board[35].points.toLocaleString()}` },
			{ name: `Rank 37 ${board[36].discord_username}`, value: `${board[36].level} - ${board[36].points.toLocaleString()}` },
			{ name: `Rank 38 ${board[37].discord_username}`, value: `${board[37].level} - ${board[37].points.toLocaleString()}` },
			{ name: `Rank 39 ${board[38].discord_username}`, value: `${board[38].level} - ${board[38].points.toLocaleString()}` },
			{ name: `Rank 40 ${board[39].discord_username}`, value: `${board[39].level} - ${board[39].points.toLocaleString()}` },
			)
		.setImage(`${guildIcon}`) 
		.setTimestamp()
		.setFooter({ text: `${guildName} - XP Leaderboard.`, iconURL: `${guildIcon}` });
        if (playerLevel > 9) {
			Top40.setColor('#1b4332') //dark green
        }
        if (playerLevel > 19) {
			Top40.setColor('#2e8f37') //forest green
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
		if (playerLevel > 249) {
			Top40.setColor('#ffbd00') // Deep yellow
		} 
		if (playerLevel > 499) {
			Top40.setColor('#d81159') // Deep Red
		} 
		if (playerLevel > 999) {
			Top40.setColor('#72ddf7') // Light Blue
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
			{ name: `${guildName} - XP Leaderboard`, value: `**Level - XP**\n` },
			{ name: `Rank 41 ${board[40].discord_username}`, value: `${board[40].level} - ${board[40].points.toLocaleString()}` },
			{ name: `Rank 42 ${board[41].discord_username}`, value: `${board[41].level} - ${board[41].points.toLocaleString()}` },
			{ name: `Rank 43 ${board[42].discord_username}`, value: `${board[42].level} - ${board[42].points.toLocaleString()}` },
			{ name: `Rank 44 ${board[43].discord_username}`, value: `${board[43].level} - ${board[43].points.toLocaleString()}` },
			{ name: `Rank 45 ${board[44].discord_username}`, value: `${board[44].level} - ${board[44].points.toLocaleString()}` },
			{ name: `Rank 46 ${board[45].discord_username}`, value: `${board[45].level} - ${board[45].points.toLocaleString()}` },
			{ name: `Rank 47 ${board[46].discord_username}`, value: `${board[46].level} - ${board[46].points.toLocaleString()}` },
			{ name: `Rank 48 ${board[47].discord_username}`, value: `${board[47].level} - ${board[47].points.toLocaleString()}` },
			{ name: `Rank 49 ${board[48].discord_username}`, value: `${board[48].level} - ${board[48].points.toLocaleString()}` },
			{ name: `Rank 50 ${board[49].discord_username}`, value: `${board[49].level} - ${board[49].points.toLocaleString()}` },
			)
		.setImage(`${guildIcon}`) 
		.setTimestamp()
		.setFooter({ text: `${guildName} - XP Leaderboard.`, iconURL: `${guildIcon}` });
        if (playerLevel > 9) {
			Top50.setColor('#1b4332') //dark green
        }
        if (playerLevel > 19) {
			Top50.setColor('#2e8f37') //forest green
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
		if (playerLevel > 249) {
			Top50.setColor('#ffbd00') // Deep yellow
		} 
		if (playerLevel > 499) {
			Top50.setColor('#d81159') // Deep Red
		} 
		if (playerLevel > 999) {
			Top50.setColor('#72ddf7') // Light Blue
		} 
        await interaction.update({ embeds: [Top50], components: [Levels], ephemeral: false })
}
}