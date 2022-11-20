const sql = require(`../config/Database`)

module.exports = {
    name: 'guildMembersUpdate',
    async execute(members) {
        console.log(`Guild Members Update:\n${members}`)
    }
};
