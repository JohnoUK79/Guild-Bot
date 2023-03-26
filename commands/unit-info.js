const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unit-info")
        .setDescription("Show Unit Information!")
        .addStringOption(option =>
			option.setName('camp')
				.setDescription('The city!')
				.setRequired(true)
				.addChoices(
                    { name: 'Liberty', value: 'Liberty' },
					{ name: 'Martyrs Watch', value: 'MartyrsW' },
					{ name: 'Vanguard', value: 'Vanguard' },
          ))
        .addStringOption(option => 
            option.setName('troop')
                .setDescription('Please select the unit type.')
                .addChoices(
                    { name: 'Infantry', value: 'Infantry' },
					{ name: 'Medium Tanks', value: 'MediumTanks' },
					{ name: 'Heavy Tanks', value: 'HeavyTanks' },
                    { name: 'Tank Hunters', value: 'TankHunters' },
					{ name: 'Super Heavy Tanks', value: 'SuperHeavyTanks' },
                    { name: 'Anti Tank Guns', value: 'AntiTankGuns' },
					{ name: 'Fighters', value: 'Fighters' },
					{ name: 'Bombers', value: 'Bombers' },
                )
                .setRequired(true)),

    async execute(interaction) {
        const camp = interaction.options.getString('camp');
        const troop = interaction.options.getString('troop');

        await interaction.guild.members.fetch()
        guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
        let image = ''
        const unitInfo = await sql.Execute(`SELECT * FROM units WHERE CAMP = '${camp}' AND Unit_Type = '${troop}' ORDER BY Unit_Level DESC`)
        if (!unitInfo[0]){
            let image = 'NotFound'
        } else {
            let image = unitInfo[0].Camp
        }
        console.log(image)
        const unitInfoEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Troop Information`)
            .setURL('http://www.phfamily.co.uk/invites.php')
            .setThumbnail(interaction.user.displayAvatarURL())
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setDescription(`**${unitInfo[0].Camp} ${unitInfo[0].Unit_Type}**`)
            .setThumbnail(guildIcon)
            .setImage(`http://phfamily.co.uk/img/Warpath/${unitInfo[0].Camp}.png`)
            .setTimestamp()
            .setFooter({ text: `${unitInfo[0].Camp} - ${unitInfo[0].Unit_Type}.`, iconURL: `${guildIcon}` });
            
        console.log(`${guildName} Member Cache: ${interaction.guild.members.cache.size}`)

        for (let i = 0; i < 25 && unitInfo[i]; i++) unitInfoEmbed.addFields(
            { name: `${unitInfo[i].Unit_Level} ${unitInfo[i].Unit_Name}`, value: `**Firepower:** ${unitInfo[i].Firepower} **HP:** ${unitInfo[i].HP} **Speed:** ${unitInfo[i].Speed}` })

        await interaction.reply({
            ephemeral: false,
            embeds: [unitInfoEmbed],
        });

    },
};
