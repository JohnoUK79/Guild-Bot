time = require('../config/timestamp')
setDate = time.UTCdefault()

module.exports = {
    name: 'typingStart',
    async execute(typing) {
        console.log(`Typing ${setDate}: ${typing.user.username}#${typing.user.discriminator} is typing...`)
    }
};
