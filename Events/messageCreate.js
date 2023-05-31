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
		const { client } = require('../bot')
		if (message.mentions.users.has(client.user.id)){
			const target = message.content.slice(23)
			console.log(`Mention:${target}`)
			const configuration = new Configuration({
				apiKey: OPENAI_API_KEY,
			  });
			const openai = new OpenAIApi(configuration);
			async function runCompletion () {
			const reponse = await openai.createCompletion({
			model: "davinci:ft-battle-bot-2023-05-31-13-02-44",
			prompt: target,
			max_tokens:2000
			});
			
			const reply = reponse.data.choices[0].text
			console.log(reply)
			const length = 2000;
			const shortReply = reply.substring(0, length);

			if (!reply) return
			message.reply({
				content: `${shortReply}`
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