const sql = require(`../config/Database`)

module.exports = {
    name: 'channelCreate',
    async execute(channel) {
        console.log(`Channel Create:\n${channel}`)
    }
};
