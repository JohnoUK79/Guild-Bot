const sql = require("../config/Database");

module.exports = {
    class:'extends',
    name: 'messageReactionAdd',
        async execute(messageReaction, user) { 
            //console.log('Message Reaction Add', messageReaction, user)
            const { message, emoji } = messageReaction;
            const member = message.guild.members.cache.get(user.id);
            let messageId = messageReaction.message.id
            let emojiName = messageReaction.emoji.name
            let guildId = messageReaction.message.guildId
            const projectId = 'upbeat-glow-372800';
            const {Translate} = require('@google-cloud/translate').v2;
            const translate = new Translate({projectId});

            // The text to translate
            let text = messageReaction.message.content;
            // The target language
            const target = 'bs';

            if (messageReaction.partial) {
                // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
                try {
                    await messageReaction.fetch();
                    let messageId = messageReaction.message.id
                    let emojiName = messageReaction.emoji.name
                    let guildId = messageReaction.message.guildId
                    let text = messageReaction.message.content;
                    if (!target) return;
                    if (!text) return;
                    // const [translation] = await translate.translate(text, target);
                    // console.log(`Partial Text: ${text}`);
                    // console.log(`Translation: ${translation}`);
                    const addRole = await sql.Execute(`SELECT * FROM reactions WHERE guild_id = '${guildId}' AND message_id = '${messageId}' AND emoji = '${emojiName}';`)
                if (addRole) {
                    for (let i = 0; i < addRole.length; i++) {
                    let roleId = addRole[i].role_id
                    let rrRole = message.guild.roles.cache.get(roleId)                                       
                    await member.roles.add(rrRole)  
                    console.log(`Partial Reaction Role ${rrRole.name} Added by ${user}`)
                }
            } else return;

                } catch (error) {
                    console.error('Something went wrong when fetching the message:', error);
                    return;
                }
            }
            if (!target) return;
            if (!text) return;
            // Translates some text into Target Language
            // const [translation] = await translate.translate(text, target);
            // console.log(`Text: ${text}`);
            // console.log(`Translation: ${translation}`);

            const addRole = await sql.Execute(`SELECT * FROM reactions WHERE guild_id = '${guildId}' AND message_id = '${messageId}' AND emoji = '${emojiName}';`)
            if (addRole) {
                for (let i = 0; i < addRole.length; i++) {
                    let roleId = addRole[i].role_id
                    let rrRole = message.guild.roles.cache.get(roleId)                                       
                    await member.roles.add(rrRole)  
                    console.log(`Full Reaction Role ${rrRole.name} Added by ${user}`)
                }
            } else return
            

        }
        
    };
