const sql = require(`../config/Database`)

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState) {
        console.log(oldState, newState)
    }
};
