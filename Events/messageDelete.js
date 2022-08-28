const timestamp = require('time-stamp');
module.exports = {
	name: 'messageDelete',
	async execute(message) {
		if (message.author.bot === true) {
			return;
		} else
		console.log(timestamp.utc('Msg Deleted: YYYY/MM/DD HH:mm:ss'), 'by', message.author.username,`- in Channel:`, + message.channel, 'in Guild:', message.guild.name);
		return;
	}
};