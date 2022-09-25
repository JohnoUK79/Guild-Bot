const { Interaction, ReactionUserManager, ReactionCollector, ReactionEmoji, ReactionManager, Message, Collector, Client, ClientUser, RoleManager, User } = require("discord.js");
const sql = require("../config/Database");



module.exports = {
    name: 'messageReactionAdd',
        async execute(reaction, user) { 

            if (reaction.partial) {
                // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
                try {
                    await reaction.fetch();
                    //console.log(reaction)
                    let messageId = reaction.message.id
                    let emoji = reaction.emoji.name
                    let guildId = reaction.message.guildId
                    let newuser = user
                    console.log(`Partial - ${emoji}  from ${messageId} in ${guildId} by ${newuser}`);
                    //addRole = await sql.Execute(`SELECT * FROM reactions WHERE guild_id = '${guildId}' AND message_id = '${messageId}' AND emoji = '${emoji}';`)
                    //console.log(addRole);
                    return;

                } catch (error) {
                    console.error('Something went wrong when fetching the message:', error);
                    return;
                }
            } 

            let userAddRole = user.id         
            let messageId = reaction.message.id
            let emoji = reaction.emoji.name
            let guildId = reaction.message.guildId
            let newuser = user
            console.log(`Full - ${emoji} on ${messageId} in ${guildId} by ${newuser}`);
            const addRole = await sql.Execute(`SELECT * FROM reactions WHERE guild_id = '${guildId}' AND message_id = '${messageId}' AND emoji = '${emoji}';`)
            if (addRole) {
                for (let i = 0; i < addRole.length; i++) {
                    let roleId = addRole[i].role_id
                    console.log(roleId)
                    console.log(userAddRole)
                    console.log(addRole[i])
                    //console.log(reaction)




                    //var guild = await reaction.guilds.fetch(guildId)
                    //const member = await guild.members.fetch(userAddRole)
                    //const role = await guild.roles.fetch(roleId)
                    //member.roles.add(role) 




                }
            } else return
            

        }
    };
