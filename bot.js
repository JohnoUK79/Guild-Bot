const fs = require('node:fs');
const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder, Options } = require("discord.js");
const rpc = require("discord-rpc");
const { token, CLIENT_ID } = require('./config.json');
const { Player } = require('discord-player');
let embed = new EmbedBuilder();
embed
    .setColor('#ffff00')
    .setFooter({ text: `Jukebox`, iconURL: `http://phfamily.co.uk/img/gifs/Warpath.jpg`});

//Discord client
const client = new Client({

    makeCache: Options.cacheWithLimits({
		MessageManager: 200,
		PresenceManager: 200,
        UserManager: 200,
        ReactionUserManager: 200,
        GuildInviteManager: 200,
        GuildBanManager: 200,
        GuildEmojiManager: 200,
        GuildMemberManager: {
            maxSize: 1000,
            keepOverLimit: member => member.id === client.user.id,
        },
        GuildScheduledEventManager: 200,
        ApplicationCommandManager: 200,
        BaseGuildEmojiManager: 200,
        GuildStickerManager: 200,
        StageInstanceManager: 200,
        InviteManager: 200
		// Add more class names here

        // sweepers: {
        //     ...Options.DefaultSweeperSettings,
        //     messages: {
        //         interval: 3600, // Every hour...
        //         lifetime: 1800,	// Remove messages older than 30 minutes.
        //     },
        // },
	}),
    
    allowedMentions: {
        parse: ['roles', 'users', 'everyone'],
        repliedUser: false
      },
      intents: [
        GatewayIntentBits.Guilds, // for guild related things
        GatewayIntentBits.GuildMembers, // for guild members related things
        GatewayIntentBits.GuildBans, // for manage guild bans
        GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
        GatewayIntentBits.GuildIntegrations, // for discord Integrations
        GatewayIntentBits.GuildWebhooks, // for discord webhooks
        GatewayIntentBits.GuildInvites, // for guild invite managing
        GatewayIntentBits.GuildVoiceStates, // for voice related things
        GatewayIntentBits.GuildPresences, // for user presence things
        GatewayIntentBits.GuildMessages, // for guild messages things
        GatewayIntentBits.GuildMessageReactions, // for message reactions things
        GatewayIntentBits.GuildMessageTyping, // for message typing things
        GatewayIntentBits.DirectMessages, // for dm messages
        GatewayIntentBits.DirectMessageReactions, // for dm message reaction
        GatewayIntentBits.DirectMessageTyping, // for dm message typinh
        GatewayIntentBits.MessageContent // enable if you need message content things
      ],
      partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction
      ]
    });
const commandCooldowns = new Collection();

//Discord Player Setup
const botJukebox = new Player(client, {
    ytdlOptions: {
    quality: 'highestaudio',
    highWaterMark: 1 << 25
    },
    leaveOnEnd: false,
    leaveOnStop: true,
    leaveInEmpty: true,
    leaveOnEndCooldown: 15000,
    leaveOnEmptyCooldown: 15000,
    autoSelfDeaf: true,
    initialVolume: 30,
    bufferingTimeout: 2500,
    spotifyBride: true,
    disableVolume: false,
    smoothVolume: true
    })
botJukebox.on('error', (queue, error) => {
    console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
    queue.connection.channel.send(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
});
botJukebox.on('connectionError', (queue, error) => {
    console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
    queue.connection.channel.send(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
});
botJukebox.on('trackStart', (queue, track) => {

    embed
        .setTitle('🎼| Now Playing:')
        .setTimestamp()
        .setDescription(`🎶 | [${track.title}](${track.url})!`);

    console.log(`🎼| Now Playing: ${track.title} in ${queue.connection.channel.name}!`);
    queue.connection.channel.send({
        embeds: [embed]
    });
});
botJukebox.on('trackAdd', (queue, track) => {

    embed
        .setTitle('🎼| Track Queued:')
        .setTimestamp()
        .setDescription(`🎶| [${track.title}](${track.url})`);

    console.log(`🎼| ${track.title} queued!`);
    queue.connection.channel.send({
        embeds: [embed]
    });

});
botJukebox.on('botDisconnect', (queue) => {

    embed
        .setTitle(`❌ | I was manually disconnected from the Voice Channel, clearing queue!`)
        .setTimestamp()
        .setDescription(`❌ | **${queue.channel}**!`);

    console.log(`❌ | I was manually disconnected from the Voice Channel, clearing queue!`);
    queue.connection.channel.send({
        embeds: [embed]
    });
});
botJukebox.on('channelEmpty', (queue) => {

    embed
        .setTitle(`🎼 | I'm Singing to Myself in ${queue.connection.channel} Voice Channel...`)
        .setTimestamp()
        .setDescription(`🎶 | I'm leaving ${queue.connection.channel} for now!\nUse **/Jukebox song** to add more songs.`);

    console.log(`❌ | Nobody is in the Voice Channel, leaving...`);
    queue.connection.channel.send({
        embeds: [embed]
    });
});
botJukebox.on('queueEnd', (queue) => {

    embed
        .setTitle(`🎶 | End of Queue in ${queue.connection.channel}`)
        .setDescription(`🎼 | I have no more songs to play for ${queue.connection.channel}!\nMaybe use **/Jukebox loop** to keep the music playing!`);

    console.log(`🎼 | Queue finished!`);
    queue.connection.channel.send({
        embeds: [embed]
    });
});
console.log('=================Jukebox Online!=================')

//RPC client
const rpc_client = new rpc.Client({ transport: 'ipc' });

//Build command collection
const commandFiles = fs
    .readdirSync("./commands")
    .filter(file => file.endsWith(".js"));

const commands = [];
client.commands = new Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

//Build event support
const eventFiles = fs
    .readdirSync("./events")
    .filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, commands));
    } else {
        client.on(event.name, (...args) => event.execute(...args, commands));
    }
}

//RPC setup
const rpcFiles = fs
    .readdirSync("./rpc")
    .filter(file => file.endsWith(".js"));

for (const file of rpcFiles) {
    const rpc = require(`./rpc/${file}`);
    rpc_client.on(rpc.name, (...args) => rpc.execute(...args, rpc_client));
}

//Discord login
client.login(token);

//RPC login
rpc_client.login({ clientId: CLIENT_ID }).catch(console.error);
module.exports = {
    botJukebox: botJukebox,
    commandCooldowns: commandCooldowns
}