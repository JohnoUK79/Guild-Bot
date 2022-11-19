const sql = require(`../config/Database`)

module.exports = {
    name: 'guildBanAdd',
    async execute(guild) {
        console.log(`Guild Ban Add:\n${guild}`)
    }
};
