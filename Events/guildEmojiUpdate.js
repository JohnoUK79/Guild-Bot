const sql = require(`../config/Database`)

module.exports = {
    name: 'guildEmojiUpdate',
    async execute(emoji) {
        console.log(`Guild Emoji Update:\n${emoji}`)
    }
};
