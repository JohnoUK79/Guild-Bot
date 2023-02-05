const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gold')
		.setDescription('Find CITIES to open golden coupon for a given CAMP on a specific DAY.')
		.addStringOption(option =>
			option.setName('city')
				.setDescription('The city!')
				.setRequired(true)
				.addChoices(
					{ name: 'Ankara', value: 'Ankara' },
					{ name: 'Atlanta', value: 'Atlanta' },
					{ name: 'Birminghan', value: 'Birminghan' },
					{ name: 'Brussels', value: 'Brussels' },
					{ name: 'Cairo', value: 'Cairo' },
					{ name: 'Copenhagen', value: 'Copenhagen' },
					{ name: 'Detroit', value: 'Detroit' },
					{ name: 'Edinburgh', value: 'Edinburgh' },
					{ name: 'Houston', value: 'Houston' },
					{ name: 'Leningrad', value: 'Leningrad' },
					{ name: 'Los Angeles', value: 'Los Angeles' },
					{ name: 'Madrid', value: 'Madrid' },
					{ name: 'Mexico City', value: 'Mexico City' },
					{ name: 'Naples', value: 'Naples' },
					{ name: 'Sao Paulo', value: 'Sao Paulo' },
					{ name: 'Seattle', value: 'Seattle' },
					{ name: 'Stalingrad', value: 'Stalingrad' },
					{ name: 'Vienna', value: 'Vienna' },
					{ name: 'Washington', value: 'Washington' },
					
				))
		.addStringOption(option => 
			option.setName('date')
				.setDescription('date must be MM/DD/YYYY or MM/DD/YY')
				.setRequired(true)
			),
	async execute(interaction) {
			const ban = require('../data/ban');
			const servers = require('../data/servers');
			const server = interaction.guild.id //need guild ID
			const userID = interaction.user.id //need user ID
			const channelID = interaction.channelId //Need channel ID
			if( await ban.banned(userID, channelID) ) return;
			
			const cityName = interaction.options.getString('city');
			const when = interaction.options.getString('date');
			const whenDate = new Date(when);

			const isValidDate = date => date instanceof Date && !isNaN(date);
			const dayOfYear = date => Math.floor((date - new Date(2021, 0, 0)) / 1000 / 60 / 60 / 24);
			const citiesGold = require('../data/citiesGold')

			const CITIESGOLD = servers[server].citiesGold;  

			const campName = {
			'?': 'Unknown',
			'M': 'Martyr',
			'L': 'Liberty',
			'V': 'Vanguard'
			};

			if(!isValidDate(whenDate)) {
				interaction.reply( {content: 'Date must be in the format MM/DD/YYYY', emphemeral: true});
			}
			else {
			const doY = dayOfYear(whenDate);
			const col = doY % 3;
			const camp = campName[CITIESGOLD[cityName][col]];
				interaction.reply ( { content: `Hey <@!${userID}>!\nGold coupon in ${cityName} for the ${when} is **${camp}**`});
			}
				}}

