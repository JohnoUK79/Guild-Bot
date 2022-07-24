const fs = require('node:fs');
const { Client, Intents, Collection } = require("discord.js");
const rpc = require("discord-rpc");
const { token, CLIENT_ID } = require('./config.json');

//Discord client
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
    ]
})

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
