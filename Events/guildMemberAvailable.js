
module.exports = {
    name: 'guildMemberAvailable',
    async execute(member) {
        console.log(`Guild Member Available:`)
        console.log(member.user.username)
    }
};
