const sql = require(`../config/Database`)

module.exports = {
    name: 'clientReady',
    async execute(client) {
        console.log(`Client Ready:\n${client}`)
    }
};
