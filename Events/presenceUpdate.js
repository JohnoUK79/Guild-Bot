const time = require('../config/timestamp');
setDate = time.UTCdefault()
module.exports = {
    name: 'presenceUpdate',
    async execute(oldPresence, newPresence) {
        if (oldPresence)
            console.log('Presence Change:', (setDate), 'Server:', newPresence.guild.name, 'User:', newPresence.member.displayName, 'From:', oldPresence.status ?? 'No Prior', 'To:', newPresence.status);
            
        else
            console.log('Presence Change:', (setDate), 'Server:', newPresence.guild.name, 'User:', newPresence.member.displayName, 'From: No Prior', 'To:', newPresence.status);
    },
};
