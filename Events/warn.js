const sql = require(`../config/Database`)

module.exports = {
    name: 'warn',
    async execute(info) {
        console.log(info)
    }
};
