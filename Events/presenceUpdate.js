const timestamp = require('time-stamp');
module.exports = {
    name: 'presenceUpdate',
    async execute(oldPresence, newPresence) {
        if (oldPresence)
            console.log('Presence Change:', (timestamp.utc('YYYY/MM/DD HH:mm:ss')), 'Server:', newPresence.guild.name, 'User:', newPresence.member.displayName, 'From:', oldPresence.status ?? 'No Prior', 'To:', newPresence.status);
            
        else
            console.log('Presence Change:', (timestamp.utc('YYYY/MM/DD HH:mm:ss')), 'Server:', newPresence.guild.name, 'User:', newPresence.member.displayName, 'From: No Prior', 'To:', newPresence.status);
    },
};
