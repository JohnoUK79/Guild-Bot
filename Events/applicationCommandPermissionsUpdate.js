const sql = require(`../config/Database`)

module.exports = {
    name: 'applicationCommandPermissionsUpdate',
    async execute(command) {
        console.log(`Command Update:\n${command}`)
    }
};
