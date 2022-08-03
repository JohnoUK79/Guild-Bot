const { MessageEmbed, Client, ModalSubmitFieldsResolver, MessageActionRow, MessageButton } = require('discord.js');
const sql = require("../config/Database");
const interactionCreate = require('./interactionCreate');
module.exports = {
	name: 'messageCreate',
	async execute(message) {

		if (message.author.bot === true) {
			return;
		}

		Settings = await sql.Execute(`select * from settings where guild_id = '${message.guild.id}';`); 
		Levels = await sql.Execute(`select * from levels where discord_id = '${message.author.id}';`); 

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
            //.setImage(`${Data[0].player_image}`)
            .setTimestamp()
            .setFooter({ text: 'Welcome to the PH Family.', iconURL: 'https://i.ibb.co/r5xScqV/78893-FB5-9973-430-D-ABA2-A81-B13-D5-DC3-B.jpg' });

		if (Levels.length === 0) {
			console.log("New Member")
			level = 0
			let result = await sql.Execute(`INSERT INTO levels (discord_id, points, level, discord_username, last_seen_server) VALUES ('${message.author.id}', '${score}', '${level}', '${message.member.displayName}', '${GuildName}');`)
			message.reply({
				content: `Welcome to the PH Family **${message.member.displayName}**.\nWe look forward to you becoming a valued member of our community!`,
				//components: [player],
				embeds: [newPlayer]
			});

			return;
		}

		GuildName = message.guild.name	
		let Rank10 = Settings[0].Rank_10
		let Rank20 = Settings[0].Rank_20
		let Rank30 = Settings[0].Rank_30
		let Rank40 = Settings[0].Rank_40
		let Rank50 = Settings[0].Rank_50
		let Rank60 = Settings[0].Rank_60
		let Rank70 = Settings[0].Rank_70
		let Rank80 = Settings[0].Rank_80
		let Rank90 = Settings[0].Rank_90
		let Rank100 = Settings[0].Rank_100
		let scoreLevel = Levels[0].level
		
		if (scoreLevel > 100) {
			var score = Math.floor(Math.random() * 5) +1;
			console.log(scoreLevel, score)
		} 
		if (scoreLevel > 90) {
			console.log(scoreLevel, score)
			var score = Math.floor(Math.random() * 10) +1;
		} 
		if (scoreLevel > 80) {
			console.log(scoreLevel, score)
			var score = Math.floor(Math.random() * 15) +1;
		} 
		if (scoreLevel > 70) {
			console.log(scoreLevel, score)
			var score = Math.floor(Math.random() * 25) + 1;
		} 
		if (scoreLevel > 60) {
			console.log(scoreLevel, score)
			var score = Math.floor(Math.randon() * 50) * 2;
		}	else var score = Math.floor(Math.random() * 150) * 3;
			console.log(scoreLevel, score)
		
		points = Levels[0].points
		newPoints = (points + score)
		newLevel = (Levels[0].level + 1)
		let LevelUpChannel = Settings[0].level_up_channel_id
		console.log(message.member.displayName, GuildName, score)
		
		const levelup = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Level Up')
            .setURL('http://www.phfamily.co.uk')
            .setThumbnail(message.member.displayAvatarURL())
            .setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }), url: '' })
            .setDescription(`Congratulations **${message.member.displayName}** you have levelled up!`)
            .addFields(
                { name: `Name:`, value: `${message.member.displayName}` },
                { name: `Points:`, value: `${newPoints}` },
                { name: 'Level', value: `${newLevel}`, inline: true },
                )
            //.setImage(`${Data[0].player_image}`) // to be added once Levels & Search tables are joined
            .setTimestamp()
            .setFooter({ text: 'Level Up - PH Family.', iconURL: 'https://i.ibb.co/r5xScqV/78893-FB5-9973-430-D-ABA2-A81-B13-D5-DC3-B.jpg' });


		let initiallevel = Levels[0].level
		level = Math.floor((score + points) / 2500 )

		if (level === 10) {
			if (!Rank10) {
				console.log("Level 10") 
				console.log("No Role Set")
				//message.reply({ content: 'Congratulations you have Ranked Up with No Role - Please Contact Your Discord Admin' })
			} else
			await message.member.roles.add(Rank10).catch((e) => console.log(e));
			//message.reply({ content: `Congratulations you have Ranked Up and achieved ${Rank10.name}`, empheral: true })
			console.log("Level 10") 
			
		} 


		if (level === 20) {
			if (!Rank20) {
				console.log("Level 20") 
				console.log("No Role Set")
				//message.reply({ content: 'Congratulations you have Ranked Up with No Role - Please Contact Your Discord Admin' })
			} else
			await message.member.roles.add(Rank20).catch((e) => console.log(e));
			//message.reply({ content: `Congratulations you have Ranked Up and achieved ${Rank20}` })
			console.log("Level 20") 
			
		} 	

		if (level === 30) {
			//message.roles.add(Role30).catch((e) => console.log(e));
			console.log("Level 30")
			
		}

		if (level === 40) {
			//message.roles.add(Role40).catch((e) => console.log(e));
			console.log("Level 40")
			
		}

		if (level === 50) {
			//message.roles.add(Role50).catch((e) => console.log(e));
			console.log("Level 50")
			
		}

		if (level === 60) {
			//message.roles.add(Role60).catch((e) => console.log(e));
			console.log("Level 60")
			
		}

		if (level === 70) {
			//message.roles.add(Role70).catch((e) => console.log(e));
			console.log("Level 70")
			
		}

		if (level === 80) {
			//message.roles.add(Role80).catch((e) => console.log(e));
			console.log("Level 80")
			
		}

		if (level === 90) {
			//message.roles.add(Role90).catch((e) => console.log(e));
			console.log("Level 90")
			
		}

		if (level === 100) {
			//message.roles.add(Role100).catch((e) => console.log(e));
			console.log("Level 100")
			
		}

		if (level > initiallevel) {
			
			console.log("Level Up")
			message.guild.channels.cache.get(LevelUpChannel).send({
				content: `Congratulations **${message.member.displayName}**, You are now **Level ${level}**.\n**Thank You** for being a valued member of our community!`,
				embeds: [levelup]
			})
/* 			message.reply({
				content: `Congratulations **${message.member.displayName}**, You are now **Level ${level}**.\n**Thank You** for being a valued member of our community!`,
				//components: [player],
				embeds: [levelup]
			}); */	}


		let result = await sql.Execute (`UPDATE levels SET points = '${newPoints}', level = '${level}', discord_username = '${message.member.displayName}', last_seen_server = '${GuildName}' WHERE discord_id = '${message.author.id}'`)}
		
};