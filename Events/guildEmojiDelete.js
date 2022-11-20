const sql = require(`../config/Database`)

module.exports = {
    name: 'guildEmojiDelete',
    async execute(emoji) {
        console.log(`Guild Emoji Delete:\n${emoji}`)
    }
};
