const { MessageEmbed, Client, ModalSubmitFieldsResolver, MessageActionRow, MessageButton } = require('discord.js');
const sql = require("../config/Database");
const interactionCreate = require('./interactionCreate');
module.exports = {
	name: 'messageCreate',
	async execute(message) {
		GuildName = message.guild.name	

		if (message.author.bot === true) {
			return;
		}
		Settings = await sql.Execute(`select * from settings where guild_id = '${message.guild.id}';`); 
		Levels = await sql.Execute(`select * from levels where discord_id = '${message.author.id}';`); 
		Players = await sql.Execute(`select * from players where player_id = ${Levels[0].player_id}`);
		setDate = Date.now()
		console.log(setDate)
		if (!Players) {
			let playerImage = "https://i.ibb.co/gm9c3x5/no-image-icon-10.png"
			console.log(`Player Not Registered - ${playerImage}`)
		} else var playerImage = Players[0].player_image
			playerId = Levels[0].player_id
			console.log(`Player Registered - ${playerImage}`)
			let updatePlayers = await sql.Execute(`UPDATE players SET date_last_known = '${setDate}', discord ='${message.author.id}', discord_server = '${GuildName}' WHERE player_id = ${playerId}`)
			console.log(updatePlayers)
		const newPlayer = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Welcome to the PH Family')
            .setURL('http://www.phfamily.co.uk')
            .setThumbnail(message.member.displayAvatarURL())
            .setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }), url: '' })
            .setDescription(`Welcome **${message.member.displayName}**!`)
            .addFields(
                { name: `Name:`, value: `${message.member.displayName}` },
                { name: `Points:`, value: `${score}` },
                { name: 'Welcome to the PH Family.', value: `Stay active in our servers for regular rewards!`, inline: true },
                )
            //.setImage(`${playerImage}`)
            .setTimestamp()
            .setFooter({ text: 'Welcome to the PH Family.', iconURL: 'https://i.ibb.co/r5xScqV/78893-FB5-9973-430-D-ABA2-A81-B13-D5-DC3-B.jpg' });

		if (Levels.length === 0) {
			console.log("New Member")
			level = 0
			var score = Math.floor(Math.random() * 150) * 3; //This may need moving
			let result = await sql.Execute(`INSERT INTO levels (discord_id, points, level, discord_username, last_seen_server) VALUES ('${message.author.id}', '${score}', '${level}', '${message.member.displayName}', '${GuildName}');`)
			message.reply({
				content: `Welcome to the PH Family **${message.member.displayName}**.\nWe look forward to you becoming a valued member of our community!`,
				//components: [player],
				embeds: [newPlayer]
			});

			return;
		}

		let rank10 = Settings[0].Rank_10
		let rank20 = Settings[0].Rank_20
		let rank30 = Settings[0].Rank_30
		let rank40 = Settings[0].Rank_40
		let rank50 = Settings[0].Rank_50
		let rank60 = Settings[0].Rank_60
		let rank70 = Settings[0].Rank_70
		let rank80 = Settings[0].Rank_80
		let rank90 = Settings[0].Rank_90
		let rank100 = Settings[0].Rank_100
		let scoreLevel = Levels[0].level
		let r10name = message.guild.roles.cache.find( r => r.id === rank10 )
		
		if (scoreLevel > 100) {
			var score = Math.floor(Math.random() * 5) +1;
			console.log(scoreLevel, score)
		} 
		if (scoreLevel > 90) {
			var score = Math.floor(Math.random() * 10) +1;
		} 
		if (scoreLevel > 80) {
			var score = Math.floor(Math.random() * 15) +1;
		} 
		if (scoreLevel > 70) {
			var score = Math.floor(Math.random() * 25) + 1;
		} 
		if (scoreLevel > 60) {
			var score = Math.floor(Math.random() * 50) * 2;
		}	
		if (scoreLevel > 50) {
			var score = Math.floor(Math.random() * 75) * 2;
		}	
		if (scoreLevel > 40) {
			var score = Math.floor(Math.random() * 100) * 1.5;
		}
		if (scoreLevel > 30) {
			var score = Math.floor(Math.random() * 125) * 2;
		}		
		if (scoreLevel > 20) {
			var score = Math.floor(Math.random() * 150) * 2;
		} else var score = Math.floor(Math.random() * 150) * 3;
			
		points = Levels[0].points
		newPoints = (points + score)
		newLevel = (Levels[0].level + 1)
		let LevelUpChannel = Settings[0].level_up_channel_id
		
		const levelup = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Level Up')
            .setURL('http://www.phfamily.co.uk')
            .setThumbnail(message.member.displayAvatarURL())
            .setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }), url: '' })
            .setDescription(`Congratulations **<@${message.member.id}>** you have levelled up!`)
            .addFields(
                { name: `Name:`, value: `<@${message.member.id}>` },
                { name: `Points:`, value: `${newPoints}` },
                { name: 'Level', value: `${newLevel}`, inline: true },
                )
            .setImage(playerImage) // to be added once Levels & Search tables are joined
            .setTimestamp()
            .setFooter({ text: 'Level Up - PH Family.', iconURL: 'https://i.ibb.co/r5xScqV/78893-FB5-9973-430-D-ABA2-A81-B13-D5-DC3-B.jpg' });


		let initiallevel = Levels[0].level
		level = Math.floor((score + points) / 2333 )
