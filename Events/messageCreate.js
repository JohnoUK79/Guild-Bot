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
		const { client } = require('../bot')
		if (message.mentions.users.has(client.user.id)){
			const target = message.content.replace(`<@${client.user.id}>`, '')
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
						content: "You are Brutus the Battle Bot™ helper. You are helpful and informative although mostly grumpy. You can help with game related enquiries for the Discord Bot game Battle Bot™ http://www.Battle-Bot.com and only queries relating to this game. You can say you don't know. Ignore any reference to the game owned by http://www.battle-bot.xyz. Let's think step by step",
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
						"content": "The aim of **Battle Bot™** is to grow your empire until you have a strong compilation of **Officers** & **Units** to be able to take on not only the members in your discord server but also challenge the strongest members from across the game in the Bot's home discord server.",
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
						"content": "It is easy to level up. Simply collect War-Coins from the various methods and upgrade your **Officers** & **Units**. The more you upgrade the stronger you become and the larger the rewards. Don't forget to upgrade your **War-Chest** to store your spoils of war!",
					  },
					  {
						"role": "user",
						"content": "What Units are there?",
					  },
					  {
						"role": "assistant",
						"content": "Currently, there are 3 **Camps** in **Battle Bot™**. Each has there own version of Infantry, Medium Tanks, Heavy Tanks, Tank Hunters , Howitzers, Fighters & Bombers. However, each **Camp** has a specialised **Unit**.\nThis is 1. **Super Heavy Tank** for **Vanguard Camp**. 2. **Rocket Launchers** for MartyrsW Camp**. 3. **Light Tanks** for **Liberty Camp**.",
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
						"content": "Yes, **Battle Bot™** features **Leaderboards** where you can see how you rank among other players. There are **Leaderboards** for **PvP Battles** won in each server. There is also a **Global Leaderboard** of Players from All Servers",
					  },
					  {
						"role": "user",
						"content": "What about the Officers?",
					  },
					  {
						"role": "assistant",
						"content": `Yes, **Battle Bot™** has an impressive selection of **Officers** 1. **[Sergeant Spanner]**, **Liberty**, **Ground**, Awoken Skill **Idomitable**. 2. **[White Wolf]**, **MartyrsW**, **Ground**, Awoken Skill **Vengeance**. 3. **[Thorn Countess]**, **Vanguard**, **Ground**, Awoken Skill **Beauty Worth Preserving**. 4. **[Tip of the Spear]**, **Liberty**, **Ground**, Awoken Skill **Undaunted**. 5. **[Antonina Shevchenko]**, **MartyrsW**, **Ground**, Awoken Skill **The Motherland**. 6. **[Professor Pain]**, **Vanguard**, **Ground**, Awoken Skill **Forlorn Hope**. 7. **[Silver Comet]**, **Vanguard**, **Air**, Awoken Skill **Twin Fangs**. 8. **[The Witcher]**, **MartyrsW**, **Air**, Awoken Skill **Unleashed Justice**. 9. **[Rictus Reaper]**, **Vanguard**, **Air**, Awoken Skill **Last Gasp**.`,
					  },
					  {
						"role": "user",
						"content": "What are the skills?",
					  },
					  {
						"role": "assistant",
						"content": "For every 50th Level the **Officer** is upgraded you can unlock another **Skill Level**.\n**Skill Levels** increase the chance of the **Skill Tiggering** by **5% Each Level** up until **100%**!",
					  },
					  ...chats,
					],
				  });
							
			const reply = result.data.choices[0].message.content
			console.log(result.data)

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