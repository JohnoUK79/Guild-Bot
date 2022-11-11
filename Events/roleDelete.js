const sql = require(`../config/Database`)

module.exports = {
    name: 'roleDelete',
    async execute(role) {
        console.log(`Role Deleted:\n${role}`)
    }
};
