const {EmbedBuilder} = require(`discord.js`);
const sql = require(`../config/Database`)

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        console.log('Guild Member Add', member)
        await member.guild.members.fetch()
        //Load Guild Settings
        Data = await sql.Execute(`select * from settings where guild_id = '${member.guild.id}';`); 
        guildIcon = member.guild.iconURL();
        CHANNEL_ID = Data[0].welcome_channel_id
        ROLE_ID = Data[0].welcome_role_id
        GUILD = member.guild.name
        var playerDisplayName = member.displayName

        //Track the Invite Used
        const { invites } = require('./ready')
        // To compare, we need to load the current invite list.
        const newInvites = await member.guild.invites.fetch()
        // This is the *existing* invites for the guild.
        const oldInvites = invites.get(member.guild.id);
        // Look through the invites, find the one for which the uses went up.
        const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));
        // This is just to simplify the message being sent below (inviter doesn't have a tag property)
        const inviter = await member.guild.members.fetch(invite.inviter.id);


		if (!playerDisplayName){ var playerDisplayName = member.username}
        console.log("Member Joined")
        if (member.partial) {
            try {
                await member.fetch();
                console.log("Partial Member")
            } catch (error) {
                console.error('Something went wrong when fetching the member info:', error);
                return;
            }
        }
        
        const newMemberEmbed = new EmbedBuilder()
            .setColor("#d81e5b")
            .setTitle("New Player!")
            .setDescription(`<@${member.id}> has joined the server! \nWe hope you enjoy your time here.`)
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({ text: `${GUILD}`, iconURL: `${guildIcon}` })
            .setTimestamp();
            
        const welcomeEmbed = new EmbedBuilder()
            .setColor("#d81e5b")
            .setTitle(`Welcome to ${GUILD}`)
            .setDescription(`${GUILD} are happy to have you! \nWe hope you enjoy your time here.`)
            .setThumbnail(guildIcon)
            .setFooter({ text: `${GUILD}`, iconURL: `${guildIcon}` })
            .setTimestamp();
            inviter
            ? newMemberEmbed
                .addFields(
                    { name: `Joined using Invite Code`, value: `**${invite.code}** Invited by **${inviter}**` },
                    { name: `Invite was used:`, value: `**${invite.uses}** times since its creation` },
                    )
            : newMemberEmbed
                .addFields(
                    { name: `${member} joined but I couldn't find through which invite.` },
                    );
        

            await member.roles.add(ROLE_ID).catch((e) => console.log(e));
            await member.guild.channels.cache.get(CHANNEL_ID).send(
                {
                    embeds: [newMemberEmbed]
                }
            );
            await member.user.send(
                {
                    embeds: [welcomeEmbed]
                }
            );
     }
}