const sql = require("../config/Database");

module.exports = {
    name: 'messageReactionAdd',
        async execute(reaction) { 
            if (reaction.partial) {
                // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
                try {
                    await reaction.fetch();
                    console.log(`Partial`, reaction.message.channelId)
                } catch (error) {
                    console.error('Something went wrong when fetching the message:', error);
                    // Return as `reaction.message.author` may be undefined/null
                    return;
                }
            } else {            
            console.log(reaction.message.channelId)
        }
        }
    };
