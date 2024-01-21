const fs = require('node:fs');
const { Client, GatewayIntentBits, Collection, Options } = require("discord.js");
const rpc = require("discord-rpc");
const { token, CLIENT_ID } = require('./config.json');
const { ImageCache } = require('./functions/imageCache');
//Discord client
const client = new Client({

    makeCache: Options.cacheWithLimits({
		MessageManager: 0,
		PresenceManager: 0,
        UserManager: 200,
        ReactionUserManager: 0,
        GuildInviteManager: 0,
        GuildBanManager: 0,
        GuildEmojiManager: 100,
        GuildMemberManager: {
            maxSize: 500,
            keepOverLimit: member => member.id === client.user.id,
        },
        GuildScheduledEventManager: 0,
        ApplicationCommandManager: 0,
        BaseGuildEmojiManager: 0,
        GuildStickerManager: 0,
        StageInstanceManager: 0,
        InviteManager: 0,
		// Add more class names here

        sweepers: {
            ...Options.DefaultSweeperSettings,
            messages: {
                interval: 3600, // Every hour...
                lifetime: 1800,	// Remove messages older than 30 minutes.
            },
        },
	}),
    
    allowedMentions: {
        parse: ['roles', 'users', 'everyone'],
        repliedUser: false
      },
      intents: [
        GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
        GatewayIntentBits.Guilds, // for guild related things
        GatewayIntentBits.GuildMembers, // for guild members related things
        GatewayIntentBits.GuildMessages, // for guild messages things
        GatewayIntentBits.DirectMessages, // for dm messages
      ],
    });

// try {
// ImageCache()
// } catch (err) {console.log(err)}

const commandCooldowns = new Collection();

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
    commandCooldowns: commandCooldowns,
    client: client
}