const sql = require("../config/Database");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
    baseUpgrade: async function (interaction) {
        const guildIcon = interaction.member.guild.iconURL();
		const guildName = interaction.guild.name
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
		const wallet = Level[0].war_coins
		const bank = Level[0].war_chest
        const bankLevel = Level[0].chest_level
		const baseLevel = Level[0].base_level
		const cost = (baseLevel + 1) * 25000
        const upgradeButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("bank")
                .setLabel('War-Chest')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("base")
                .setLabel('War-Base')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("officer")
                .setLabel('Officer')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("troop")
                .setLabel('Unit')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("profile")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
            )
		const upgradeBase = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("buybase")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Cancel')
                    .setStyle(ButtonStyle.Danger),
            )
            const upgradeEmbed = new EmbedBuilder();
            upgradeEmbed
                .setColor('#ff5b05')
                .setThumbnail(guildIcon)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.addFields(
					{ name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
					{ name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
					{ name: `Current Level:`, value: `${baseLevel}`, inline: true }, 
					{ name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
				)
				.setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});
	return interaction.update({embeds: [upgradeEmbed], components: [upgradeBase]})

    },
    buyBank: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
		const upgradeBankEmbed = new EmbedBuilder();
        const upgradeButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("bank")
                .setLabel('War-Chest')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("base")
                .setLabel('War-Base')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("officer")
                .setLabel('Officer')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("troop")
                .setLabel('Unit')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("profile")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
            )
		const upgradeBankButtons = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId("buybank")
				.setLabel('Upgrade')
				.setStyle(ButtonStyle.Success),
			new ButtonBuilder()
				.setCustomId("cancel")
				.setLabel('Cancel')
				.setStyle(ButtonStyle.Danger),
		)

        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name	
        const wallet = Level[0].war_coins
        const bank = Level[0].war_chest
        const baseLevel = Level[0].base_level
        const bankLevel = Level[0].chest_level
        const cost = (bankLevel + 1) * 10000
        if (bankLevel > baseLevel) {
            console.log(`Base Upgrade Needed`),
            upgradeBankEmbed
                .setColor('#ff5b05')
                .setThumbnail(guildIcon)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setDescription(`${interaction.member}, You need to upgrade your **War-Base** for this upgrade.`)
                .addFields(
                        { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
                        { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                        { name: `Bank Level:`, value: `${bankLevel}`, inline: true }, 
                        { name: `Base Level:`, value: `${baseLevel}`, inline: true },
                    )
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

        return interaction.update({embeds: [upgradeBankEmbed], components: [upgradeButtons]})
        }
        if (cost > wallet) {
            console.log(`No Money`),
            difference = cost - wallet
            upgradeBankEmbed
                .setColor('#ff5b05')
                .setThumbnail(guildIcon)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setDescription(`${interaction.member}, You do not have enough **War-Coins** for this upgrade.\nYou are **$${difference.toLocaleString()} War-Coins short**!\nTry withdrawing from your **War-Chest**!`)
                .addFields(
                        { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
                        { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                        { name: `Current Level:`, value: `${bankLevel}`, inline: true }, 
                        { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
                    )
                    .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

        return interaction.update({embeds: [upgradeBankEmbed], components: [upgradeBankButtons]})	
        }
        const newWallet = wallet - cost
        const newBank = bankLevel + 1
        upgradeBankEmbed
        .setColor('#ff5b05')
        .setThumbnail(guildIcon)
        .setTimestamp()
        .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
		.setDescription(`**${interaction.member}, War-Chest Upgrade Successful**`)
			.addFields(
				{ name: `War-Coins:`, value: `$${newWallet.toLocaleString()}`, inline: true }, 
				{ name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
				{ name: `New Level:`, value: `${newBank}`, inline: true }, 
			)
		.setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

    const bankUpgrade = await sql.Execute(`UPDATE levels SET war_coins = ${newWallet}, chest_level = '${newBank}' WHERE discord_id = '${interaction.member.id}'`)
    console.log(`Bank: ${bankUpgrade.info}`)
    return interaction.update({embeds: [upgradeBankEmbed], components: [upgradeButtons]})	
    },
    buyBase: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const upgradeBaseEmbed = new EmbedBuilder();
        const upgradeButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("bank")
                .setLabel('War-Chest')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("base")
                .setLabel('War-Base')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("officer")
                .setLabel('Officer')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("troop")
                .setLabel('Unit')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("profile")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
            )
        const upgradeBaseButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("buybase")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Cancel')
                    .setStyle(ButtonStyle.Danger),
            )
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name	
        const wallet = Level[0].war_coins
        const bank = Level[0].war_chest
        const baseLevel = Level[0].base_level
        const bankLevel = Level[0].chest_level
        const cost = (baseLevel + 1) * 25000
        if (baseLevel > bankLevel ) {
            console.log(`Chest Upgrade Needed`),
            upgradeBaseEmbed
                .setColor('#ff5b05')
                .setThumbnail(guildIcon)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setDescription(`${interaction.member}, You need to upgrade your **War-Chest** for this upgrade.`)
                .addFields(
                        { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
                        { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                        { name: `Base Level:`, value: `${baseLevel}`, inline: true },
                        { name: `Bank Level:`, value: `${bankLevel}`, inline: true }, 
                    )
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

        return interaction.update({embeds: [upgradeBaseEmbed], components: [upgradeButtons]})
        }


        if (cost > wallet) {
            console.log(`No Money`),
            difference = cost - wallet
            upgradeBaseEmbed
                .setColor('#ff5b05')
                .setThumbnail(guildIcon)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setDescription(`${interaction.member}, You do not have enough **War-Coins** for this upgrade.\nYou are **$${difference.toLocaleString()} War-Coins short**!\nTry withdrawing from your **War-Chest**!`)
                .addFields(
                    { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
                    { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                    { name: `Current Level:`, value: `${baseLevel}`, inline: true }, 
                    { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
                )
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});
        return interaction.update({embeds: [upgradeBaseEmbed], components: [upgradeBaseButtons]})	
        }
        const newWallet = wallet - cost
        const newBase = baseLevel + 1
        upgradeBaseEmbed
            .setColor('#ff5b05')
            .setThumbnail(guildIcon)
            .setTimestamp()
            .setDescription(`**${interaction.member}, Base Upgrade Successful**`)
            .addFields(
                { name: `War-Coins:`, value: `$${newWallet.toLocaleString()}`, inline: true }, 
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                { name: `New Level:`, value: `${newBase}`, inline: true }, 
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});
    const baseUpgrade = await sql.Execute(`UPDATE levels SET war_coins = ${newWallet}, base_level = '${newBase}' WHERE discord_id = '${interaction.member.id}'`)
    console.log(`Base ${baseUpgrade.info}`)
    return interaction.update({embeds: [upgradeBaseEmbed], components: [upgradeButtons]})	

},
buyOfficer: async function (interaction) {
    const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
    const upgradeOfficerEmbed = new EmbedBuilder();
    const upgradeButtons = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("bank")
            .setLabel('War-Chest')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("base")
            .setLabel('War-Base')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("officer")
            .setLabel('Officer')
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("troop")
            .setLabel('Unit')
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("profile")
            .setLabel('Profile')
            .setStyle(ButtonStyle.Secondary),
        )
    const upgradeOfficerButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("buyofficer")
                .setLabel('Upgrade')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("cancel")
                .setLabel('Cancel')
                .setStyle(ButtonStyle.Danger),
        )
    const guildIcon = interaction.member.guild.iconURL();
    const guildName = interaction.member.guild.name	
    const wallet = Level[0].war_coins
    const bank = Level[0].war_chest
    const officerLevel = Level[0].officer_level
    const baseLevel = Level[0].base_level
    const cost = (officerLevel + 1) * 50000

    if (officerLevel > baseLevel ) {
        console.log(`Base Upgrade Needed`),
        upgradeOfficerEmbed
            .setColor('#ff5b05')
            .setThumbnail(guildIcon)
            .setTimestamp()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            .setDescription(`${interaction.member}, You need to upgrade your **War-Base** for this upgrade.`)
            .addFields(
                    { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
                    { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                    { name: `Base Level:`, value: `${baseLevel}`, inline: true },
                )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

    return interaction.update({embeds: [upgradeOfficerEmbed], components: [upgradeButtons]})
    }


    if (cost > wallet) {
        console.log(`No Money`),
        difference = cost - wallet
        upgradeOfficerEmbed
            .setColor('#ff5b05')
            .setThumbnail(guildIcon)
            .setTimestamp()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            .setDescription(`${interaction.member}, You do not have enough **War-Coins** for this upgrade.\nYou are **$${difference.toLocaleString()} War-Coins** short!\nTry withdrawing from your **War-Chest**!`)
            .addFields(
                { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                { name: `Officer Level:`, value: `${officerLevel}`, inline: true }, 
                { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});
    return interaction.update({embeds: [upgradeOfficerEmbed], components: [upgradeOfficerButtons]})	
    }
    const newWallet = wallet - cost
    const newOfficer = officerLevel + 1
    upgradeOfficerEmbed
        .setColor('#ff5b05')
        .setThumbnail(guildIcon)
        .setTimestamp()
        .setDescription(`**${interaction.member}, Officer Upgrade Successful**`)
        .addFields(
            { name: `War-Coins:`, value: `$${newWallet.toLocaleString()}`, inline: true }, 
            { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
            { name: `New Level:`, value: `${newOfficer}`, inline: true }, 
        )
        .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});
const baseUpgrade = await sql.Execute(`UPDATE levels SET war_coins = ${newWallet}, officer_level = '${newOfficer}' WHERE discord_id = '${interaction.member.id}'`)

return interaction.update({embeds: [upgradeOfficerEmbed], components: [upgradeButtons]})	

},
cancel: async function (interaction) {
    const guildIcon = interaction.member.guild.iconURL();
    const guildName = interaction.member.guild.name	
    const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
    const wallet = Level[0].war_coins
    const bank = Level[0].war_chest
    const upgradeButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("bank")
                .setLabel('War-Chest')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("base")
                .setLabel('War-Base')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("officer")
                .setLabel('Officer')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("troop")
                .setLabel('Unit')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("profile")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
            )
    const upgradeEmbed = new EmbedBuilder();
    upgradeEmbed
        .setColor('#ff5b05')
        .setThumbnail(guildIcon)
        .setTimestamp()
        .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setDescription(`**${interaction.member}, What would you like to upgrade**?`)
        .addFields(
            { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
            { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
        )
        .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});
    return interaction.update({embeds: [upgradeEmbed], components: [upgradeButtons]})

},
chestUpgrade: async function (interaction) {
    const guildIcon = interaction.member.guild.iconURL();
    const setDate = time.default()
    const guildName = interaction.guild.name
    const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
    const wallet = Level[0].war_coins
    const bank = Level[0].war_chest
    const bankLevel = Level[0].chest_level
    const baseLevel = Level[0].base_level
    const cost = (bankLevel + 1) * 10000

    const upgradeChestButtons = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("buybank")
            .setLabel('Upgrade')
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("cancel")
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Danger),
    )



        const upgradeChestEmbed = new EmbedBuilder();
        upgradeChestEmbed
            .setColor('#ff5b05')
            .setThumbnail(guildIcon)
            .setTimestamp()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            .setDescription(`**${interaction.member}, Confirm the upgrade your War-Chest**?`)
            .addFields(
                { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                { name: `Current Level:`, value: `${bankLevel}`, inline: true }, 
                { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

return interaction.update({embeds: [upgradeChestEmbed], components: [upgradeChestButtons]})        
},
officerSelect: async function (interaction) {
    const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
    const selectOfficerEmbed = new EmbedBuilder();
    const selectOfficerButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("cancel")
                .setLabel('Done')
                .setStyle(ButtonStyle.Success),
        )
    const guildIcon = interaction.member.guild.iconURL();
    const guildName = interaction.member.guild.name	
    const Officer = await sql.Execute(`SELECT Officer_Name, Officer_Camp, Skill FROM officers WHERE Officer_Type = 'GROUND'`)
    const officerSelection = Officer[Math.floor(Math.random() * Officer.length)]
    console.log(officerSelection)

    selectOfficerEmbed
        .setColor('#ff5b05')
        .setThumbnail(guildIcon)
        .setTimestamp()
        .setDescription(`**${interaction.member}, Officer Selection Successful**`)
        .addFields(
            { name: `Officer:`, value: `${officerSelection.Officer_Name}`, inline: true }, 
            { name: `Camp:`, value: `${officerSelection.Officer_Camp}`, inline: true },
            { name: `Skill:`, value: `${officerSelection.Skill}`, inline: true }, 
        )
        .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});
    const updateOfficer = await sql.Execute(`UPDATE levels SET officer_name	= '${officerSelection.Officer_Name}', officer_level = '1' WHERE discord_id = '${interaction.member.id}'`)
    console.log(updateOfficer.info)
return interaction.update({embeds: [selectOfficerEmbed], components: [selectOfficerButtons]})	

},
officerUpgrade: async function (interaction) {
    const upgradeOfficerEmbed = new EmbedBuilder();
    const guildIcon = interaction.member.guild.iconURL();
    const guildName = interaction.guild.name
    const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
    const wallet = Level[0].war_coins
    const bank = Level[0].war_chest
    const baseLevel = Level[0].base_level
    const officer = Level[0].officer_name
    const officerLevel = Level[0].officer_level
    const cost = (officerLevel + 1) * 50000

    const upgradeOfficerButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("buyofficer")
                .setLabel('Upgrade')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("cancel")
                .setLabel('Cancel')
                .setStyle(ButtonStyle.Danger),
        )
        const chooseOfficerButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("officerselect")
                .setLabel('Select')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("cancel")
                .setLabel('Cancel')
                .setStyle(ButtonStyle.Danger),
        )
        const upgradeButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("bank")
                .setLabel('War-Chest')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("base")
                .setLabel('War-Base')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("officer")
                .setLabel('Officer')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("troop")
                .setLabel('Unit')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("profile")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
            )

