const { ActivityType } = require('discord.js')
module.exports = {
    updatePresence: async function (client) {
    const myMembers = client.users.cache.size
    const options = [
        {
            type: ActivityType.Watching,
            text: `the Empires of ${myMembers.toLocaleString()} Warriors, flourish with /Battle-Bot Profile!`,
            status: 'Online'
        },
        {
            type: ActivityType.Watching,
            text: `over the Battle Empire with ${myMembers.toLocaleString()} Warriors!`,
            status: 'Online'
        },
        {
            type: ActivityType.Listening,
            text: `${myMembers.toLocaleString()} Warriors in need with /Battle-Bot Help`,
            status: 'Online'
        },
        {
            type: ActivityType.Competing,
            text: `Campaigns with ${myMembers.toLocaleString()} Warriors across the Globe with /Battle-Bot Profile!`,
            status: 'idle'
        }
    ]
    const option = options[Math.floor(Math.random() * options.length)];
    console.log(option)
    client.user
        .setPresence({
            activities: [
                {
                    name: option.text,
                    type: option.type,
                    status: option.status    
                },
            ],
            status: option.status
        })
    }
}