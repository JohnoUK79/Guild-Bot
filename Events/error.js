const sql = require(`../config/Database`)

module.exports = {
    name: 'error',
    async execute(error) {
        console.log(error)
    }
};
