const sql = require(`../config/Database`)

module.exports = {
    name: 'roleCreate',
    async execute(role) {
        console.log(`Role Created:\n${role}`)
    }
};
