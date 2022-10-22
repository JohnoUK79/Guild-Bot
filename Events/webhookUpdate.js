const sql = require(`../config/Database`)

module.exports = {
    name: 'webhookUpdate',
    async execute(channel) {
        console.log(channel)
    }
};
