
module.exports = {
    name: 'guildMemberAvailable',
    async execute(member) {
        console.log(`Guild Member Available:\n${member.name}`)
    }
};
