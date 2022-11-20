const sql = require(`../config/Database`)

module.exports = {
    name: 'guildMemberAvailable',
    async execute(member) {
        console.log(`Guild Member Available:\n${member}`)
    }
};
