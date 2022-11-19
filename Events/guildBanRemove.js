const sql = require(`../config/Database`)

module.exports = {
    name: 'guildBanRemove',
    async execute(guild) {
        console.log(`Guild Ban Remove:\n${guild}`)
    }
};
