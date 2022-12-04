
module.exports = {
    name: 'typingStart',
    async execute(typing) {
        console.log(`Typing: ${typing.user.username}#${typing.user.discriminator} is typing...`)
    }
};
