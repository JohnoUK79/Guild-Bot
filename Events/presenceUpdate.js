const time = require('../config/timestamp');
setDate = time.UTCdefault()
const sql = require(`../config/Database`)

module.exports = {
    name: 'presenceUpdate',
    async execute(oldPresence, newPresence) {
        if (oldPresence)
            //console.log('Presence Change:', (setDate), 'Server:', newPresence.guild.name, 'User:', newPresence.member.displayName, 'From:', oldPresence.status ?? 'No Prior', 'To:', newPresence.status),
            oldPresenceUpdate = await sql.Execute(`INSERT INTO presence (date, guild_name, member_name, old_presence, new_presence) VALUES ('${setDate}', "${newPresence.guild.name}","${newPresence.member.displayName}","${oldPresence.status}","${newPresence.status}")`)
        else
            //console.log('Presence Change:', (setDate), 'Server:', newPresence.guild.name, 'User:', newPresence.member.displayName, 'From: No Prior', 'To:', newPresence.status),
            newPresenceUpdate = await sql.Execute(`INSERT INTO presence (date, guild_name, member_name, old_presence, new_presence) VALUES ('${setDate}', "${newPresence.guild.name}","${newPresence.member.displayName}",'No Prior Status','${newPresence.status}')`)
    },
};
