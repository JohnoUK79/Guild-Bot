const sql = require(`../config/Database`)

module.exports = {
    name: 'roleUpdate',
    async execute(oldRole, newRole) {
        console.log(`Role Updated:\n${oldRole}, ${newRole}`)
    }
};

