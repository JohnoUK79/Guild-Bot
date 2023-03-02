const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, AttachmentBuilder } = require('discord.js');
const sql = require("../config/Database");

module.exports = {
    levelUp: async function(message) {
        //Database Lookup
		Settings = await sql.Execute(`select * from settings where guild_id = '${message.guild.id}';`); 
		Levels = await sql.Execute(`select * from levels where discord_id = '${message.author.id}';`); 
		var score = Math.floor(Math.random() * 150) * 3;

		const updatePlayer =  new ActionRowBuilder()
				.addComponents(
		new ButtonBuilder()
				.setCustomId('UID')
				.setLabel('Add / Update your Search Profile!')
				.setStyle(ButtonStyle.Primary),
		)

		const devSupport = new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle('Buy the Dev A Beer!')
		.setURL('https://www.buymeacoffee.com/johnouk79')
		.setThumbnail(message.member.displayAvatarURL())
		.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true })})
		.setDescription(`**Enjoying the Bot? Buy the Dev a Beer**!`)
		.addFields(
			{ name: `Buy Now!:`, value: `https://www.buymeacoffee.com/johnouk79` },
			)
		.setFooter({ text: 'Buy Dekes A Beer!.', iconURL: 'http://phfamily.co.uk/img/gifs/SE17-Logo.jpg' });


		const newPlayer = new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle(`Welcome to ${guildName}`)
		.setURL('http://www.phfamily.co.uk')
		.setThumbnail(message.member.displayAvatarURL())
		.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true })})
		.setDescription(`Glad you made it, **${message.member}**!`)
		.addFields(
			{ name: `Name:`, value: `${message.member.displayName}` },
			{ name: `XP:`, value: `${score}` },
			{ name: `You will gain XP the more active you are in ${guildName}.`, value: `Stay active in our servers for regular rewards!`, inline: true },
			{ name: `You have been provided $150,000 War-Coins to use in the Battle Bot ${guildName}.`, value: `use **/warpath upgrade** for more information!`, inline: true },
			)
		.setImage(guildIcon)
		.setTimestamp()
		.setFooter({ text: `${guildName}.`, iconURL: `${guildIcon}` });

		if (Levels.length === 0) {
			console.log("First Post")
			playerImage = "http://phfamily.co.uk/img/gifs/NotFound.png"
			warcoins = 150000
			warchest = 0
			level = 0
			var score = Math.floor(Math.random() * 150) * 3;
			let result = await sql.Execute(`INSERT INTO levels (discord_id, points, level, war_coins, war_chest, discord_username, last_seen_server) VALUES ('${message.author.id}', '${score}', '${level}', '${warcoins}', '${warchest}', '${message.member.displayName}', '${guildName}');`)
			await message.reply({
				content: `Welcome to ${guildName} **${message.member.displayName}**.\nWe look forward to you becoming a valued member of our community!`,
				embeds: [newPlayer]
			});
			return;			
		}

		Lookup = Levels[0].player_id
		if (Lookup.length === 0) {Players = null} else {
		Players = await sql.Execute(`select * from players where player_id = ${Levels[0].player_id}`);}
				
		if (!Players) {
			console.log(message.author.username, 'No Player Data')
			var score = Math.floor(Math.random() * 150) * 3;
			let playerImage = "http://phfamily.co.uk/img/gifs/NotFound.png"
		} else {
			var playerImage = Players[0].player_image
			playerId = Levels[0].player_id
			updatePlayers = await sql.Execute(`UPDATE players SET date_last_known = '${setDate}', discord ='${message.author.id}', discord_name = '${message.author.username}', discord_server = '${guildName}' WHERE player_id = '${playerId}'`)
			console.log(message.author.username, updatePlayers.info)
		}

		let roleRank10 = Settings[0].Rank_10
		let roleRank20 = Settings[0].Rank_20
		let roleRank30 = Settings[0].Rank_30
		let roleRank40 = Settings[0].Rank_40
		let roleRank50 = Settings[0].Rank_50
		let roleRank60 = Settings[0].Rank_60
		let roleRank70 = Settings[0].Rank_70
		let roleRank80 = Settings[0].Rank_80
		let roleRank90 = Settings[0].Rank_90
		let roleRank100 = Settings[0].Rank_100
		let roleRank250 = Settings[0].Rank_250
		let roleRank500 = Settings[0].Rank_500
		let roleRank1000 = Settings[0].Rank_1000
		
		let scoreLevel = Levels[0].level
		let r10name = message.guild.roles.cache.find( r => r.id === roleRank10 )
		let r20name = message.guild.roles.cache.find( r => r.id === roleRank20 )
		let r30name = message.guild.roles.cache.find( r => r.id === roleRank30 )
		let r40name = message.guild.roles.cache.find( r => r.id === roleRank40 )
		let r50name = message.guild.roles.cache.find( r => r.id === roleRank50 )
		let r60name = message.guild.roles.cache.find( r => r.id === roleRank60 )
		let r70name = message.guild.roles.cache.find( r => r.id === roleRank70 )
		let r80name = message.guild.roles.cache.find( r => r.id === roleRank80 )
		let r90name = message.guild.roles.cache.find( r => r.id === roleRank90 )
		let r100name = message.guild.roles.cache.find( r => r.id === roleRank100 )
		let r250name = message.guild.roles.cache.find( r => r.id === roleRank250 )
		let r500name = message.guild.roles.cache.find( r => r.id === roleRank500 )
		let r1000name = message.guild.roles.cache.find( r => r.id === roleRank1000 )

		points = Levels[0].points
		newPoints = (points + score)
		newLevel = (Levels[0].level + 1)
		let LevelUpChannel = Settings[0].level_up_channel_id

		const levelup = new EmbedBuilder()
		.setColor('DARK_GOLD')
		.setTitle('Level Up')
		.setURL('http://www.phfamily.co.uk')
		.setThumbnail(message.member.displayAvatarURL())
		.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true })})
		.setDescription(`Congratulations **<@${message.member.id}>** you have levelled up!`)
		.addFields(
			{ name: `Name:`, value: `<@${message.member.id}>` },
			{ name: `XP:`, value: `${newPoints}` },
			{ name: 'Level', value: `${newLevel}`, inline: true },
			)
		.setImage(playerImage)
		.setTimestamp()
		.setFooter({ text: `Level Up - ${guildName}.`, iconURL: `${guildIcon}` });

		if (scoreLevel > 9) {
			var score = Math.floor(Math.random() * 200) * 2;
			levelup.setColor('#2e8f37') //forest green
			//if (roleRank10) await message.member.roles.add(roleRank10).catch((e) => console.log(e))
		}
		if (scoreLevel > 19) {
			var score = Math.floor(Math.random() * 150) * 2;
			levelup.setColor('DARK_GREEN') //dark green
			//if (roleRank20) await message.member.roles.add(roleRank20).catch((e) => console.log(e))
		}
		if (scoreLevel > 29) {
			var score = Math.floor(Math.random() * 125) * 2;
			levelup.setColor('#00ff80') //spring green
			//if (roleRank30) await message.member.roles.add(roleRank30).catch((e) => console.log(e))
		}
		if (scoreLevel > 39) {
			var score = Math.floor(Math.random() * 100) * 2;
			levelup.setColor('#00ffff') //cyan
			//if (roleRank40) await message.member.roles.add(roleRank40).catch((e) => console.log(e))
		}	
		if (scoreLevel > 49) {
			var score = Math.floor(Math.random() * 75) * 2;
			levelup.setColor('#0080ff') //dodger blue
			//if (roleRank50) await message.member.roles.add(roleRank50).catch((e) => console.log(e))
		}	
		if (scoreLevel > 59) {
			var score = Math.floor(Math.random() * 50) * 2;
			levelup.setColor('#0000ff') //blue
			//if (roleRank60) await message.member.roles.add(roleRank60).catch((e) => console.log(e))
		}	
		if (scoreLevel > 69) {
			var score = Math.floor(Math.random() * 25) + 1;
			levelup.setColor('#8000ff') //purple
			//if (roleRank70) await message.member.roles.add(roleRank70).catch((e) => console.log(e))
		} 
		if (scoreLevel > 79) {
			var score = Math.floor(Math.random() * 15) +1;
			levelup.setColor('#ff0080') //magenta
			//if (roleRank80) await message.member.roles.add(roleRank80).catch((e) => console.log(e))
		} 
		if (scoreLevel > 89) {
			var score = Math.floor(Math.random() * 10) +1;
			levelup.setColor('#ff0000') //red
			//if (roleRank90) await message.member.roles.add(roleRank90).catch((e) => console.log(e))
		} 
		if (scoreLevel > 99) {
			var score = Math.floor(Math.random() * 5) +1;
			levelup.setColor('#ffff00') //yellow
			//if (roleRank100) await message.member.roles.add(roleRank100).catch((e) => console.log(e))
		} 
		if (scoreLevel > 249) {
			var score = Math.floor(Math.random() * 4) +1;
			levelup.setColor('#ffbd00') // Deep yellow
			//if (roleRank100) await message.member.roles.add(roleRank100).catch((e) => console.log(e))
		} 
		if (scoreLevel > 499) {
			var score = Math.floor(Math.random() * 3) +1;
			levelup.setColor('#d81159') // Deep Red
			//if (roleRank100) await message.member.roles.add(roleRank100).catch((e) => console.log(e))
		} 
		if (scoreLevel > 999) {
			var score = Math.floor(Math.random() * 2) +1;
			levelup.setColor('#72ddf7') // Light Blue
			//if (roleRank100) await message.member.roles.add(roleRank100).catch((e) => console.log(e))
		} 
		let initiallevel = Levels[0].level
		level = Math.floor((score + points) / 3666 )

		if (level > initiallevel) {
			console.log("Level Up")
 			await message.guild.channels.cache.get(LevelUpChannel).send({
				embeds: [levelup],
				components: [updatePlayer],
			}) 

		if (level === 10) {
			console.log("Rank Up")
			if (!roleRank10) {
			console.log("No Role Set")
			await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **Private**`})
			await message.guild.channels.cache.get(LevelUpChannel).send({
				embeds: [devSupport],
			}) 					
			} else {
			await message.member.roles.add(roleRank10).catch((e) => console.log(e))
			await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r10name.name}**` })
			await message.guild.channels.cache.get(LevelUpChannel).send({
				embeds: [devSupport],
			})}
		} 

		if (level === 20) {
			console.log("Rank Up")
			if (!roleRank20) {
			console.log("No Role Set")
			await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **Corporal**`})
			await message.guild.channels.cache.get(LevelUpChannel).send({
				embeds: [devSupport],
			}) 						
			} else {
			await message.member.roles.add(roleRank20).catch((e) => console.log(e))
			await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r20name.name}**` })
			await message.guild.channels.cache.get(LevelUpChannel).send({
				embeds: [devSupport],
			})} 
		} 

		if (level === 30) {
		console.log("Rank Up")
		if (!roleRank30) {
		console.log("No Role Set")
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **Sergeant**`})
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		}) 
		} else {
		await message.member.roles.add(roleRank30).catch((e) => console.log(e))
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r30name.name}**` })
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		})} 
	} 

		if (level === 40) {
		console.log("Rank Up")
		if (!roleRank40) {
		console.log("No Role Set")
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **Lieutenant**`})
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		}) 
		} else {
		await message.member.roles.add(roleRank40).catch((e) => console.log(e))
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r40name.name}**` })
		await message.guild.channels.cache.get(LevelUpChannel).send({
		embeds: [devSupport],
		})} 
	} 

		if (level === 50) {
		console.log("Rank Up")
		if (!roleRank50) {
		console.log("No Role Set")
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **Captain**`})
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		}) 
		} else {
		await message.member.roles.add(roleRank50).catch((e) => console.log(e))
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r50name.name}**` })
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		})} 
	} 

		if (level === 60) {
		console.log("Rank Up")
		if (!roleRank60) {
		console.log("No Role Set")
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **Major**`})
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		}) 
		} else {
		await message.member.roles.add(roleRank60).catch((e) => console.log(e))
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r60name.name}**` })
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		})} 
	} 

		if (level === 70) {
		console.log("Rank Up")
		if (!roleRank70) {
		console.log("No Role Set")
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **Colonel**`})
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		}) 
		} else {
		await message.member.roles.add(roleRank70).catch((e) => console.log(e))
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r70name.name}**` })
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		})} 
	} 

		if (level === 80) {
		console.log("Rank Up")
		if (!roleRank80) {
		console.log("No Role Set")
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **Major General**`})
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		}) 
		} else {
		await message.member.roles.add(roleRank80).catch((e) => console.log(e))
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r80name.name}**` })
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		})} 
	} 

		if (level === 90) {
		console.log("Rank Up")
		if (!roleRank90) {
		console.log("No Role Set")
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **General**`})
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		}) 
		} else {
		await message.member.roles.add(roleRank90).catch((e) => console.log(e))
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r90name.name}**` })
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		})} 
	} 

		if (level === 100) {
		console.log("Rank Up")
		if (!roleRank100) {
		console.log("No Role Set")
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **General of The Army**`})
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		}) 
		} else {
		await message.member.roles.add(roleRank100).catch((e) => console.log(e))
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r100name.name}**` })
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		})} 
	}
	if (level === 250) {
		console.log("Rank Up")
		if (!roleRank100) {
		console.log("No Role Set")
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **Chief of Staff**`})
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		}) 
		} else {
		await message.member.roles.add(roleRank250).catch((e) => console.log(e))
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r250name.name}**` })
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		})} 
	}
	if (level === 500) {
		console.log("Rank Up")
		if (!roleRank500) {
		console.log("No Role Set")
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **President**`})
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		}) 
		} else {
		await message.member.roles.add(roleRank500).catch((e) => console.log(e))
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r500name.name}**` })
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		})} 
	}
	if (level === 1000) {
		console.log("Rank Up")
		if (!roleRank1000) {
		console.log("No Role Set")
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **God**`})
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		}) 
		} else {
		await message.member.roles.add(roleRank1000).catch((e) => console.log(e))
		await message.guild.channels.cache.get(LevelUpChannel).send({ content: `Congratulations **<@${message.member.id}>**, you have Ranked Up and achieved the rank of **${r1000name.name}**` })
		await message.guild.channels.cache.get(LevelUpChannel).send({
			embeds: [devSupport],
		})} 
	}   
	}
	let result = await sql.Execute (`UPDATE levels SET points = '${newPoints}', level = '${level}', discord_username = '${message.member.displayName}', discord_avatar = '${message.author.displayAvatarURL()}', last_seen_server = '${guildName}' WHERE discord_id = '${message.author.id}'`)}
}
