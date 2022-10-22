const sql = require(`../config/Database`)

module.exports = {
    name: 'roleUpdate',
    async execute(oldRole, newRole) {
        console.log(oldRole, newRole)
    }
};

