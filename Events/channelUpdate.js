const sql = require(`../config/Database`)

module.exports = {
    name: 'channelUpdate',
    async execute(channel) {
        console.log(`Channel Update:\n${channel}`)
    }
};