if (baseLevel < 1) {
    upgradeOfficerEmbed
        .setColor('#ff5b05')
        .setThumbnail(guildIcon)
        .setTimestamp()
        .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setDescription(`${interaction.member}, You need to upgrade your **Base** to Select your **Officer**?`)
            .addFields(
                { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                { name: `Base Level:`, value: `${baseLevel}`, inline: true }, 
            )
        .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

    return interaction.update({embeds: [upgradeOfficerEmbed], components: [upgradeButtons]})  
} else
console.log(officer)
    if (officer === undefined) {

    upgradeOfficerEmbed
        .setColor('#ff5b05')
        .setThumbnail(guildIcon)
        .setTimestamp()
        .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
        .setDescription(`**${interaction.member}**, First you need to select your **Officer**!`)
            .addFields(
                { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
            )
        .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

    return interaction.update({embeds: [upgradeOfficerEmbed], components: [chooseOfficerButtons]})        

} else
        upgradeOfficerEmbed
            .setColor('#ff5b05')
            .setThumbnail(guildIcon)
            .setTimestamp()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            .setDescription(`**${interaction.member}, Confirm the upgrade your Officer**?`)
            .addFields(
                { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                { name: `Officer Level:`, value: `${officerLevel}`, inline: true }, 
                { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

return interaction.update({embeds: [upgradeOfficerEmbed], components: [upgradeOfficerButtons]})        
},
unitUpgrade: async function (interaction) {
    const upgradeUnitEmbed = new EmbedBuilder();
    const guildIcon = interaction.member.guild.iconURL();
    const guildName = interaction.guild.name
    const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
    const wallet = Level[0].war_coins
    const bank = Level[0].war_chest
    const unitLevel = Level[0].unit_level
    const officer = Level[0].officer
    const officerLevel = Level[0].officer_level
    const cost = (unitLevel + 1) * 125000

    const upgradeUnitButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("buyunit")
                .setLabel('Upgrade')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("cancel")
                .setLabel('Cancel')
                .setStyle(ButtonStyle.Danger),
        )
        const chooseUnitButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("unitselect")
                .setLabel('Select')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("cancel")
                .setLabel('Cancel')
                .setStyle(ButtonStyle.Danger),
        )
        const upgradeButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("bank")
                .setLabel('War-Chest')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("base")
                .setLabel('War-Base')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("officer")
                .setLabel('Officer')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("troop")
                .setLabel('Unit')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("profile")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
            )

if (officerLevel < 1) {
upgradeUnitEmbed
    .setColor('#ff5b05')
    .setThumbnail(guildIcon)
    .setTimestamp()
    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
    .setDescription(`${interaction.member}, You need to upgrade your **Officer** to Select your **Unit**?`)
        .addFields(
            { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
            { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
            { name: `Unit Level:`, value: `${unitLevel}`, inline: true }, 
        )
    .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

return interaction.update({embeds: [upgradeUnitEmbed], components: [upgradeButtons]})  
} else
if (unitLevel === '0.0') {

upgradeUnitEmbed
    .setColor('#ff5b05')
    .setThumbnail(guildIcon)
    .setTimestamp()
    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
    .setDescription(`**${interaction.member}**, First you need to select your **Unit**!`)
        .addFields(
            { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
            { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
        )
    .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

return interaction.update({embeds: [upgradeUnitEmbed], components: [chooseUnitButtons]})        

} else
        upgradeUnitEmbed
            .setColor('#ff5b05')
            .setThumbnail(guildIcon)
            .setTimestamp()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            .setDescription(`**${interaction.member}, Confirm the upgrade your Unit**?`)
            .addFields(
                { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                { name: `Unit Level:`, value: `${unitLevel}`, inline: true }, 
                { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

return interaction.update({embeds: [upgradeUnitEmbed], components: [upgradeUnitButtons]})        
},
unitSelect: async function (interaction) {
    const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
    const selectUnitEmbed = new EmbedBuilder();
    const selectUnitButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("cancel")
                .setLabel('Done')
                .setStyle(ButtonStyle.Success),
        )
    const guildIcon = interaction.member.guild.iconURL();
    const guildName = interaction.member.guild.name	
    const Unit = await sql.Execute(`SELECT * FROM units WHERE Unit_Level = '4.0'`)
    const unitSelection = Unit[Math.floor(Math.random() * Unit.length)]
    console.log(unitSelection)

    selectUnitEmbed
        .setColor('#ff5b05')
        .setThumbnail(guildIcon)
        .setTimestamp()
        .setDescription(`**${interaction.member}, Unit Selection Successful**`)
        .addFields(
            { name: `Unit Name:`, value: `${unitSelection.Unit_Name}`, inline: true }, 
            { name: `Unit Level:`, value: `${unitSelection.Unit_Level}`, inline: true },
            { name: `Camp:`, value: `${unitSelection.Camp}`, inline: true }, 
            { name: `Unit Type:`, value: `${unitSelection.Unit_Type}`, inline: true },
            { name: `Firepower:`, value: `${unitSelection.Firepower}`, inline: true },
            { name: `HP:`, value: `${unitSelection.HP}`, inline: true },
            { name: `Speed:`, value: `${unitSelection.Speed}`, inline: true },
        )
        .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});
const updateOfficer = await sql.Execute(`UPDATE levels SET Unit_Camp = '${unitSelection.Camp}', Unit_Type = '${unitSelection.Unit_Type}', Unit_Level = '${unitSelection.Unit_Level}' WHERE discord_id = '${interaction.member.id}'`)
console.log(updateOfficer)
return interaction.update({embeds: [selectUnitEmbed], components: [selectUnitButtons]})	
},
buyUnit: async function (interaction) {
    const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
    const upgradeUnitEmbed = new EmbedBuilder();
    const upgradeButtons = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("bank")
            .setLabel('War-Chest')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("base")
            .setLabel('War-Base')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("officer")
            .setLabel('Officer')
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("troop")
            .setLabel('Unit')
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("profile")
            .setLabel('Profile')
            .setStyle(ButtonStyle.Secondary),
        )
    const upgradeUnitButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("buyunit")
                .setLabel('Upgrade')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("cancel")
                .setLabel('Cancel')
                .setStyle(ButtonStyle.Danger),
        )
    const guildIcon = interaction.member.guild.iconURL();
    const guildName = interaction.member.guild.name	
    const camp = Level[0].unit_camp
    const unitType = Level[0].unit_type
    const unitLevel = Level[0].unit_level
    const wallet = Level[0].war_coins
    const bank = Level[0].war_chest
    const officerLevel = Level[0].officer_level
    const cost = (unitLevel + 1) * (125000 * officerLevel)

    if (unitLevel === '9.2') {
        console.log(`Unit Maxed`),
        upgradeUnitEmbed
            .setColor('#ff5b05')
            .setThumbnail(guildIcon)
            .setTimestamp()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            .setDescription(`${interaction.member}, You have already **Maxed** your **${unitType}**.\nUpgrade your **Officer** to increase your **Battle Rewards**!\nUpgrade your **War-Base** to increase your **Unit Strength**!`)
            .addFields(
                    { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
                    { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                    { name: `Unit Level:`, value: `${unitLevel}`, inline: true },
                )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

    return interaction.update({embeds: [upgradeUnitEmbed], components: [upgradeButtons]})
    }

    if (unitLevel > officerLevel ) {
        console.log(`Officer Upgrade Needed`),
        upgradeUnitEmbed
            .setColor('#ff5b05')
            .setThumbnail(guildIcon)
            .setTimestamp()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            .setDescription(`${interaction.member}, You need to upgrade your **Officer** for this upgrade.`)
            .addFields(
                    { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
                    { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                    { name: `Officer Level:`, value: `${officerLevel}`, inline: true }, 
                    { name: `Unit Level:`, value: `${unitLevel}`, inline: true },
                )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

    return interaction.update({embeds: [upgradeUnitEmbed], components: [upgradeButtons]})
    } else


    if (cost > wallet) {
        console.log(`No Money`),
        difference = cost - wallet
        upgradeUnitEmbed
            .setColor('#ff5b05')
            .setThumbnail(guildIcon)
            .setTimestamp()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            .setDescription(`${interaction.member}, You do not have enough **War-Coins** for this upgrade.\nYou are **$${difference.toLocaleString()} War-Coins** short!\nTry withdrawing from your **War-Chest**!`)
            .addFields(
                { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true }, 
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                { name: `Unit Level:`, value: `${unitLevel}`, inline: true }, 
                { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});
    return interaction.update({embeds: [upgradeUnitEmbed], components: [upgradeUnitButtons]})	
    }
    const newWallet = (wallet - cost)
    const newUnit = await sql.Execute(`SELECT * FROM units WHERE Camp = '${camp}' AND Unit_Type = '${unitType}' AND Unit_Level > '${unitLevel}'`)
    console.log(camp, unitType, unitLevel)
    const newLevel = newUnit[0].Unit_Level
    const newName = newUnit[0].Unit_Name
    const newFirepower = newUnit[0].Firepower
    const newHP = newUnit[0].HP
    const newSpeed = newUnit[0].Speed


    upgradeUnitEmbed
        .setColor('#ff5b05')
        .setThumbnail(guildIcon)
        .setTimestamp()
        .setDescription(`**${interaction.member}, Unit Upgrade Successful**`)
        .addFields(
            { name: `War-Coins:`, value: `$${newWallet.toLocaleString()}`, inline: true }, 
            { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
            { name: `New Level:`, value: `${newUnit[0].Unit_Level}`, inline: true }, 
        )
        .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});
const unitUpgrade = await sql.Execute(`UPDATE levels SET War_Coins = ${newWallet}, Unit_Level = '${newLevel}' WHERE discord_id = '${interaction.member.id}'`)
console.log(unitUpgrade)
return interaction.update({embeds: [upgradeUnitEmbed], components: [upgradeButtons]})
},
profile: async function (interaction) {
    const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
    const profileEmbed = new EmbedBuilder();
    const profileButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("cancel")
                .setLabel('Done')
                .setStyle(ButtonStyle.Success),
        )
    const guildIcon = interaction.member.guild.iconURL();
    const guildName = interaction.member.guild.name	
    let officer = Level[0].officer_name
    const officerLevel = Level[0].officer_level
    if (officer === '') {let officer = 'No Officer Chosen'}
    let unitType = Level[0].Unit_Type
    console.log(unitType)
    if (unitType !== '') {let unit = 'No Unit Trained'}
    console.log(unitType)

    
    profileEmbed
        .setColor('#ff5b05')
        .setThumbnail(guildIcon)
        .setTimestamp()
        .setDescription(`**${interaction.member}'s Profile**`)
        .addFields(
            { name: `War-Coins:`, value: `$${Level[0].war_coins.toLocaleString()}`, inline: true }, 
            { name: `War-Chest:`, value: `$${Level[0].war_chest.toLocaleString()}`, inline: true }, 
            { name: `War-Chest Level:`, value: `${Level[0].chest_level.toLocaleString()}`, inline: true }, 
            { name: `Base Level:`, value: `${Level[0].base_level}`, inline: true }, 
            { name: `Officer:`, value: `${officer}`, inline: true }, 
            { name: `Officer Level:`, value: `${officerLevel}`, inline: true },
            //{ name: `Unit:`, value: `${unit}`, inline: true }, 
            //{ name: `Unit Level:`, value: `${Level[0].unit_level}`, inline: true }, 

        )
        .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

        
return interaction.update({empheral: true, embeds: [profileEmbed], components: [profileButtons]})	

}
}