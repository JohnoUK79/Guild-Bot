const sql = require(`../config/Database`)

module.exports = {
    name: 'guildCreate',
    once: true,

    async execute(params) {
        console.log(params)
    }
};
