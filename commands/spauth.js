const { SlashCommandBuilder } = require('@discordjs/builders');
const interaction = require('discord-interactions-zero');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spauth')
        .setDescription('Register with ShardPlay'),
    async execute(Interaction) {
        await interaction.callback.reply(Interaction, {
            ephemeral: false,
            content: '',
            tts: false,
            embeds: [
                {
                    type: 'rich',
                    title: `Click Here for ShardPlay registration`,
                    description: `• Registration is global across all Discord servers.\n• Information processed is not shared/sold with/to any 3rd parties.\n  `,
                    color: 0xf9d629,
                    image: {
                        url: `https://github.com/gidsola/Ghastli/blob/main/images/sp_banner.png?raw=true`,
                        height: 0,
                        width: 0,
                    },
                    author: {
                        name: `ShardPlay\n`,
                    },
                    url: `https://discord.com/api/oauth2/authorize?client_id=939211509752561765&redirect_uri=https%3A%2F%2Fdev--ghastli.goodsie.autocode.gg%2Foauth2%2F&response_type=code&scope=identify%20email%20gdm.join`,
                },
            ],
        })
    }
};
