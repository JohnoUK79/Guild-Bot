
module.exports = {
    name: 'guildDelete',
    async execute(guild) {
        const { invites } = require('./ready')
        invites.delete(guild.id);
        //console.log('Guild Deleted', guild)
    }
};
