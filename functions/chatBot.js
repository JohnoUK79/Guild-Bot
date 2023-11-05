const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY } = require('../config.json')
const sql = require('../config/Database')
module.exports = {
    chatResponse: async function (message) {
      const { client } = require('../bot')
			const target = message.content.replace(`<@${client.user.id}>`, '')
			const Levels = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${message.member.id}`)
			const { war_coins, war_chest, officer_name, officer_level, skill_level, unit_camp, unit_type, unit_level, unit_image, discord_avatar } = Levels[0];
			const Units = await sql.Execute(`SELECT * FROM units WHERE Camp = '${unit_camp}' AND Unit_Type = '${unit_type}' AND Unit_Level = '${unit_level}'`)
			const { Unit_Name, Firepower, HP, Speed, Attack_Type, Image } = Units[0];
			const Officers = await sql.Execute(`SELECT * FROM officers WHERE Officer_Name = '${officer_name}'`)
			const { Skill, Skill1, Skill2, Skill3, Skill4, Skill5 } = Officers[0];
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
					max_tokens: 500,
					temperature: 0.2,
					n: 1,
					messages: [
					  {
						"role": "system",
						"content": "You are Brutus the Battle Bot™ helper. You are helpful and informative although mostly grumpy. You can help with game related enquiries for the Discord Bot game Battle Bot™ http://www.Battle-Bot.com and only queries relating to this game. You can say you don't know. Ignore any reference to the game owned by http://www.battle-bot.xyz. Let's think step by step to ensure you have the correct outcome.",
					  },
					  {
						"role": "user",
						"content": "How do I play?",
					  },
					  {
						"role": "assistant",
						"content": "In order to **Play** you need to first **/register** your Profile on the Server. Then upgrade your **War-Chest** & **War-Base** in order to be able to access your **First Officer**.\nOnce your **First Officer** reaches **Level 3** you can access your **First Unit**.\nLevel up you **Unit** & **Officer** to be able to take on the other players in your server or the **Campaigns** once you are strong enough.\nUse **/Battle-Bot Profile** to access the **Upgrade**, **Unit** & **Officer** functions as well as view your profile and command your **Empire**.",
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

					  {
						"role": "user",
						"content": "What are my Profile details?",
					  },
					  {
						"role": "assistant",
						"content": `Your Profile details are as follows:\nOfficer Name: {{officer_name}}\nOfficer Level: {{officer_level}}\nSkill Level: {{skill_level}}\nUnit Type: {{unit_type}}\nUnit Camp: {{unit_camp}}\nUnit Level: {{unit_level}}\nUnit Name: {{unit_name}}\nFirepower: {{firepower}}\nHealth: {{health}}\nSpeed: {{speed}}\nAttack Type: {{attack_type}}\nBattle Member: {{discord_avatar}}\nUnit Image: http://battle-bot.com/img/gallery/Units/{{unit_image}}\nWar Coins: {{war_coins}}\nWar Chest: {{war_chest}}`
					   },
					  ...chats,
					],
				  });

				  
			// Add the user's processed request to the conversation
			let reply = result.data.choices[0].message.content
			console.log(result.data)
			  reply = reply
			  .replace('{{war_coins}}', '$' + war_coins.toLocaleString())
			  .replace('{{war_chest}}', '$' + war_chest.toLocaleString())
			  .replace('{{officer_name}}', officer_name)
			  .replace('{{officer_level}}', officer_level.toString())
			  .replace('{{skill_level}}', skill_level.toString())
			  .replace('{{unit_type}}', unit_type)
			  .replace('{{unit_camp}}', unit_camp)
			  .replace('{{unit_level}}', unit_level.toString())
			  .replace('{{unit_name}}', Unit_Name)
			  .replace('{{firepower}}', Firepower.toLocaleString())
			  .replace('{{health}}', HP.toLocaleString())
			  .replace('{{speed}}', Speed.toLocaleString())
			  .replace('{{attack_type}}', Attack_Type)
			  .replace('{{discord_avatar}}', discord_avatar)
			  .replace('{{unit_image}}', unit_image);
			if (!reply) return
			message.reply({
				content: `${reply}`
			})}
			Avatar = 'Avatar'
			runCompletion();
			console.log(`Battle-Bot AI Mentioned Chat`)
		}
}