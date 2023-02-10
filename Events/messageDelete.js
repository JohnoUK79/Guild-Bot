const timestamp = require('../config/timestamp');

module.exports = {
	name: 'messageDelete',
	async execute(message) {
		console.log('Message Delete', message)
		if (message.partial) {
			// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
			console.log(`${timestamp.default()} Partial or Old Message ${message.id} was Deleted in Channel: ${message.channelId} in Guild: ${message.guildId} Created on: ${message.createdTimestamp}`);
		} else 

		if (message.author.bot === true) {
			return;
		} else
		console.log(`${timestamp.default()} Message Deleted by ${message.author.username} in Channel: ${message.channel.name} in Guild: ${message.guild.name} Content: ${message.content}`);
		return;
	}
};