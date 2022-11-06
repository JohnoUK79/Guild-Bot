const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
	data: new SlashCommandBuilder()
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)
		.setName('play')
		.setDescription('Plays YouTube Videos!')
		.addStringOption((option) => option
            .setName("query")
            .setDescription("Music Video to Play!")
            .setRequired(true)
        ),
	async execute(interaction) {
		await interaction.deferReply();

    	const query = interaction.options.get("query").value;
    	const searchResult = await player
        	.search(query, {
         	   requestedBy: interaction.user,
         	   searchEngine: QueryType.AUTO
      	  })
        .catch(() => {});
    if (!searchResult || !searchResult.tracks.length) return void interaction.followUp({ content: "No results were found!" });
	}

}