const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sql = require("../config/Database");
const timestamp = require('../config/timestamp');
setDate = timestamp.UTCdefault()

module.exports = {
    data: new SlashCommandBuilder()
        //.setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)

        .setName("unit-select")
        .setDescription("Show Unit Information!")
        .addStringOption(option => 
            option.setName('troop')
                .setDescription('Please select the unit type.')
                .addChoices(
                    { name: 'Infantry', value: 'Infantry' },
					{ name: 'Medium Tanks', value: 'MediumTanks' },
					{ name: 'Heavy Tanks', value: 'HeavyTanks' },
                    { name: 'Tank Hunters', value: 'TankHunters' },
					{ name: 'Super Heavy Tanks', value: 'SuperHeavyTanks' },
                    //{ name: 'Anti Tank Guns', value: 'AntiTankGuns' },
					{ name: 'Fighters', value: 'Fighters' },
					{ name: 'Bombers', value: 'Bombers' },
                )
                .setRequired(true)),

    async execute(interaction) {
        const troop = interaction.options.getString('troop');
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        await interaction.guild.members.fetch()
        guildIcon = interaction.member.guild.iconURL();
		guildName = interaction.member.guild.name
        const unitSelectEmbed = new EmbedBuilder()
        const unitInfo = await sql.Execute(`SELECT * FROM playerunits WHERE discord_id = '${interaction.member.id}' AND Unit_Type = '${troop}' ORDER BY Unit_Level DESC`)
        console.log(unitInfo)
        if (!unitInfo[0]) {
            unitSelectEmbed
                .setColor('#0099ff')
                .setTitle(`**Unit Unavailable**`)
                .setURL('http://www.phfamily.co.uk/invites.php')
                .setThumbnail(interaction.user.displayAvatarURL())
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
                .setDescription(`You have not unlocked this **Unit**.`)
                .setThumbnail(guildIcon)
                .setTimestamp()
                .setFooter({ text: `Buy Unit - Coming Soon.`, iconURL: `${guildIcon}` });
            return interaction.reply({ embeds: [unitSelectEmbed]})
        }
        const unitSelect = await sql.Execute(`SELECT * FROM units WHERE Camp = '${unitInfo[0].camp}' AND Unit_Type = '${unitInfo[0].unit_type}' AND Unit_Level = '${unitInfo[0].unit_level}'`)

        let officer = Level[0].officer_level 
        if (officer === 0) {officer = 1}
        const currentFirepower = (unitSelect[0].Firepower * officer)

        let base = Level[0].base_level 
        if (base === 0) {base = 1}
        const currentHP = (unitSelect[0].HP * base)
        console.log(currentHP)
        unitSelectEmbed
            .setColor('#0099ff')
            .setTitle(`Troop Information`)
            .setURL('http://www.phfamily.co.uk/invites.php')
            .setThumbnail(interaction.user.displayAvatarURL())
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setDescription(`**${unitInfo[0].camp} ${unitInfo[0].unit_type}**`)
            .setThumbnail(guildIcon)
            .setImage(`http://phfamily.co.uk/img/Warpath/${unitInfo[0].Camp}.png`)
            .setTimestamp()
            .setFooter({ text: `${unitInfo[0].camp} - ${unitInfo[0].unit_type}.`, iconURL: `${guildIcon}` });
            
        console.log(`${guildName} Member Cache: ${interaction.guild.members.cache.size}`)
        console.log(unitInfo)
        unitSelectEmbed
            .addFields(
            { name: `Name: ${unitSelect[0].Unit_Name}`, value: `**Firepower:** ${currentFirepower.toLocaleString()} **HP:** ${currentHP.toLocaleString()} **Speed:** ${unitSelect[0].Speed}` }
            )

        await interaction.reply({
            ephemeral: false,
            embeds: [unitSelectEmbed],
        });

    },
};
