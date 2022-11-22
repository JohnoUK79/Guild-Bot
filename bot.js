const fs = require('node:fs');
const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder, Options } = require("discord.js");
const rpc = require("discord-rpc");
const { token, CLIENT_ID } = require('./config.json');
const { Player } = require('discord-player');
let embed = new EmbedBuilder();

//Discord client
const client = new Client({

    makeCache: Options.cacheWithLimits({
		MessageManager: 200, // This is default
		PresenceManager: 200,
        UserManager: 200,
        ReactionUserManager: 200,
        GuildInviteManager: 200,
        GuildBanManager: 200,
        GuildEmojiManager: 200,
        GuildMemberManager: 200,
        GuildScheduledEventManager: 200,
        ApplicationCommandManager: 200,
        BaseGuildEmojiManager: 200,
        GuildStickerManager: 200,
        StageInstanceManager: 200,
		// Add more class names here
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

//Discord Player Setup
const botJukebox = new Player(client, {
    ytdlOptions: {
    quality: 'highestaudio',
    highWaterMark: 1 << 25
    },
    leaveOnEnd: false,
    leaveOnStop: true,
    leaveInEmpty: true,
    leaveOnEndCooldown: 30000,
    leaveOnEmptyCooldown: 30000,
    autoSelfDeaf: true,
    initialVolume: 30,
    bufferingTimeout: 10000,
    spotifyBride: true,
    disableVolume: true,
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
    const progress = queue.createProgressBar();
    const perc = queue.getPlayerTimestamp();
    embed
        .setTitle('🎼| Now Playing:')
        .setDescription(`🎶 | [${track.title}](${track.url})!`)
		.setColor('#ffff00')
        .setTimestamp()
        .setFooter({ text: `Jukebox`, iconURL: `http://phfamily.co.uk/img/gifs/Warpath.jpg`});


    console.log(`🎼| Now Playing: ${track.title} in ${queue.connection.channel.name}!`);
    queue.connection.channel.send({
        //content: `🎼| **Now Playing**: [${track.title}]!`,
        embeds: [embed]
    });
});
botJukebox.on('trackAdd', (queue, track) => {
    embed
        .setTitle('🎼| Track Queued:')
        .setDescription(`🎶| [${track.title}](${track.url}) **Queued**!`)
        .setColor('#ffff00')
        .setTimestamp()
        .setFooter({ text: `Jukebox`, iconURL: `http://phfamily.co.uk/img/gifs/Warpath.jpg`});

    console.log(`🎼| ${track.title} queued!`);
    queue.connection.channel.send({
        embeds: [embed]
    });

});
botJukebox.on('botDisconnect', (queue) => {
    embed
        .setTitle(`❌ | I was manually disconnected from the Voice Channel, clearing queue!`)
        .setDescription(`❌ | **${queue.channel}**!`)
        .setColor('#ffff00')
        .setTimestamp()
        .setFooter({ text: `Jukebox`, iconURL: `http://phfamily.co.uk/img/gifs/Warpath.jpg`});

    console.log(`❌ | I was manually disconnected from the Voice Channel, clearing queue!`);
    queue.connection.channel.send({
        embeds: [embed]
    });
});
botJukebox.on('channelEmpty', (queue) => {
    embed
        .setTitle(`❌ | Nobody is in the Voice Channel...`)
        .setDescription(`❌ | **Leaving**!`)
        .setColor('#ffff00')
        .setTimestamp()
        .setFooter({ text: `Jukebox`, iconURL: `http://phfamily.co.uk/img/gifs/Warpath.jpg`});

    console.log(`❌ | Nobody is in the Voice Channel, leaving...`);
    queue.connection.channel.send({
        embeds: [embed]
    });
});
botJukebox.on('queueEnd', (queue) => {
    embed
        .setTitle(`✅ | **Queue**`)
        .setDescription(`✅ | **Finished**!`)
        .setColor('#ffff00')
        .setTimestamp()
        .setFooter({ text: `Jukebox`, iconURL: `http://phfamily.co.uk/img/gifs/Warpath.jpg`});

    console.log(`✅ | Queue finished!`);
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
    botJukebox: botJukebox   
}