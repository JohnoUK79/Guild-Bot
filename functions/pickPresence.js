const { ActivityType } = require('discord.js')
module.exports = {
    updatePresence: async function (client) {
    const myMembers = client.users.cache.size
    const options = [
        {
            type: ActivityType.Watching,
            text: `the Empires of ${myMembers.toLocaleString()} Warriors, flourish with /battle-bot-main!`,
            status: 'Online'
        },
        {
            type: ActivityType.Watching,
            text: `over the Battle Empire with ${myMembers.toLocaleString()} Warriors!`,
            status: 'Online'
        },
        {
            type: ActivityType.Listening,
            text: `${myMembers.toLocaleString()} Warriors in need with /battle-bot-help`,
            status: 'Online'
        },
        {
            type: ActivityType.Competing,
            text: `Campaigns with ${myMembers.toLocaleString()} Warriors across the Globe with /battle-bot-profile!`,
            status: 'Online'
        }
    ]
    const option = options[Math.floor(Math.random() * options.length)];
    console.log(option)
    client.user
        .setPresence({
            activities: [
                {
                    name: option.text,
                    type: option.type        
                },
            ],
            status: option.status
        })
    }
}