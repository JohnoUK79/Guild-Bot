const sql = require(`../config/Database`)

module.exports = {
    name: 'inviteDelete',
    async execute(invite) {
        console.log(`Invite Deleted:\n${invite}`)
    }
};
