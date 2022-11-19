const sql = require(`../config/Database`)

module.exports = {
    name: 'channelDelete',
    async execute(channel) {
        console.log(`Channel Delete:\n${channel}`)
    }
};
