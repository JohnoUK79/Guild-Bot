const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gold-camp')
		.setDescription('Find CITIES to open golden coupon for a given CAMP on a specific DAY.')
		.addStringOption(option =>
			option.setName('camp')
				.setDescription('The city!')
				.setRequired(true)
				.addChoices(
          { name: 'Liberty', value: 'L' },
					{ name: 'Martyr', value: 'M' },
					{ name: 'Vanguard', value: 'V' },
          ))
        .addStringOption(option => 
            option.setName('date')
            .setDescription('date must be MM/DD/YYYY or MM/DD/YY')
            .setRequired(true)),
          async execute(interaction) {
          const ban = require('../data/ban');
					const servers = require('../data/servers');
					const server = interaction.guild.id //need guild ID
					const userID = interaction.user.id //need user ID
					const channelID = interaction.channelId //Need channel ID
					if( await ban.banned(userID, channelID) ) return;
					
                    const campName = interaction.options.getString('camp');
                    const when = interaction.options.getString('date');
                    const whenDate = new Date(when);
                    
                    const isValidDate = date => date instanceof Date && !isNaN(date);
                    const dayOfYear = date => Math.floor((date - new Date(2021, 0, 0)) / 1000 / 60 / 60 / 24);
                    
                    const CITIESGOLD = servers[server].citiesGold;
                    
                    const campAbv2Name = {
                      'M': 'Martyr',
                      'L': 'Liberty',
                      'V': 'Vanguard'
                    };
                    
                    if(!isValidDate(whenDate)) {
                      await interaction.reply ({content: `date must be MM/DD/YYYY`, empheral: false } );
                    }
                    else {
                      const doY = dayOfYear(whenDate);
                      const col = doY % 3;
                      
                      const citiesList = Object.keys(CITIESGOLD);
                      const citiesForCampAtDate = citiesList
                                                  .map( city => Object({
                                                    'city': city,
                                                    'camp': CITIESGOLD[city][col]
                                                  }))
                                                  .filter( cO => cO.camp === campName )
                                                  .map( cO => cO.city )
                                                  .join(', ');
                      
                      await interaction.reply ({content: [
                          `Hey <@!${userID}>!`, 
                          `Cities to open ${campAbv2Name[campName]}'s golden coupon the ${when} are: ${citiesForCampAtDate}`
                        ].join('\n')
                      });
                    }
                }
            }
            