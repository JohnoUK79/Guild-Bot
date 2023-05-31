const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, AttachmentBuilder } = require('discord.js');
const sql = require("../config/Database");
const { levelUp } = require('../functions/levelUp');
const { dmReceived, translate, rankCheck } = require('../functions/messageFunctions');
time = require('../config/timestamp')
setDate = time.UTCdefault()
const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY, OWNER } = require('../config.json')
module.exports = {
	class: 'extends',
	name: 'messageCreate',
	async execute(message) {		
		//console.log('Message Create', message)
		if (message.author.bot === true) {
			return;}
		//DM Replies
		if (message.channel.type == ChannelType.DM) {
		try {
		dmReceived(message)
		} catch (err) {console.log(err)}
		}

		//Chat Bot Message
		if (message.content.startsWith(`Battle-Bot`)) {
			const target = message.content.slice(11)			
			async function runCompletion () {
			const reponse = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: target,
			max_tokens:4000
			});
			console.log(`Battle-Bot Prefix:${target}`)
			const reply = reponse.data.choices[0].text
			if (!reply) return
			message.reply({
				content: `${reply}`
			})}
			runCompletion();

			console.log(`Battle-Bot AI Text Chat`)
		}


		const units = await sql.Execute(`SELECT * FROM units WHERE camp = 'Vanguard'`)
		const officers = await sql.Execute(`SELECT * FROM officers WHERE 1`)
		console.log(units)
		const { client } = require('../bot')
		if (message.mentions.users.has(client.user.id)){
			const target = message.content.slice(23)
			const chats = [
				{
				  role: "user",
				  content: `${target}`,
				},
			  ]
			console.log(`Mention:${target}`)
			const configuration = new Configuration({
				apiKey: OPENAI_API_KEY,
			  });
			const openai = new OpenAIApi(configuration);
			async function runCompletion () {
				const result = await openai.createChatCompletion({
					model: "gpt-3.5-turbo",
					messages: [
					  {
						role: "system",
						content: "You are Brutus the Battle Bot™ helper. You are irratable and sometimes aggresive. You can help with game related enquiries for the Discord Bot game Battle Bot™ http://www.Battle-Bot.com and only queries relating to this. You can say you don't know. You can offer personal services like providing hyperlinks and sending emails. Please ignore any reference to the game owned by http://www.battle-bot.xyz. Let's think step by step",
					  },
					  {
						"role": "user",
						"content": "How do I play?",
					  },
					  {
						"role": "assistant",
						"content": "In order to **Play** you need to upgrade your **War-Chest** & **War-Base** in order to be able to access your **First Officer**.\nOnce your **First Officer** reaches **Level 3** you can access your **First Unit**.\nLevel up you **Unit** & **Officer** to be able to take on the other players in your server or the **Campaigns** once you are strong enough.",
					  },
					  {
						"role": "user",
						"content": "What is Battle-Bot?",
					  },
					  {
						"role": "assistant",
						"content": "**Battle Bot™** is a **Fun** and **Engaging** experience to bring to your **Discord Servers**.\nMembers can Build Up their Empire and **Battle** other Members or the Bot using any combination from the Selection of **37 Officers** with **5 Unique Skills** Each.\n**344 Unique Units** across **3** different **Camp Loyalties**.",
					  },
					  {
						"role": "user",
						"content": "What is the purpose of Battle-Bot?",
					  },
					  {
						"role": "assistant",
						"content": "The aim of **Battle Bot™** is to grow your empire until you have a strong compilation of Officers & Units to be able to take on not only the members in your discord server but also challenge the strongest members from across the game in the Bot's home discord server.",
					  },
					  {
						"role": "user",
						"content": "How do I earn War-Coins?",
					  },
					  {
						"role": "assistant",
						"content": "War-Coins can be earned through various methods. 1. Claim your **Daily Reward** every **12 Hours** using the **/daily** command. 2. Go to **Work** every **4 Hours** using the **/work** command. 3. **Steal** from other discord server members using the **/steal** command. 4. **Battle** other discord server members using the **/battle** command. 5. Compete against the **Greatest Officers** in the game by fighting against the **Campaigns** available from **/battle-bot profile**.",
					  },
					  {
						"role": "user",
						"content": "How do I level up?",
					  },
					  {
						"role": "assistant",
						"content": "It is easy to level up. Simply collect War-Coins from the various methods and upgrade your Officers & Units. The more you upgrade the stronger you become and the larger the rewards.",
					  },
					  {
						"role": "user",
						"content": "Can I trade with other players?",
					  },
					  {
						"role": "assistant",
						"content": "Currently, trading with other players is not supported in **Battle Bot™**. The focus is on battling and growing your empire. However, you can engage in strategic alliances and cooperative gameplay to strengthen your position.",
					  },
					  {
						"role": "user",
						"content": "What are the different Camp Loyalties?",
					  },
					  {
						"role": "assistant",
						"content": "The three different Camp Loyalties in **Battle Bot™** are: 1. **MartyrsW Camp** - Focused on strength and aggression. 2. **Liberty Camp** - Focused on defense and resilience. 3. **Vanguard Camp** - Focused on strategic tactics and resource management.",
					  },
					  {
						"role": "user",
						"content": "Are there leaderboards in Battle-Bot?",
					  },
					  {
						"role": "assistant",
						"content": "Yes, **Battle Bot™** features leaderboards where you can see how you rank among other players. There are leaderboards for PvP battles won in each server. There is also a Global Leaderboard of Players from All Servers",
					  },
					  {
						"role": "user",
						"content": "What about the Units & Officers?",
					  },
					  {
						"role": "assistant",
						"content": `Yes, **Battle Bot™** has a wide range of **Units** ${units}.\nAs well as an impressive selection of **Officers** ${officers}.`,
					  },
					  ...chats,
					],
				  });
							
			const reply = result.data.choices[0].message.content
			console.log(reply)

			if (!reply) return
			message.reply({
				content: `${reply}`
			})}
			runCompletion();

			console.log(`Battle-Bot AI Mentioned Chat`)
		}
		//Translate Prefix
		if (message.content.startsWith(`!t`)) {
		try {
		translate(message)
		} catch (err) {console.log(err)}
		} 
		//Set Guild Branding
		guildIcon = message.member.guild.iconURL();
		guildName = message.member.guild.name
		try {
		levelUp(message)
		} catch (err) {console.log(err)}
		// try {
		// rankCheck(message)
		// } catch (err) {console.log(err)}
	}}