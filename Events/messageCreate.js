const { MessageEmbed, Client, ModalSubmitFieldsResolver, MessageActionRow, MessageButton } = require('discord.js');
const sql = require("../config/Database");
const interactionCreate = require('./interactionCreate');
time = require('../config/timestamp')
setDate = time.UTCdefault()

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		var GuildName = message.member.guild.name	
		if (!GuildName){ var GuildName = 'Test'}
		var playerDisplayName = message.member.displayName
		if (!playerDisplayName){ var playerDisplayName = message.member.author}
		if (message.author.bot === true) {
			return;
		}
		Settings = await sql.Execute(`select * from settings where guild_id = '${message.guild.id}';`); 
		Levels = await sql.Execute(`select * from levels where discord_id = '${message.author.id}';`); 

		const updatePlayer =  new MessageActionRow()
				.addComponents(
		new MessageButton()
				.setCustomId('UID')
				.setLabel('Add / Update your Search Profile!')
				.setStyle('PRIMARY'),
		)

		const newPlayer = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Welcome to the PH Family')
		.setURL('http://www.phfamily.co.uk')
		.setThumbnail(message.member.displayAvatarURL())
		.setAuthor({ name: playerDisplayName, iconURL: message.member.displayAvatarURL({ dynamic: true }), url: '' })
		.setDescription(`Welcome **${playerDisplayName}**!`)
		.addFields(
			{ name: `Name:`, value: `${playerDisplayName}` },
			{ name: `Points:`, value: `${score}` },
			{ name: 'Welcome to the PH Family.', value: `Stay active in our servers for regular rewards!`, inline: true },
			)
		.setImage(`http://phfamily.co.uk/img/gifs/PH-Family-Dark.jpg`)
		.setTimestamp()
		.setFooter({ text: 'Welcome to the PH Family.', iconURL: 'http://phfamily.co.uk/img/gifs/PH-Family-Dark.jpg' });



		if (Levels.length === 0) {
			console.log("New Member")
			playerImage = "http://phfamily.co.uk/img/gifs/NotFound.png"
			level = 0
			var score = Math.floor(Math.random() * 150) * 3; 
			let result = await sql.Execute(`INSERT INTO levels (discord_id, points, level, discord_username, last_seen_server) VALUES ('${message.author.id}', '${score}', '${level}', '${message.member.displayName}', '${GuildName}');`)
			await message.reply({
				content: `Welcome to the PH Family **${playerDisplayName}**.\nWe look forward to you becoming a valued member of our community!`,
				components: [updatePlayer],
				embeds: [newPlayer]
			});
			return;

			
		}

		Lookup = Levels[0].player_id
		if (Lookup.length === 0) {Players = null} else {
		Players = await sql.Execute(`select * from players where player_id = ${Levels[0].player_id}`);}
				
		if (!Players) {
			let playerImage = "http://phfamily.co.uk/img/gifs/NotFound.png"
		} else {var playerImage = Players[0].player_image
			playerId = Levels[0].player_id
			updatePlayers = await sql.Execute(`UPDATE players SET date_last_known = '${setDate}', discord ='${message.author.id}', discord_server = '${GuildName}' WHERE player_id = ${playerId}`)}


		//let roleRank10 = Settings[0].Rank_10
		//let roleRank20 = Settings[0].Rank_20
		//let roleRank30 = Settings[0].Rank_30
		//let roleRank40 = Settings[0].Rank_40
		//let roleRank50 = Settings[0].Rank_50
		//let roleRank60 = Settings[0].Rank_60
		//let roleRank70 = Settings[0].Rank_70
		//let roleRank80 = Settings[0].Rank_80
		//let roleRank90 = Settings[0].Rank_90
		//let roleRank100 = Settings[0].Rank_100
		let scoreLevel = Levels[0].level
		//let r10name = message.guild.roles.cache.find( r => r.id === rank10 )
		
		var score = Math.floor(Math.random() * 150) * 3;

		if (scoreLevel > 20) {
			var score = Math.floor(Math.random() * 150) * 2;
		}

		if (scoreLevel > 30) {
			var score = Math.floor(Math.random() * 125) * 2;

		}

		if (scoreLevel > 40) {
			var score = Math.floor(Math.random() * 100) * 2;

		}	

		if (scoreLevel > 50) {
			var score = Math.floor(Math.random() * 75) * 2;

		}	

		if (scoreLevel > 60) {
			var score = Math.floor(Math.random() * 50) * 2;

		}	

		if (scoreLevel > 70) {
			var score = Math.floor(Math.random() * 25) + 1;

		} 

		if (scoreLevel > 80) {
			var score = Math.floor(Math.random() * 15) +1;

		} 

		if (scoreLevel > 90) {
			var score = Math.floor(Math.random() * 10) +1;

		} 

		if (scoreLevel > 100) {
			var score = Math.floor(Math.random() * 5) +1;

		} 
			
		points = Levels[0].points
		newPoints = (points + score)
		newLevel = (Levels[0].level + 1)
		let LevelUpChannel = Settings[0].level_up_channel_id
		
		const levelup = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Level Up')
            .setURL('http://www.phfamily.co.uk')
            .setThumbnail(message.member.displayAvatarURL())
            .setAuthor({ name: playerDisplayName, iconURL: message.member.displayAvatarURL({ dynamic: true }), url: '' })
            .setDescription(`Congratulations **<@${message.member.id}>** you have levelled up!`)
            .addFields(
                { name: `Name:`, value: `<@${message.member.id}>` },
                { name: `Points:`, value: `${newPoints}` },
                { name: 'Level', value: `${newLevel}`, inline: true },
                )
            .setImage(playerImage)
            .setTimestamp()
            .setFooter({ text: 'Level Up - PH Family.', iconURL: 'http://phfamily.co.uk/img/gifs/PH-Family-Dark.jpg' });


		let initiallevel = Levels[0].level
		level = Math.floor((score + points) / 3666 )
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
 
*/
		if (level > initiallevel) {
			console.log("Level Up")
			console.log(LevelUpChannel)
 			await message.guild.channels.cache.get(LevelUpChannel).send({
				//content: `**Congratulations**, You are now **Level ${level}**.\n**Thank You** for being a valued member of our community!`,
				embeds: [levelup],
				components: [updatePlayer],
			}) 
		}
		let result = await sql.Execute (`UPDATE levels SET points = '${newPoints}', level = '${level}', discord_username = '${playerDisplayName}', last_seen_server = '${GuildName}' WHERE discord_id = '${message.author.id}'`)}
}; 
