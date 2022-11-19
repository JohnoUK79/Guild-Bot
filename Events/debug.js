const sql = require(`../config/Database`)

module.exports = {
    name: 'debug',
    async execute(debug) {
        console.log(`Error:\n${debug}`)
    }
};
