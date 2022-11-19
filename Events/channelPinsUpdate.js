const sql = require(`../config/Database`)

module.exports = {
    name: 'channelPinsUpdate',
    async execute(channel) {
        console.log(`Channel Pins Update:\n${channel}`)
    }
};
