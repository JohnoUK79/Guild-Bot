const timestamp = require('../config/timestamp');
module.exports = {
	name: 'messageDelete',
	async execute(message) {
		if (message.author.bot === true) {
			return;
		} else
		console.log(`${timestamp.default()} Message Deleted by ${message.author.username} in Channel: ${message.channel.name} in Guild: ${message.guild.name} Content: ${message.content}`);
		return;
	}
};