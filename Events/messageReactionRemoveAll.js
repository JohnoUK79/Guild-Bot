const sql = require(`../config/Database`)

module.exports = {
    name: 'messageReactionRemoveAll',
    async execute(message, reactions) {
        console.log(`Message Reaction Remove All:\n${message}, ${reactions}`)
    }
};
