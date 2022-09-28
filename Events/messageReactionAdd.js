const { Interaction, MessageReaction, ReactionUserManager, ReactionCollector, ReactionEmoji, ReactionManager, Message, Collector, Client, ClientUser, RoleManager, User } = require("discord.js");
const sql = require("../config/Database");


module.exports = {
    class:'extends',
    name: 'messageReactionAdd',
        async execute(messageReaction, user) { 
            //if(this.client.user === user) return;
            const { message, emoji } = messageReaction;
            const member = message.guild.members.cache.get(user.id);
            let userAddRole = user.id         
            let messageId = messageReaction.message.id
            let emojiName = messageReaction.emoji.name
            let guildId = messageReaction.message.guildId
            let newuser = user

            if (messageReaction.partial) {
                // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
                try {
                    await messageReaction.fetch();
                    //console.log(reaction)
                    let messageId = messageReaction.message.id
                    let emojiName = messageReaction.emoji.name
                    let guildId = messageReaction.message.guildId
                    let newuser = user
                    console.log(`Partial - ${emojiName}  from ${messageId} in ${guildId} by ${newuser}`);
                    //addRole = await sql.Execute(`SELECT * FROM reactions WHERE guild_id = '${guildId}' AND message_id = '${messageId}' AND emoji = '${emoji}';`)
                    //console.log(discord)
                    return;

                } catch (error) {
                    console.error('Something went wrong when fetching the message:', error);
                    return;
                }
            }

            console.log(`Full - ${emojiName} on ${messageId} in ${guildId} by ${newuser}`);
            const addRole = await sql.Execute(`SELECT * FROM reactions WHERE guild_id = '${guildId}' AND message_id = '${messageId}' AND emoji = '${emoji}';`)
            if (addRole) {
                for (let i = 0; i < addRole.length; i++) {
                    let roleId = addRole[i].role_id
                    console.log(roleId)
                    //console.log(userAddRole)
                    //console.log(addRole[i])
                    let rrRole = '964880198086578197'//message.guild.roles.cache.get(roleId)
                                        
                    await member.roles.add(rrRole)  

                }
            } else return
            

        }
    };
