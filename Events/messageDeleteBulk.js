const sql = require(`../config/Database`)

module.exports = {
    name: 'messageDeleteBulk',
    async execute(messages) {
        console.log(messages)
    }
};
