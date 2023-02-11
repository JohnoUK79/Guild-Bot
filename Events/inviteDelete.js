
module.exports = {
    name: 'inviteDelete',
    async execute(invite) {
        const { invites } = require('./ready')
        invites.get(invite.guild.id).delete(invite.code);
        //console.log('Invite Delete', invite)
    }
};
