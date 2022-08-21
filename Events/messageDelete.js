const timestamp = require('time-stamp');
module.exports = {
	name: 'messageDelete',
	async execute(message) {
		console.log(timestamp.utc('Msg Deleted: YYYY/MM/DD HH:mm:ss'), 'by', message.author.username,`- in Channel:`, + message.channel, 'in Guild:', message.guild.name);
		return;
	}
};