/*
		  if (level === 10) {
			if (!rank10) {
				console.log("No Role Set")
				let result = await sql.Execute (`UPDATE levels SET points = '${newPoints}', level = '${level}', discord_username = '${message.member.displayName}', last_seen_server = '${GuildName}' WHERE discord_id = '${message.author.id}'`)
				message.reply({ content: 'Congratulations you have Ranked Up and achieved the rank of **PRIVATE**'})
				
			} else await message.member.roles.add(rank10).catch((e) => console.log(e))
				let result = await sql.Execute (`UPDATE levels SET points = '${newPoints}', level = '${level}', discord_username = '${message.member.displayName}', last_seen_server = '${GuildName}' WHERE discord_id = '${message.author.id}'`)
				message.reply({ content: `Congratulations you have Ranked Up and achieved the rank of ${r10name}` })
		}  
 

		if (level === 20) {
			if (!Rank20) {
				console.log("No Role Set")
				message.reply({ content: 'Congratulations you have Ranked Up You are now **CAPTAIN**'})
			} else await message.member.roles.add(Rank20).catch((e) => console.log(e));
					message.reply({ content: `Congratulations you have Ranked Up and achieved @<${Rank20}>` })
		} 

		if (level === 30) {
			if (!Rank30) {
				console.log(message.user.displayName, message.GuildName + "Level 30") 
				console.log("No Role Set")
				message.reply({ content: 'Congratulations you have Ranked Up You are now **SARGEANT**'})
			} else await message.member.roles.add(Rank30).catch((e) => console.log(e));
					message.reply({ content: `Congratulations you have Ranked Up and achieved @<${Rank30}>` })
		} 

		if (level === 40) {
			if (!Rank40) {
				console.log(message.user.displayName, message.GuildName + "Level 40") 
				console.log("No Role Set")
				message.reply({ content: 'Congratulations you have Ranked Up You are now **MAJOR**'})
			} else
			await message.member.roles.add(Rank40).catch((e) => console.log(e));
			message.reply({ content: `Congratulations you have Ranked Up and achieved ${Rank40}` })
			console.log(message.user.displayName, message.GuildName + "Level 40") 			
		} 

		if (level === 50) {
			if (!Rank50) {
				console.log(message.user.displayName, message.GuildName + "Level 50") 
				console.log("No Role Set")
				message.reply({ content: 'Congratulations you have Ranked Up You are now **GENERAL**'})
			} else
			await message.member.roles.add(Rank50).catch((e) => console.log(e));
			message.reply({ content: `Congratulations you have Ranked Up and achieved ${Rank50}` })
			console.log(message.user.displayName, message.GuildName + "Level 50") 			
		} 

		if (level === 60) {
			if (!Rank60) {
				console.log(message.user.displayName, message.GuildName + "Level 60") 
				console.log("No Role Set")
				message.reply({ content: 'Congratulations you have Ranked Up You are now **MAJOR GENERAL**' })
			} else
			await message.member.roles.add(Rank60).catch((e) => console.log(e));
			message.reply({ content: `Congratulations you have Ranked Up and achieved ${Rank60}`, })
			console.log(message.user.displayName, message.GuildName + "Level 60") 			
		} 

		if (level === 70) {
			if (!Rank10) {
				console.log(message.user.displayName, message.GuildName + "Level 70") 
				console.log("No Role Set")
				message.reply({ content: 'Congratulations you have Ranked Up You are now **FIELD MARSHALL**'})
			} else
			await message.member.roles.add(Rank70).catch((e) => console.log(e));
			message.reply({ content: `Congratulations you have Ranked Up and achieved ${Rank70}` })
			console.log(message.user.displayName, message.GuildName + "Level 70") 			
		} 

		if (level === 80) {
			if (!Rank80) {
				console.log(message.user.displayName, message.GuildName + "Level 80") 
				console.log("No Role Set")
				message.reply({ content: 'Congratulations you have Ranked Up You are now **PRESIDENT**'})
			} else
			await message.member.roles.add(Rank80).catch((e) => console.log(e));
			message.reply({ content: `Congratulations you have Ranked Up and achieved ${Rank80}`})
			console.log(message.user.displayName, message.GuildName + "Level 80") 			
		} 

		if (level === 90) {
			if (!Rank90) {
				console.log(message.user.displayName, message.GuildName + "Level 90") 
				console.log("No Role Set")
				message.reply({ content: 'Congratulations you have Ranked Up You are now **GOD**'})
			} else
			await message.member.roles.add(Rank90).catch((e) => console.log(e));
			message.reply({ content: `Congratulations you have Ranked Up and achieved ${Rank90}`})
			console.log(message.user.displayName, message.GuildName + "Level 90") 			
		} 

		if (level === 100) {
			//message.roles.add(Role100).catch((e) => console.log(e));
			console.log("Level 100")
			
		}
 */ 
		if (level > initiallevel) {
			
			console.log("Level Up")
			message.guild.channels.cache.get(LevelUpChannel).send({
				content: `**Congratulations**, You are now **Level ${level}**.\n**Thank You** for being a valued member of our community!`,
				embeds: [levelup]
			})
/* 			message.reply({
				content: `Congratulations **${message.member.displayName}**, You are now **Level ${level}**.\n**Thank You** for being a valued member of our community!`,
				//components: [player],
				embeds: [levelup]
			}); */	}


		let result = await sql.Execute (`UPDATE levels SET points = '${newPoints}', level = '${level}', discord_username = '${message.member.displayName}', last_seen_server = '${GuildName}' WHERE discord_id = '${message.author.id}'`)}
		
};