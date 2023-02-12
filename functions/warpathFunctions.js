const sql = require("../config/Database");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
    baseUpgrade: async function (interaction) {
        const guildIcon = interaction.member.guild.iconURL();
		const guildName = interaction.guild.name
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
		const wallet = Level[0].war_coins
		const bank = Level[0].war_chest
		const baseLevel = Level[0].base_level
		const cost = (baseLevel + 1) * 25000
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
		const upgradeBankEmbed = new EmbedBuilder();
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

        return interaction.update({embeds: [upgradeBankEmbed], components: [upgradeBankButtons]})
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

    return interaction.update({embeds: [upgradeBankEmbed], components: [upgradeBankButtons]})	
    },
    buyBase: async function (interaction) {
        const upgradeBaseEmbed = new EmbedBuilder();
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

        return interaction.update({embeds: [upgradeBaseEmbed], components: [upgradeBaseButtons]})
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

    return interaction.update({embeds: [upgradeBaseEmbed], components: [upgradeBaseButtons]})	

},
buyOfficer: async function (interaction) {
    const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
    const upgradeOfficerEmbed = new EmbedBuilder();
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
    const baseLevel = Level[0].base_level
    const officer = Level[0].officer
    const officerLevel = Level[0].officer_level
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
                    { name: `Officer Level:`, value: `${officerLevel}`, inline: true }, 
                )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}`});

    return interaction.update({embeds: [upgradeOfficerEmbed], components: [upgradeOfficerButtons]})
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

return interaction.update({embeds: [upgradeOfficerEmbed], components: [upgradeOfficerButtons]})	

},
cancel: async function (interaction) {
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
                .setCustomId("reset")
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
    console.log(Officer)

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
const updateOfficer = await sql.Execute(`UPDATE levels SET officer = '${officerSelection.Officer_Name}' WHERE discord_id = '${interaction.member.id}'`)

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
    const officer = Level[0].officer
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
                .setCustomId("reset")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
            )

if (baseLevel < 2) {
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
if (!officer) {

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
}
}