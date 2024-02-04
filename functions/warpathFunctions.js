const sql = require("../config/Database");
const { GUILD_ID } = require('../config.json')
const { Colours } = require('../data/colours')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, AttachmentBuilder } = require('discord.js');
module.exports = {
    baseUpgrade: async function (interaction) {
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.guild.name
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const warbase = `http://battle-bot.com/img/war-base.jpg`
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })

        const wallet = Level[0].war_coins
        const bank = Level[0].war_chest
        const baseLevel = Level[0].base_level
        const cost = (baseLevel + 1) * 10000
        let CampColour = Colours.Black
        if (Level[0].unit_camp === 'Vanguard') {
            CampColour = Colours.Vanguard
        }
        if (Level[0].unit_camp === 'Liberty') {
            CampColour = Colours.Liberty
        }
        if (Level[0].unit_camp === 'MartyrsW') {
            CampColour = Colours.MartyrsW
        }
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
                    .setLabel('Confirm Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Cancel Upgrade')
                    .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId("profile")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
            )
        const upgradeEmbed = new EmbedBuilder();
        upgradeEmbed
            .setColor(CampColour)
            .setThumbnail(playerThumbnail)
            .setTimestamp()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
            .addFields(
                { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                { name: `Current Level:`, value: `${baseLevel}`, inline: true },
                { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
        return interaction.update({ embeds: [upgradeEmbed], components: [upgradeBase], files: [playerImage] })
    },
    buyBank: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const warchest = `http://battle-bot.com/img/war-chest.jpg`
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })

        let CampColour = Colours.Black
        if (Level[0].unit_camp === 'Vanguard') {
            CampColour = Colours.VanguardBoost
        }
        if (Level[0].unit_camp === 'Liberty') {
            CampColour = Colours.LibertyBoost
        }
        if (Level[0].unit_camp === 'MartyrsW') {
            CampColour = Colours.MartyrsWBoost
        }
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
                    .setLabel('Confirm Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Cancel Upgrade')
                    .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId("profile")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
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
                    .setColor(CampColour)
                    .setThumbnail(playerThumbnail)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`${interaction.member}, You need to upgrade your **War-Base** for this upgrade.`)
                    .addFields(
                        { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                        { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                        { name: `Bank Level:`, value: `${bankLevel}`, inline: true },
                        { name: `Base Level:`, value: `${baseLevel}`, inline: true },
                    )
                    .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

            return interaction.update({ embeds: [upgradeBankEmbed], components: [upgradeButtons], files: [playerImage] })
        }
        if (cost > wallet) {
            console.log(`No Money`),
                difference = cost - wallet
            upgradeBankEmbed
                .setColor(CampColour)
                .setThumbnail(playerThumbnail)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setDescription(`${interaction.member}, You do not have enough **War-Coins** for this upgrade.\nYou are **$${difference.toLocaleString()} War-Coins short**!\nTry withdrawing from your **War-Chest**!`)
                .addFields(
                    { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                    { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                    { name: `Current Level:`, value: `${bankLevel}`, inline: true },
                    { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
                )
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

            return interaction.update({ embeds: [upgradeBankEmbed], components: [upgradeBankButtons], files: [playerImage] })
        }
        const newWallet = wallet - cost
        const newBank = bankLevel + 1
        upgradeBankEmbed
            .setColor(CampColour)
            .setThumbnail(playerThumbnail)
            .setTimestamp()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
            .setDescription(`**${interaction.member}, War-Chest Upgrade Successful**`)
            .addFields(
                { name: `War-Coins:`, value: `$${newWallet.toLocaleString()}`, inline: true },
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                { name: `New Level:`, value: `${newBank}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
        const bankUpgrade = await sql.Execute(`UPDATE levels SET war_coins = ${newWallet}, chest_level = '${newBank}' WHERE discord_id = '${interaction.member.id}'`)
        console.log(`Bank: ${bankUpgrade.info}`)
        return interaction.update({ embeds: [upgradeBankEmbed], components: [upgradeButtons], files: [playerImage] })
    },
    buyBase: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const warbase = `http://battle-bot.com/img/war-base.jpg`
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })

        let CampColour = Colours.Black
        if (Level[0].unit_camp === 'Vanguard') {
            CampColour = Colours.VanguardBoost
        }
        if (Level[0].unit_camp === 'Liberty') {
            CampColour = Colours.LibertyBoost
        }
        if (Level[0].unit_camp === 'MartyrsW') {
            CampColour = Colours.MartyrsWBoost
        }
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
                    .setLabel('Confirm Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Cancel Upgrade')
                    .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId("profile")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
            )
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name
        const wallet = Level[0].war_coins
        const bank = Level[0].war_chest
        const baseLevel = Level[0].base_level
        const bankLevel = Level[0].chest_level
        const cost = (baseLevel + 1) * 25000
        if (baseLevel > bankLevel) {
            console.log(`Chest Upgrade Needed`),
                upgradeBaseEmbed
                    .setColor(CampColour)
                    .setThumbnail(playerThumbnail)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`${interaction.member}, You need to upgrade your **War-Chest** for this upgrade.`)
                    .addFields(
                        { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                        { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                        { name: `Base Level:`, value: `${baseLevel}`, inline: true },
                        { name: `Bank Level:`, value: `${bankLevel}`, inline: true },
                    )
                    .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
            return interaction.update({ embeds: [upgradeBaseEmbed], components: [upgradeButtons], files: [playerImage] })
        }


        if (cost > wallet) {
            console.log(`No Money`),
                difference = cost - wallet
            upgradeBaseEmbed
                .setColor(CampColour)
                .setThumbnail(playerThumbnail)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setDescription(`${interaction.member}, You do not have enough **War-Coins** for this upgrade.\nYou are **$${difference.toLocaleString()} War-Coins short**!\nTry withdrawing from your **War-Chest**!`)
                .addFields(
                    { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                    { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                    { name: `Current Level:`, value: `${baseLevel}`, inline: true },
                    { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
                )
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
            return interaction.update({ embeds: [upgradeBaseEmbed], components: [upgradeBaseButtons], files: [playerImage] })
        }
        const newWallet = wallet - cost
        const newBase = baseLevel + 1
        upgradeBaseEmbed
            .setColor(CampColour)
            .setThumbnail(playerThumbnail)
            .setTimestamp()
            .setDescription(`**${interaction.member}, Base Upgrade Successful**`)
            .addFields(
                { name: `War-Coins:`, value: `$${newWallet.toLocaleString()}`, inline: true },
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                { name: `New Level:`, value: `${newBase}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
        const baseUpgrade = await sql.Execute(`UPDATE levels SET war_coins = ${newWallet}, base_level = '${newBase}' WHERE discord_id = '${interaction.member.id}'`)
        console.log(`Base ${baseUpgrade.info}`)
        return interaction.update({ embeds: [upgradeBaseEmbed], components: [upgradeButtons], files: [playerImage] })

    },
    buyOfficer: async function (interaction) {
        const GOT = `http://battle-bot.com/img/GeneralDeath.png`
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })

        let CampColour = Colours.Black
        if (Level[0].unit_camp === 'Vanguard') {
            CampColour = Colours.VanguardBoost
        }
        if (Level[0].unit_camp === 'Liberty') {
            CampColour = Colours.LibertyBoost
        }
        if (Level[0].unit_camp === 'MartyrsW') {
            CampColour = Colours.MartyrsWBoost
        }
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
                    .setLabel('Confirm Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Cancel Upgrade')
                    .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId("profile")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
            )
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name
        const wallet = Level[0].war_coins
        const bank = Level[0].war_chest
        const officerLevel = Level[0].officer_level
        const baseLevel = Level[0].base_level
        const cost = (officerLevel + 1) * 50000

        if (officerLevel > baseLevel) {
            console.log(`Base Upgrade Needed`),
                upgradeOfficerEmbed
                    .setColor(CampColour)
                    .setThumbnail(playerThumbnail)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`${interaction.member}, You need to upgrade your **War-Base** for this upgrade.`)
                    .addFields(
                        { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                        { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                        { name: `Base Level:`, value: `${baseLevel}`, inline: true },
                    )
                    .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
            return interaction.update({ embeds: [upgradeOfficerEmbed], components: [upgradeButtons], files: [playerImage] })
        }


        if (cost > wallet) {
            console.log(`No Money`),
                difference = cost - wallet
            upgradeOfficerEmbed
                .setColor(CampColour)
                .setThumbnail(playerThumbnail)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setDescription(`${interaction.member}, You do not have enough **War-Coins** for this upgrade.\nYou are **$${difference.toLocaleString()} War-Coins** short!\nTry withdrawing from your **War-Chest**!`)
                .addFields(
                    { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                    { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                    { name: `Officer Level:`, value: `${officerLevel}`, inline: true },
                    { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
                )
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
            return interaction.update({ embeds: [upgradeOfficerEmbed], components: [upgradeOfficerButtons], files: [playerImage] })
        }
        const newWallet = wallet - cost
        const newOfficer = officerLevel + 1
        upgradeOfficerEmbed
            .setColor(CampColour)
            .setThumbnail(playerThumbnail)
            .setTimestamp()
            .setDescription(`**${interaction.member}, Officer Upgrade Successful**`)
            .addFields(
                { name: `War-Coins:`, value: `$${newWallet.toLocaleString()}`, inline: true },
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                { name: `New Level:`, value: `${newOfficer}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

            const playerOfficerUpgrade = await sql.Execute(`UPDATE playerofficers SET Officer_Level = '${newOfficer}' WHERE Discord_ID = '${interaction.member.id}' AND Officer_Name = '${Level[0].officer_name}'`)
            const officerUpgrade = await sql.Execute(`UPDATE levels SET war_coins = ${newWallet}, officer_level = '${newOfficer}' WHERE discord_id = '${interaction.member.id}'`)
            console.log(`Update Player Officer: ${playerOfficerUpgrade.info}`)
            console.log(`Officer Upgrade: ${officerUpgrade.info}`)

        return interaction.update({ embeds: [upgradeOfficerEmbed], components: [upgradeButtons], files: [playerImage] })

    },
    buyOfficer10: async function (interaction) {
        const GOT = `http://battle-bot.com/img/GeneralDeath.png`
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })

        let CampColour = Colours.Black
        if (Level[0].unit_camp === 'Vanguard') {
            CampColour = Colours.VanguardBoost
        }
        if (Level[0].unit_camp === 'Liberty') {
            CampColour = Colours.LibertyBoost
        }
        if (Level[0].unit_camp === 'MartyrsW') {
            CampColour = Colours.MartyrsWBoost
        }
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
                    .setCustomId("buyofficer10")
                    .setLabel('Upgrade x 10')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Cancel Upgrade')
                    .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId("profile")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
            )
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name
        const wallet = Level[0].war_coins
        const bank = Level[0].war_chest
        const officerLevel = Level[0].officer_level
        const baseLevel = Level[0].base_level
        const price = 10 * 50000
        const cost = price * officerLevel

        if (officerLevel + 10 > baseLevel) {
            console.log(`Base Upgrade Needed`),
                upgradeOfficerEmbed
                    .setColor(CampColour)
                    .setThumbnail(playerThumbnail)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`${interaction.member}, You need to upgrade your **War-Base** for this upgrade.`)
                    .addFields(
                        { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                        { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                        { name: `Base Level:`, value: `${baseLevel}`, inline: true },
                    )
                    .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
            return interaction.update({ embeds: [upgradeOfficerEmbed], components: [upgradeButtons], files: [playerImage] })
        }


        if (cost > wallet) {
            console.log(`No Money`),
                difference = cost - wallet
            upgradeOfficerEmbed
                .setColor(CampColour)
                .setThumbnail(playerThumbnail)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setDescription(`${interaction.member}, You do not have enough **War-Coins** for this upgrade.\nYou are **$${difference.toLocaleString()} War-Coins** short!\nTry withdrawing from your **War-Chest**!`)
                .addFields(
                    { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                    { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                    { name: `Officer Level:`, value: `${officerLevel}`, inline: true },
                    { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
                )
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
            return interaction.update({ embeds: [upgradeOfficerEmbed], components: [upgradeOfficerButtons], files: [playerImage] })
        }
        const newWallet = wallet - cost
        const newOfficer = officerLevel + 10
        upgradeOfficerEmbed
            .setColor(CampColour)
            .setThumbnail(playerThumbnail)
            .setTimestamp()
            .setDescription(`**${interaction.member}, Officer Upgrade Successful**`)
            .addFields(
                { name: `War-Coins:`, value: `$${newWallet.toLocaleString()}`, inline: true },
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                { name: `New Level:`, value: `${newOfficer}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

            const playerOfficerUpgrade = await sql.Execute(`UPDATE playerofficers SET Officer_Level = '${newOfficer}' WHERE Discord_ID = '${interaction.member.id}' AND Officer_Name = '${Level[0].officer_name}'`)
            const officerUpgrade = await sql.Execute(`UPDATE levels SET war_coins = ${newWallet}, officer_level = '${newOfficer}' WHERE discord_id = '${interaction.member.id}'`)
            console.log(`Update Player Officer: ${playerOfficerUpgrade.info}`)
            console.log(`Officer Upgrade: ${officerUpgrade.info}`)

        return interaction.update({ embeds: [upgradeOfficerEmbed], components: [upgradeButtons], files: [playerImage] })

    },
    cancel: async function (interaction) {
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })
        const link = `http://battle-bot.com/img/${image}`
        let CampColour = Colours.Black
        if (Level[0].unit_camp === 'Vanguard') {
            CampColour = Colours.VanguardBoost
        }
        if (Level[0].unit_camp === 'Liberty') {
            CampColour = Colours.LibertyBoost
        }
        if (Level[0].unit_camp === 'MartyrsW') {
            CampColour = Colours.MartyrsWBoost
        }
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
            .setColor(CampColour)
            .setThumbnail(playerThumbnail)
            .setTimestamp()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
            .setDescription(`**${interaction.member}, What would you like to upgrade**?`)
            .addFields(
                { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
        return interaction.update({ embeds: [upgradeEmbed], components: [upgradeButtons], files: [playerImage] })

    },
    chestUpgrade: async function (interaction) {
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.guild.name
        const warchest = `http://battle-bot.com/img/war-chest.jpg`
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })

        let CampColour = Colours.Black
        if (Level[0].unit_camp === 'Vanguard') {
            CampColour = Colours.VanguardBoost
        }
        if (Level[0].unit_camp === 'Liberty') {
            CampColour = Colours.LibertyBoost
        }
        if (Level[0].unit_camp === 'MartyrsW') {
            CampColour = Colours.MartyrsWBoost
        }
        const wallet = Level[0].war_coins
        const bank = Level[0].war_chest
        const bankLevel = Level[0].chest_level
        const cost = (bankLevel + 1) * 10000

        const upgradeChestButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("buybank")
                    .setLabel('Confirm Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Cancel Upgrade')
                    .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId("profile")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
            )

        const upgradeChestEmbed = new EmbedBuilder();
        upgradeChestEmbed
            .setColor(CampColour)
            .setThumbnail(playerThumbnail)
            .setTimestamp()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
            .setDescription(`**${interaction.member}, Confirm the upgrade your War-Chest**?`)
            .addFields(
                { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                { name: `Current Level:`, value: `${bankLevel}`, inline: true },
                { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

        return interaction.update({ embeds: [upgradeChestEmbed], components: [upgradeChestButtons], files: [playerImage] })
    },
    officerSelect: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const link = `http://battle-bot.com/img/${image}`
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })
        let CampColour = Colours.Black
        if (Level[0].unit_camp === 'Vanguard') {
            CampColour = Colours.VanguardBoost
        }
        if (Level[0].unit_camp === 'Liberty') {
            CampColour = Colours.LibertyBoost
        }
        if (Level[0].unit_camp === 'MartyrsW') {
            CampColour = Colours.MartyrsWBoost
        }

        const selectOfficerEmbed = new EmbedBuilder();
        const selectOfficerButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("profile")
                    .setLabel('Profile')
                    .setStyle(ButtonStyle.Secondary),
            )
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name
        const Officer = await sql.Execute(`SELECT * FROM officers WHERE Officer_Type = 'GROUND'`)
        const officerSelection = Officer[Math.floor(Math.random() * Officer.length)]
        selectOfficerEmbed
            .setColor(CampColour)
            .setThumbnail(playerThumbnail)
            .setTimestamp()
            .setDescription(`**${interaction.member}, Officer Selection Successful**`)
            .addFields(
                { name: `Officer:`, value: `${officerSelection.Officer_Name}`, inline: true },
                { name: `Camp:`, value: `${officerSelection.Officer_Camp}`, inline: true },
                { name: `Skill:`, value: `${officerSelection.Skill}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

        const addOfficer = await sql.Execute(`INSERT INTO playerofficers (Discord_ID, Officer_ID, Officer_Type, Officer_Name, Officer_Camp, Skill, Skill_Level) VALUES ('${interaction.member.id}', '${officerSelection.Officer_ID}', '${officerSelection.Officer_Type}', '${officerSelection.Officer_Name}', '${officerSelection.Officer_Camp}', '${officerSelection.Skill}', '0')`)
        const updateOfficer = await sql.Execute(`UPDATE levels SET officer_name	= '${officerSelection.Officer_Name}', officer_level = '1' WHERE discord_id = '${interaction.member.id}'`)
        console.log(`Add Officer: ${addOfficer.info}`)
        console.log(`Officer Select: ${updateOfficer.info}`)
        return interaction.update({ embeds: [selectOfficerEmbed], components: [selectOfficerButtons], files: [playerImage] })

    },
    officerUpgrade: async function (interaction) {
        const upgradeOfficerEmbed = new EmbedBuilder();
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.guild.name
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const link = `http://battle-bot.com/img/${image}`
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })

        let CampColour = Colours.Black
        if (Level[0].unit_camp === 'Vanguard') {
            CampColour = Colours.VanguardBoost
        }
        if (Level[0].unit_camp === 'Liberty') {
            CampColour = Colours.LibertyBoost
        }
        if (Level[0].unit_camp === 'MartyrsW') {
            CampColour = Colours.MartyrsWBoost
        }
        const wallet = Level[0].war_coins
        const bank = Level[0].war_chest
        const baseLevel = Level[0].base_level
        const officerLevel = Level[0].officer_level
        const cost = (officerLevel + 1) * 50000

        const upgradeOfficerButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("buyofficer")
                    .setLabel('Confirm Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("buyofficer10")
                    .setLabel('Upgrade x 10')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("newofficer")
                    .setLabel('Select New Officer')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("skillupgrade")
                    .setLabel('Upgrade Skill')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Cancel Upgrade')
                    .setStyle(ButtonStyle.Danger),
            )
        const chooseOfficerButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("officerselect")
                    .setLabel('Officer')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Menu')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId("profile")
                    .setLabel('Profile')
                    .setStyle(ButtonStyle.Secondary),
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
                .setColor(CampColour)
                .setThumbnail(playerThumbnail)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setDescription(`${interaction.member}, You need to upgrade your **Base** to Select your **Officer**?`)
                .addFields(
                    { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                    { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                    { name: `Base Level:`, value: `${baseLevel}`, inline: true },
                )
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
            return interaction.update({ embeds: [upgradeOfficerEmbed], components: [upgradeButtons], files: [playerImage] })
        }
        const officer = Level[0].officer_name

        if (officer === '') {

            upgradeOfficerEmbed
                .setColor(CampColour)
                .setThumbnail(playerThumbnail)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setDescription(`**${interaction.member}**, First you need to select your **Officer**!`)
                .addFields(
                    { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                    { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                )
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
            return interaction.update({ embeds: [upgradeOfficerEmbed], components: [chooseOfficerButtons], files: [playerImage] })

        } else
            upgradeOfficerEmbed
                .setColor(CampColour)
                .setThumbnail(playerThumbnail)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setDescription(`**${interaction.member}, Confirm the upgrade your Officer**?`)
                .addFields(
                    { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                    { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                    { name: `Officer Level:`, value: `${officerLevel}`, inline: true },
                    { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
                )
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

        return interaction.update({ embeds: [upgradeOfficerEmbed], components: [upgradeOfficerButtons], files: [playerImage] })
    },
    unitUpgrade: async function (interaction) {
        const upgradeUnitEmbed = new EmbedBuilder();
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.guild.name
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const link = `http://battle-bot.com/img/${image}`
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })

        let CampColour = Colours.Black
        if (Level[0].unit_camp === 'Vanguard') {
            CampColour = Colours.VanguardBoost
        }
        if (Level[0].unit_camp === 'Liberty') {
            CampColour = Colours.LibertyBoost
        }
        if (Level[0].unit_camp === 'MartyrsW') {
            CampColour = Colours.MartyrsWBoost
        }
        const wallet = Level[0].war_coins
        const bank = Level[0].war_chest
        const unitLevel = Level[0].unit_level
        const officer = Level[0].officer
        const prestige = Level[0].prestige + 1
        const officerLevel = Level[0].officer_level
        const cost = (unitLevel + 1) * (125000 * prestige)

        const upgradeUnitButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("buyunit")
                    .setLabel('Confirm Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Cancel Upgrade')
                    .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId("profile")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
            )
        const chooseUnitButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("unitselect")
                    .setLabel('Select Unit')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId("profile")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
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
                .setColor(CampColour)
                .setThumbnail(playerThumbnail)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setDescription(`${interaction.member}, You need to upgrade your **Officer** to Select your **Unit**?`)
                .addFields(
                    { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                    { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                    { name: `Unit Level:`, value: `${unitLevel}`, inline: true },
                )
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

            return interaction.update({ embeds: [upgradeUnitEmbed], components: [upgradeButtons], files: [playerImage] })
        } else
            if (unitLevel === '0.0') {

                upgradeUnitEmbed
                    .setColor(CampColour)
                    .setThumbnail(playerThumbnail)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`**${interaction.member}**, First you need to select your **Unit**!`)
                    .addFields(
                        { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                        { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                    )
                    .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

                return interaction.update({ embeds: [upgradeUnitEmbed], components: [chooseUnitButtons], files: [playerImage] })

            } else
                upgradeUnitEmbed
                    .setColor(CampColour)
                    .setThumbnail(playerThumbnail)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`**${interaction.member}, Confirm the upgrade your Unit**?`)
                    .addFields(
                        { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                        { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                        { name: `Unit Level:`, value: `${unitLevel}`, inline: true },
                        { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
                    )
                    .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
        return interaction.update({ embeds: [upgradeUnitEmbed], components: [upgradeUnitButtons], files: [playerImage] })
    },
    unitSelect: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const unitDetails = await sql.Execute(`SELECT * FROM units WHERE Camp = '${Level[0].unit_camp}' AND Unit_type = '${Level[0].unit_type}' AND Unit_Level = '${Level[0].unit_level}'`)
        const image = Level[0].unit_image || 'GeneralDeath.png'
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })

        let CampColour = Colours.Black
        if (Level[0].unit_camp === 'Vanguard') {
            CampColour = Colours.VanguardBoost
        }
        if (Level[0].unit_camp === 'Liberty') {
            CampColour = Colours.LibertyBoost
        }
        if (Level[0].unit_camp === 'MartyrsW') {
            CampColour = Colours.MartyrsWBoost
        }
        const selectUnitEmbed = new EmbedBuilder();
        const selectUnitButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Menu')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("profile")
                    .setLabel('Profile')
                    .setStyle(ButtonStyle.Secondary),
            )
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name
        const Unit = await sql.Execute(`SELECT * FROM units WHERE Unit_Level = '4.0' AND Unit_Type = 'MediumTanks'`)
        const unitSelection = Unit[Math.floor(Math.random() * Unit.length)]
		const playerImage = new AttachmentBuilder(`./img/${unitSelection.Image}`)
        const footer = ` - `
        selectUnitEmbed
            .setColor(CampColour)
            .setThumbnail(playerThumbnail)
            .setTimestamp()
            .setFooter({ text: `${unitSelection.Unit_Type} - ${unitSelection.Unit_Name} - ${unitSelection.Unit_Level}`, iconURL: `${guildIcon}`})
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
        const saveUnit = await sql.Execute(`INSERT INTO playerunits (discord_id, camp, unit_type, unit_level, unit_id) VALUES ('${interaction.member.id}', '${unitSelection.Camp}', '${unitSelection.Unit_Type}', '${unitSelection.Unit_Level}', '${unitSelection.Unit_ID}')`)
        console.log(`Save Unit:${saveUnit.info}`)
        const updateOfficer = await sql.Execute(`UPDATE levels SET unit_camp = '${unitSelection.Camp}', unit_type = '${unitSelection.Unit_Type}', unit_level = '${unitSelection.Unit_Level}', unit_image = '${unitSelection.Image}' WHERE discord_id = '${interaction.member.id}'`)
        console.log(`Update Officer:${updateOfficer.info}`)
        return interaction.update({ embeds: [selectUnitEmbed], components: [selectUnitButtons], files: [playerImage] })
    },
    buyUnit: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const unitDetails = await sql.Execute(`SELECT * FROM units WHERE Camp = '${Level[0].unit_camp}' AND Unit_type = '${Level[0].unit_type}' AND Unit_Level = '${Level[0].unit_level}'`)
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const link = `http://battle-bot.com/img/${image}`
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })
        
        const camp = Level[0].unit_camp
        let CampColour = Colours.Black
        if (Level[0].unit_camp === 'Vanguard') {
            CampColour = Colours.VanguardBoost
        }
        if (Level[0].unit_camp === 'Liberty') {
            CampColour = Colours.LibertyBoost
        }
        if (Level[0].unit_camp === 'MartyrsW') {
            CampColour = Colours.MartyrsWBoost
        }
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
        const newUnitButtons = new ActionRowBuilder()
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
                    .setCustomId("newUnit")
                    .setLabel('New Unit')
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
                    .setLabel('Confirm Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Cancel Upgrade')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId("profile")
                    .setLabel('Profile')
                    .setStyle(ButtonStyle.Secondary),
            )
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name
        const unitType = Level[0].unit_type
        const unitLevel = Level[0].unit_level
        const wallet = Level[0].war_coins
        const bank = Level[0].war_chest
        const officerLevel = Level[0].officer_level
        const prestige = Level[0].prestige + 1
        const cost = (unitLevel + 1) * (125000 * prestige)

        if (unitLevel === '9.2') {
            console.log(`Unit Maxed`),

                upgradeUnitEmbed
                    .setColor(CampColour)
                    .setThumbnail(playerThumbnail)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`${interaction.member}, You have already **Maxed** your **${unitType}**.\nUpgrade your **Officer** to increase your **Battle Rewards**!\nUpgrade your **War-Base** to increase your **Unit Strength**!\nSelect **New Unit** below to receive your next **Unit**`)
                    .addFields(
                        { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                        { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                        { name: `Unit Level:`, value: `${unitLevel}`, inline: true },
                    )
                    .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

            return interaction.update({ embeds: [upgradeUnitEmbed], components: [newUnitButtons], files: [playerImage] })
        }

        if (unitLevel > officerLevel) {
            console.log(`Officer Upgrade Needed`),
                upgradeUnitEmbed
                    .setColor(CampColour)
                    .setThumbnail(playerThumbnail)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`${interaction.member}, You need to upgrade your **Officer** for this upgrade.`)
                    .addFields(
                        { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                        { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                        { name: `Officer Level:`, value: `${officerLevel}`, inline: true },
                        { name: `Unit Level:`, value: `${unitLevel}`, inline: true },
                    )
                    .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

            return interaction.update({ embeds: [upgradeUnitEmbed], components: [upgradeButtons], files: [playerImage] })
        } else


            if (cost > wallet) {
                console.log(`No Money`),
                    difference = cost - wallet
                upgradeUnitEmbed
                    .setColor(CampColour)
                    .setThumbnail(playerThumbnail)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`${interaction.member}, You do not have enough **War-Coins** for this upgrade.\nYou are **$${difference.toLocaleString()} War-Coins** short!\nTry withdrawing from your **War-Chest**!`)
                    .addFields(
                        { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                        { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                        { name: `Unit Level:`, value: `${unitLevel}`, inline: true },
                        { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
                    )
                    .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
                return interaction.update({ embeds: [upgradeUnitEmbed], components: [upgradeUnitButtons], files: [playerImage] })
            }
        const newWallet = (wallet - cost)
        const newUnit = await sql.Execute(`SELECT * FROM units WHERE Camp = '${camp}' AND Unit_Type = '${unitType}' AND Unit_Level > '${unitLevel}'`)
        const newLevel = newUnit[0].Unit_Level
        const newName = newUnit[0].Unit_Name
        const newFirepower = newUnit[0].Firepower
        const newHP = newUnit[0].HP
        const newSpeed = newUnit[0].Speed
        const newID = newUnit[0].Unit_ID
        const newImage = newUnit[0].Unit_Type
        const newEmoji = newImage.replace('.jpg', '')
        const unitImage = newUnit[0].Image


        upgradeUnitEmbed
            .setColor(CampColour)
            .setThumbnail(playerThumbnail)
            .setTimestamp()
            .setDescription(`**${interaction.member}, Unit Upgrade Successful**`)
            .addFields(
                { name: `War-Coins:`, value: `$${newWallet.toLocaleString()}`, inline: true },
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                { name: `Level:`, value: `${newLevel.toLocaleString()}`, inline: true },
                { name: `Unit:`, value: `${newName}`, inline: true },
                { name: `Firepower:`, value: `${newFirepower.toLocaleString()}`, inline: true },
                { name: `Health:`, value: `${newHP.toLocaleString()}`, inline: true },
                { name: `Speed:`, value: `${newSpeed.toLocaleString()}`, inline: true },

            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

        const unitUpgrade = await sql.Execute(`UPDATE levels SET war_coins = ${newWallet}, unit_level = '${newLevel}', unit_image = '${unitImage}' WHERE discord_id = '${interaction.member.id}'`)
        console.log(`Levels Unit Update${unitUpgrade.info}`)
        const updateUnit = await sql.Execute(`UPDATE playerunits SET emoji = '${newEmoji}', unit_level = '${newLevel}', unit_id = '${newID}' WHERE discord_id = '${interaction.member.id}' AND camp = '${Level[0].unit_camp}' AND unit_type = '${Level[0].unit_type}'`)
        console.log(`Player Unit Update ${updateUnit.info}`)
        return interaction.update({ embeds: [upgradeUnitEmbed], components: [upgradeButtons], files: [playerImage] })
    },
    profile: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })

        let CampColour = Colours.Black
        if (Level[0].unit_camp === 'Vanguard') {
            CampColour = Colours.VanguardBoost
        }
        if (Level[0].unit_camp === 'Liberty') {
            CampColour = Colours.LibertyBoost
        }
        if (Level[0].unit_camp === 'MartyrsW') {
            CampColour = Colours.MartyrsWBoost
        }
        const profileEmbed = new EmbedBuilder();
        const profileButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("campaign")
                    .setLabel('Campaign')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId("selectunit")
                    .setLabel('Unit')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("selectofficer")
                    .setLabel('Officer')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("help")
                    .setLabel('How to Play!')
                    .setStyle(ButtonStyle.Secondary),
            )
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name
        const officerLevel = Level[0].officer_level || 'No Officer Chosen'
        const officer = Level[0].officer_name || 'No Officer Chosen'
        const unitType = Level[0].unit_type || 'No Unit Trained'
        const unitLevel = Level[0].unit_level || 'No Unit Trained'
        const unitCamp = Level[0].unit_camp || 'No Unit Trained'
        const officerDetails = await sql.Execute(`SELECT * from officers WHERE Officer_Name = '${officer}'`)
        officerType = 'No Officer Chosen'
        officerCamp = 'No Officer Chosen'
        officerSkill = 'No Officer Chosen'    
        if (officerDetails.length > 0) {
            officerType = officerDetails[0].Officer_Type
            officerCamp = officerDetails[0].Officer_Camp
            officerSkill = officerDetails[0].Skill 
        }
        const skillLevel = Level[0].skill_level 

        const unitDetails = await sql.Execute(`SELECT * FROM units WHERE Camp = '${Level[0].unit_camp}' AND Unit_type = '${Level[0].unit_type}' AND Unit_Level = '${Level[0].unit_level}'`)
        const link = `http://battle-bot.com/img/${image}`
        const triggerRate = skillLevel * 5
        attackType = 'No Unit Selected'
        if (unitDetails.length > 0) {
            attackType = unitDetails[0].Attack_Type
        }
        
        profileEmbed
            .setThumbnail(playerThumbnail)
            .setColor(CampColour)
            .setTimestamp()
            .setDescription(`**${interaction.member}'s Profile**`)
            .addFields(
                { name: `War-Coins:`, value: `$${Level[0].war_coins.toLocaleString()}`, inline: false },
                { name: `War-Chest:`, value: `$${Level[0].war_chest.toLocaleString()}`, inline: false },
                { name: `War-Chest Level:`, value: `${Level[0].chest_level.toLocaleString()}`, inline: false },
                { name: `Base Level:`, value: `${Level[0].base_level}`, inline: false },
                { name: `Officer:`, value: `${officer}`, inline: false },
                { name: `Officer Level:`, value: `${officerLevel}`, inline: false },
                { name: `Officer Type:`, value: `${officerType}`, inline: false },
                { name: `Officer Camp:`, value: `${officerCamp}`, inline: false },
                { name: `Officer Skill:`, value: `${officerSkill}`, inline: false },
                { name: `Skill Level:`, value: `${skillLevel}`, inline: false },
                { name: `Skill Trigger Rate:`, value: `${triggerRate}%`, inline: false },
                { name: `Unit Type:`, value: `${unitType}`, inline: false },
                { name: `Unit Level:`, value: `${unitLevel}`, inline: false },
                { name: `Attack Type:`, value: `${attackType}`, inline: false },
                { name: `Unit Camp:`, value: `${unitCamp}`, inline: false },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });


        return interaction.update({ empheral: true, embeds: [profileEmbed], components: [profileButtons], files: [playerImage] })
    },
    profileMenu: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })

        let CampColour = Colours.Black
        if (Level[0].unit_camp === 'Vanguard') {
            CampColour = Colours.VanguardBoost
        }
        if (Level[0].unit_camp === 'Liberty') {
            CampColour = Colours.LibertyBoost
        }
        if (Level[0].unit_camp === 'MartyrsW') {
            CampColour = Colours.MartyrsWBoost
        }
        const profileEmbed = new EmbedBuilder();
        const profileButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("campaign")
                    .setLabel('Campaign')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId("selectunit")
                    .setLabel('Unit')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("selectofficer")
                    .setLabel('Officer')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("help")
                    .setLabel('How to Play!')
                    .setStyle(ButtonStyle.Secondary),
            )
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name
        const officerLevel = Level[0].officer_level || 'No Officer Chosen'
        const officer = Level[0].officer_name || 'No Officer Chosen'
        const unitType = Level[0].unit_type || 'No Unit Trained'
        const unitLevel = Level[0].unit_level || 'No Unit Trained'
        const unitCamp = Level[0].unit_camp || 'No Unit Trained'
        const officerDetails = await sql.Execute(`SELECT * from officers WHERE Officer_Name = '${officer}'`)
        officerType = 'No Officer Chosen'
        officerCamp = 'No Officer Chosen'
        officerSkill = 'No Officer Chosen'    
        if (officerDetails.length > 0) {
            officerType = officerDetails[0].Officer_Type
            officerCamp = officerDetails[0].Officer_Camp
            officerSkill = officerDetails[0].Skill 
        }
        const skillLevel = Level[0].skill_level 

        const unitDetails = await sql.Execute(`SELECT * FROM units WHERE Camp = '${Level[0].unit_camp}' AND Unit_type = '${Level[0].unit_type}' AND Unit_Level = '${Level[0].unit_level}'`)
        const link = `http://battle-bot.com/img/${image}`
        const triggerRate = skillLevel * 5
        attackType = 'No Unit Selected'
        if (unitDetails.length > 0) {
            attackType = unitDetails[0].Attack_Type
        }
        
        profileEmbed
            .setThumbnail(playerThumbnail)
            .setColor(CampColour)
            .setTimestamp()
            .setDescription(`**${interaction.member}'s Profile**`)
            .addFields(
                { name: `War-Coins:`, value: `$${Level[0].war_coins.toLocaleString()}`, inline: false },
                { name: `War-Chest:`, value: `$${Level[0].war_chest.toLocaleString()}`, inline: false },
                { name: `War-Chest Level:`, value: `${Level[0].chest_level.toLocaleString()}`, inline: false },
                { name: `Base Level:`, value: `${Level[0].base_level}`, inline: false },
                { name: `Officer:`, value: `${officer}`, inline: false },
                { name: `Officer Level:`, value: `${officerLevel}`, inline: false },
                { name: `Officer Type:`, value: `${officerType}`, inline: false },
                { name: `Officer Camp:`, value: `${officerCamp}`, inline: false },
                { name: `Officer Skill:`, value: `${officerSkill}`, inline: false },
                { name: `Skill Level:`, value: `${skillLevel}`, inline: false },
                { name: `Skill Trigger Rate:`, value: `${triggerRate}%`, inline: false },
                { name: `Unit Type:`, value: `${unitType}`, inline: false },
                { name: `Unit Level:`, value: `${unitLevel}`, inline: false },
                { name: `Attack Type:`, value: `${attackType}`, inline: false },
                { name: `Unit Camp:`, value: `${unitCamp}`, inline: false },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });


        return interaction.editReply({ empheral: true, embeds: [profileEmbed], components: [profileButtons], files: [playerImage] })
    },
    newUnit: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const link = `http://battle-bot.com/img/${image}`
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })

        let CampColour = Colours.Black
        if (Level[0].unit_camp === 'Vanguard') {
            CampColour = Colours.VanguardBoost
        }
        if (Level[0].unit_camp === 'Liberty') {
            CampColour = Colours.LibertyBoost
        }
        if (Level[0].unit_camp === 'MartyrsW') {
            CampColour = Colours.MartyrsWBoost
        }
        const prestige = Level[0].prestige
        const newPrestige = prestige + 1
 
        const newUnitEmbed = new EmbedBuilder();
        const newUnitButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("profile")
                    .setLabel('Profile')
                    .setStyle(ButtonStyle.Primary),
            )
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name

        newUnitSelection = async function (prestige) { // Starter is Medium 
        if (prestige === 0) return newUnitLevel = '5.0', newUnitType = 'Fighters'
        if (prestige === 1) return newUnitLevel = '4.0', newUnitType = 'Infantry'
        if (prestige === 2) return newUnitLevel = '5.0', newUnitType = 'SuperHeavy'
        if (prestige === 3) return newUnitLevel = '4.0', newUnitType = 'Howitzers'
        if (prestige === 4) return newUnitLevel = '5.0', newUnitType = 'Bombers'
        if (prestige === 5) return newUnitLevel = '4.0', newUnitType = 'TankHunters'
        if (prestige === 6) return newUnitLevel = '5.0', newUnitType = 'RocketLaunchers'
        if (prestige === 7) return newUnitLevel = '4.0', newUnitType = 'LightTanks'
        if (prestige === 8) return newUnitLevel = '4.0', newUnitType = 'HeavyTanks'
        if (prestige === 9) return newUnitLevel = '4.0', newUnitType = 'AntiTankGuns'

        if (prestige === 10) return newUnitLevel = '4.0', newUnitType = 'MediumTanks'//2
        if (prestige === 11) return newUnitLevel = '5.0', newUnitType = 'Fighters'//2
        if (prestige === 12) return newUnitLevel = '4.0', newUnitType = 'Infantry'//2
        if (prestige === 13) return newUnitLevel = '4.0', newUnitType = 'Howitzers'//2
        if (prestige === 14) return newUnitLevel = '5.0', newUnitType = 'Bombers'//2
        if (prestige === 15) return newUnitLevel = '4.0', newUnitType = 'TankHunters'//2
        if (prestige === 16) return newUnitLevel = '4.0', newUnitType = 'HeavyTanks'//2

        if (prestige === 17) return newUnitLevel = '4.0', newUnitType = 'MediumTanks'//3
        if (prestige === 18) return newUnitLevel = '5.0', newUnitType = 'Fighters'//3
        if (prestige === 19) return newUnitLevel = '4.0', newUnitType = 'Infantry'//3
        if (prestige === 20) return newUnitLevel = '4.0', newUnitType = 'Howitzers'//3
        if (prestige === 21) return newUnitLevel = '5.0', newUnitType = 'Bombers'//3
        if (prestige === 22) return newUnitLevel = '4.0', newUnitType = 'TankHunters'//3
        if (prestige === 23) return newUnitLevel = '4.0', newUnitType = 'HeavyTanks'//3
        if (prestige < 23) return interaction.update({
            content: `You have collected the Maximums available Units`
        })


        module.exports.newUnitLevel = newUnitLevel
        module.exports.newUnitType = newUnitType
        }
        newUnitSelection(prestige)

        let presigeRequired = newPrestige * 25
        if (presigeRequired > Level[0].officer_level) {
            console.log(`Officer Upgrade Required`)
            newUnitEmbed
                .setColor(CampColour)
                .setThumbnail(playerThumbnail)
                .setTimestamp()
                .addFields(
                    { name: `Required Level: ${presigeRequired + 1}`, value: `Current Level: ${Level[0].officer_level}` },
                )  
                .setDescription(`**${interaction.member}, Officer Upgrade Required**`)
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
            return interaction.update({ embeds: [newUnitEmbed], components: [newUnitButtons], files: [playerImage] })
        } else console.log(`No Officer Upgrade Required`)

        if (prestige > 9) {
            const Current = await sql.Execute(`SELECT * FROM playerunits WHERE discord_id = '${interaction.member.id}' AND unit_type = '${newUnitType}'`)
            const Unit = await sql.Execute(`SELECT * FROM units WHERE Unit_Level = '${newUnitLevel}' AND Unit_Type LIKE '%${newUnitType}%' AND '${Current[0].camp}' NOT IN (Camp)`)
            unitSelection = Unit[Math.floor(Math.random() * Unit.length)]
            newUnitImage = new AttachmentBuilder(`./img/${unitSelection.Image}`)
            module.exports = unitSelection = unitSelection, newUnitImage = newUnitImage    
        } else {
            const Unit = await sql.Execute(`SELECT * FROM units WHERE Unit_Level = '${newUnitLevel}' AND Unit_Type LIKE '%${newUnitType}%'`)
            unitSelection = Unit[Math.floor(Math.random() * Unit.length)]
            newUnitImage = new AttachmentBuilder(`./img/${unitSelection.Image}`)
            module.exports.unitSelection = unitSelection
            module.exports.newUnitImage = newUnitImage
        }


        newUnitEmbed
            .setColor(CampColour)
            .setThumbnail(playerThumbnail)
            .setTimestamp()
            .setDescription(`**${interaction.member}, New Unit Selection Successful**`)
            .addFields(
                { name: `Unit Name:`, value: `${unitSelection.Unit_Name}`, inline: true },
                { name: `Unit Level:`, value: `${unitSelection.Unit_Level}`, inline: true },
                { name: `Camp:`, value: `${unitSelection.Camp}`, inline: true },
                { name: `Unit Type:`, value: `${unitSelection.Unit_Type}`, inline: true },
                { name: `Firepower:`, value: `${unitSelection.Firepower}`, inline: true },
                { name: `HP:`, value: `${unitSelection.HP}`, inline: true },
                { name: `Speed:`, value: `${unitSelection.Speed}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
        const emoji = unitSelection.Image.replace('.jpg', '')
        const updateUnit = await sql.Execute(`UPDATE playerunits SET emoji = '${emoji}', unit_level = '${Level[0].unit_level}', Unit_ID = '${unitSelection.Unit_ID}' WHERE discord_id = '${interaction.member.id}' AND camp = '${Level[0].unit_camp}' AND unit_type = '${Level[0].unit_type}'`)
        const saveNewUnit = await sql.Execute(`INSERT INTO playerunits (discord_id, camp, unit_type, unit_level, unit_id) VALUES ('${interaction.member.id}', '${unitSelection.Camp}', '${unitSelection.Unit_Type}', '${unitSelection.Unit_Level}', '${unitSelection.Unit_ID}')`)
        const updateNewUnit = await sql.Execute(`UPDATE levels SET Unit_Camp = '${unitSelection.Camp}', Unit_Type = '${unitSelection.Unit_Type}', Unit_Level = '${unitSelection.Unit_Level}', prestige = '${newPrestige}' WHERE discord_id = '${interaction.member.id}'`)
        console.log(`Update Unit:${updateUnit.info}`)
        console.log(`Update New Unit:${updateNewUnit.info}`)
        console.log(`Save New Unit:${saveNewUnit.info}`)

        return interaction.update({ embeds: [newUnitEmbed], components: [newUnitButtons], files: [newUnitImage] })
    },
    attackSelection: async function (interaction) {
        if (interaction.Attacker.AttackType === interaction.Attacker.OfficerType) return interaction.Attacker.Multiplier = interaction.Attacker.Multiplier + interaction.Attacker.Multiplier, console.log(`Attacker Unit Selection Buff:`, interaction.Attacker.Multiplier)
        if (interaction.Defender.AttackType === interaction.Defender.OfficerType) return interaction.Defender.Multiplier = interaction.Defender.Multiplier + interaction.Defender.Multiplier, console.log(`Defender Unit Selection Buff:`, interaction.Defender.Multiplier)
        if (interaction.Attacker.AttackType === 'Air' && interaction.Defender.AttackType === 'Ground') return interaction.Attacker.Multiplier = interaction.Attacker.Multiplier * 2, interaction.Defender.Multiplier = interaction.Defender.Multiplier / 2, interaction.Defender.Power = interaction.Defender.Power / 2, console.log(`Attacker Air Selection Buff:`, interaction.Attacker.Multiplier + `\nDefender Ground Debuff:`, interaction.Defender.Multiplier, interaction.Defender.Power)
        if (interaction.Defender.AttackType === 'Air' && interaction.Attacker.AttackType === 'Ground') return interaction.Defender.Multiplier = interaction.Defender.Multiplier * 2, interaction.Attacker.Multiplier = interaction.Attacker.Multiplier / 2, interaction.Attacker.Power = interaction.Attacker.Power / 2, console.log(`Defender Air Selection Buff:`, interaction.Defender.Multiplier, `\nDefender Ground Debuff:`, interaction.Attacker.Multiplier, interaction.Attacker.Power)
    },
    campSelection: async function (interaction) {
        if (interaction.Attacker.UnitCamp === interaction.Attacker.OfficerCamp) return interaction.Attacker.Multiplier = interaction.Attacker.Multiplier + interaction.Attacker.Multiplier, console.log(`Attacker Camp Buff:`, interaction.Attacker.Multiplier)
        if (interaction.Defender.UnitCamp === interaction.Defender.OfficerCamp) return interaction.Defender.Multiplier = interaction.Defender.Multiplier + interaction.Defender.Multiplier, console.log(`Defender Camp Buff:`, interaction.Defender.Multiplier)
    },
    newUnitSelection: async function (prestige) { //Medium is Starter Troop
        if (prestige === 0) return newUnitLevel = '5.0', newUnitType = 'Fighters', console.log(`New Unit Fighters`)
        if (prestige === 1) return newUnitLevel = '4.0', newUnitType = 'Infantry', console.log(`New Unit Infantry`)
        if (prestige === 2) return newUnitLevel = '5.0', newUnitType = 'SuperHeavy', console.log(`New Unit SuperHeavy`)
        if (prestige === 3) return newUnitLevel = '4.0', newUnitType = 'Howitzers', console.log(`New Unit Howitzers`)
        if (prestige === 4) return newUnitLevel = '5.0', newUnitType = 'Bombers', console.log(`New Unit Bombers`)
        if (prestige === 5) return newUnitLevel = '4.0', newUnitType = 'TankHunters', console.log(`New Unit TankHunters`)
        if (prestige === 6) return newUnitLevel = '5.0', newUnitType = 'RocketLaunchers', console.log(`New Unit RocketLaunchers`)
        if (prestige === 7) return newUnitLevel = '4.0', newUnitType = 'LightTanks', console.log(`New Unit LightTanks`)
        if (prestige === 8) return newUnitLevel = '4.0', newUnitType = 'HeavyTanks', console.log(`New Unit HeavyTanks`)
        if (prestige === 9) return newUnitLevel = '4.0', newUnitType = 'AntiTankGuns', console.log(`New Unit AntiTankGuns`)
        module.exports.newUnitLevel = newUnitLevel
        module.exports.newUnitType = newUnitType
    },
    selectunit: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })

        const selectUnitButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("selectunit")
                    .setLabel('Unit')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("selectofficer")
                    .setLabel('Officer')
                    .setStyle(ButtonStyle.Success),    
                new ButtonBuilder()
                    .setCustomId("profile")
                    .setLabel('Profile')
                    .setStyle(ButtonStyle.Secondary),
            )
            const selectUnitEmbed = new EmbedBuilder()
                .setThumbnail(playerThumbnail)
                .setColor(Colours.Black)
                .setTimestamp()
                .setTitle(`Select Your Unit!`)

        const playerUnits = await sql.Execute(`SELECT * FROM playerunits WHERE discord_id = '${interaction.member.id}'`)
        if (playerUnits.length === 0 ) {
            selectUnitEmbed
                .setTitle(`No Unit Available!`)
                .setDescription(`You have not selected your **Unit**.\nUpgrade your **War-Base** & **Officer** to get your **First Unit**!`)
                return interaction.update({
                embeds: [selectUnitEmbed],
                components: [selectUnitButtons],
                files: [playerImage]
            })
        }
        const unitChoices = [];
        for (const entry in playerUnits) {
            const camp = playerUnits[entry].camp
            const type = playerUnits[entry].unit_type
            const level = playerUnits[entry].unit_level
            const playerEmoji = camp + type
            const image = await interaction.client.emojis.cache.find(emoji => emoji.name == playerEmoji)
            console.log(playerEmoji, image)
            unitChoices.push({
                label: type,
                description: `${camp} - ${type} - ${level}`,
                value: type + '_' + camp.toString(),
                //emoji: image.toString(),
            })
        }
        const unitMenu = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("selectunitmenu")
                    .setPlaceholder('Select your Unit')
                    .addOptions(unitChoices),
            )

        interaction.update({
            embeds: [selectUnitEmbed],
            components: [unitMenu, selectUnitButtons],
            files: [playerImage]
        })
    },
    selectunitmenu: async function (interaction) {
        const selected = interaction.values[0]
        const choice = selected.split('_')
        console.log(choice[0])
        const selectedUnit = await sql.Execute(`SELECT * FROM playerunits WHERE discord_id = '${interaction.member.id}' AND camp = '${choice[1]}' AND unit_type = '${choice[0]}'`)
        console.log(selectedUnit)
        const newUnitSelect = await sql.Execute(`SELECT * FROM units WHERE Camp = '${selectedUnit[0].camp}' AND Unit_Type = '${selectedUnit[0].unit_type}' AND Unit_Level = '${selectedUnit[0].unit_level}'`)
        const playerProfile = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const firepower = newUnitSelect[0].Firepower * (playerProfile[0].officer_level / 10)
        const HP = newUnitSelect[0].HP * playerProfile[0].base_level * 10
        const image = playerProfile[0].unit_image || 'GeneralDeath.png'
        const unitImage = `${newUnitSelect[0].Image}`
		const playerImage = new AttachmentBuilder(`./img/${unitImage}`)
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })


        const link = 'http://battle-bot.com/img/' + image
        const updateUnit = await sql.Execute(`UPDATE levels SET unit_level = '${selectedUnit[0].unit_level}', unit_camp = '${selectedUnit[0].camp}', unit_type = '${selectedUnit[0].unit_type}', unit_image = '${unitImage}' WHERE discord_id = '${interaction.member.id}'`)
        console.log(`Updated Unit:${updateUnit.info}`)
        let CampColour = Colours.Black
        if (selectedUnit[0].camp === 'Vanguard') {
            CampColour = Colours.VanguardBoost
        }
        if (selectedUnit[0].camp === 'Liberty') {
            CampColour = Colours.LibertyBoost
        }
        if (selectedUnit[0].camp === 'MartyrsW') {
            CampColour = Colours.MartyrsWBoost
        }
        const selectUnitMenuButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("cancel")
                .setLabel('Upgrade')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("selectunit")
                .setLabel('Unit')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("selectofficer")
                .setLabel('Officer')
                .setStyle(ButtonStyle.Success),    
            new ButtonBuilder()
                .setCustomId("profile")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
        )
        const selectedUnitEmbed = new EmbedBuilder()
            .setTitle(`${choice[0]} chosen`)
            .setColor(CampColour)
            .setThumbnail(playerThumbnail)
            .setTimestamp()
            .addFields(
                { name: `Unit Name:`, value: `${newUnitSelect[0].Unit_Name.toLocaleString()}`, inline: true },
                { name: `Unit Level:`, value: `${newUnitSelect[0].Unit_Level.toLocaleString()}`, inline: true },
                { name: `Camp:`, value: `${newUnitSelect[0].Camp}`, inline: true },
                { name: `Unit Type:`, value: `${newUnitSelect[0].Unit_Type}`, inline: true },
                { name: `Firepower:`, value: `${firepower.toLocaleString()}`, inline: true },
                { name: `HP:`, value: `${HP.toLocaleString()}`, inline: true },
                { name: `Speed:`, value: `${newUnitSelect[0].Speed.toLocaleString()}`, inline: true },
            )
        
        interaction.update({
            embeds: [selectedUnitEmbed],
            components: [selectUnitMenuButtons],
            files: [playerImage]
        })

    },
    selectofficer: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })

        let CampColour = Colours.Black
        const playerOfficers = await sql.Execute(`SELECT * FROM playerofficers WHERE discord_id = '${interaction.member.id}' ORDER BY officer_level DESC`)
        const selectOfficerButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("cancel")
                .setLabel('Upgrade')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("selectunit")
                .setLabel('Unit')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("selectgroundofficer")
                .setLabel('Ground Officer')
                .setStyle(ButtonStyle.Primary), 
            new ButtonBuilder()
                .setCustomId("selectairofficer")
                .setLabel('Air Officer')
                .setStyle(ButtonStyle.Primary),    
            new ButtonBuilder()
                .setCustomId("profile")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
                )
        const selectOfficerEmbed = new EmbedBuilder()
                .setColor(CampColour)
                .setThumbnail(playerThumbnail)
                .setTimestamp()
                .setTitle(`Select from your Ground or Air Officers!`)

        if (playerOfficers.length === 0) {
            selectOfficerEmbed
                .setTitle(`No Officer Available!`)
                .setDescription(`You have not selected your **Officer**.\nUpgrade your **War-Chest** & **War-Base** to get your **First Unit**!`)
            return interaction.update({
            embeds: [selectOfficerEmbed],
            components: [selectOfficerButtons],
            files: [playerImage]
            })
        }


        interaction.update({
            embeds: [selectOfficerEmbed],
            components: [selectOfficerButtons],
            files: [playerImage]
        })
    },
    selectgroundofficer: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const link = `http://battle-bot.com/img/${image}`
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })

        let CampColour = Colours.Black
        const playerOfficers = await sql.Execute(`SELECT * FROM playerofficers WHERE officer_type = 'Ground' AND discord_id = '${interaction.member.id}' ORDER BY officer_level DESC`)
        const selectOfficerButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("cancel")
                .setLabel('Upgrade')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("selectunit")
                .setLabel('Unit')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("selectofficer")
                .setLabel('Officer')
                .setStyle(ButtonStyle.Success),    
            new ButtonBuilder()
                .setCustomId("profile")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
                )
        const selectOfficerEmbed = new EmbedBuilder()
                .setColor(CampColour)
                .setThumbnail(playerThumbnail)
                .setTimestamp()
                .setDescription(`**Choose your Ground Officer!**\n\nPairing your **Officer Type** & **Unit Type** will give you additional **Combat Buffs!**\n\nPairing your **Officer Camp** & **Unit Camp** will give you additional **Combat Buffs!**`)

        if (playerOfficers.length === 0) {
            selectOfficerEmbed
                .setDescription(`**No Ground Officer Available!**\n\nYou have no **Ground Officers**.\nUpgrade your **War-Chest** & **War-Base** to get your **First Ground Officer**!`)
            return interaction.update({
            embeds: [selectOfficerEmbed],
            components: [selectOfficerButtons],
            files: [playerImage]
            })
        }

        const officerChoices = [];
        for (const entry in playerOfficers) {
            const name = playerOfficers[entry].Officer_Name
            const type = playerOfficers[entry].Officer_Type
            const camp = playerOfficers[entry].Officer_Camp
            const skill = playerOfficers[entry].Skill
            const level = playerOfficers[entry].Officer_Level
            const skill_level = playerOfficers[entry].Skill_Level
            
            const image = await interaction.client.emojis.cache.find(emoji => emoji.name === camp)
            console.log(image)
            officerChoices.push({
                label: name,
                description: `${level} - ${camp} - ${type} - ${skill} - ${skill_level}`,
                value: name.toString(),
                //emoji: image.toString()
            })
        }

        const officerMenu = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("selectofficermenu")
                    .setPlaceholder('Select your Ground Officer')
                    .addOptions(officerChoices),
            )
        interaction.update({
            embeds: [selectOfficerEmbed],
            components: [officerMenu, selectOfficerButtons],
            files: [playerImage]
        })
    },
    selectairofficer: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const link = `http://battle-bot.com/img/${image}`
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })

        let CampColour = Colours.Black
        const playerOfficers = await sql.Execute(`SELECT * FROM playerofficers WHERE officer_type = 'Air' AND discord_id = '${interaction.member.id}' ORDER BY officer_level DESC`)
        const selectOfficerButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("cancel")
                .setLabel('Upgrade')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("selectunit")
                .setLabel('Unit')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("selectofficer")
                .setLabel('Officer')
                .setStyle(ButtonStyle.Success),    
            new ButtonBuilder()
                .setCustomId("profile")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
                )
        const selectOfficerEmbed = new EmbedBuilder()
                .setColor(CampColour)
                .setThumbnail(playerThumbnail)
                .setTimestamp()
                .setDescription(`**Choose your Air Officer!**\n\nPairing your **Officer Type** & **Unit Type** will give you additional **Combat Buffs!**\n\nPairing your **Officer Camp** & **Unit Camp** will give you additional **Combat Buffs!**`)

        if (playerOfficers.length === 0) {
            selectOfficerEmbed
                .setDescription(`**No Air Officer Available!**\n\nYou have no **Air Officers**.\nUpgrade your **War-Chest** & **War-Base** to get your **First Air Officer**!`)
            return interaction.update({
            embeds: [selectOfficerEmbed],
            components: [selectOfficerButtons],
            files: [playerImage]
            })
        }

        const officerChoices = [];
        for (const entry in playerOfficers) {
            const name = playerOfficers[entry].Officer_Name
            const type = playerOfficers[entry].Officer_Type
            const camp = playerOfficers[entry].Officer_Camp
            const skill = playerOfficers[entry].Skill
            const level = playerOfficers[entry].Officer_Level
            const skill_level = playerOfficers[entry].Skill_Level
            const image = await interaction.client.emojis.cache.find(emoji => emoji.name == camp)

            officerChoices.push({
                label: name,
                description: `${level} - ${camp} - ${type} - ${skill} - ${skill_level}`,
                value: name.toString(),
                emoji: image.toString()
            })
        }

        const officerMenu = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("selectofficermenu")
                    .setPlaceholder('Select your Air Officer')
                    .addOptions(officerChoices),
            )
        interaction.update({
            embeds: [selectOfficerEmbed],
            components: [officerMenu, selectOfficerButtons],
            files: [playerImage]
        })
    },
    selectofficermenu: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const image = Level[0].unit_image || 'GeneralDeath.png'
        const link = `http://battle-bot.com/img/${image}`
        const selected = interaction.values[0]
        const selectedOfficer = await sql.Execute(`SELECT * FROM playerofficers WHERE discord_id = '${interaction.member.id}' AND Officer_Name = '${selected}'`)
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })

        const updateOfficer = await sql.Execute(`UPDATE levels SET officer_name = '${selectedOfficer[0].Officer_Name}', officer_level = '${selectedOfficer[0].Officer_Level}', skill_level = '${selectedOfficer[0].Skill_Level}' WHERE discord_id = '${interaction.member.id}'`)
        let CampColour = Colours.Green
        if (selectedOfficer[0].Unit_Camp === 'Vanguard') {
            CampColour = Colours.VanguardBoost
        }
        if (selectedOfficer[0].Unit_Camp === 'Liberty') {
            CampColour = Colours.LibertyBoost
        }
        if (selectedOfficer[0].Unit_Camp === 'MartyrsW') {
            CampColour = Colours.MartyrsWBoost
        }
        console.log(`Officer Selected: ${updateOfficer.info}`)
        const selectOfficerMenuButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("cancel")
                .setLabel('Upgrade')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("selectunit")
                .setLabel('Unit')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("selectofficer")
                .setLabel('Officer')
                .setStyle(ButtonStyle.Success),    
            new ButtonBuilder()
                .setCustomId("profile")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
        )
        const selectedOfficerEmbed = new EmbedBuilder()
            .setThumbnail(playerThumbnail)
            .setTitle(`${selected} chosen`)
            .setColor(CampColour)
            .setTimestamp()
            .addFields(
                { name: `Officer Name:`, value: `${selectedOfficer[0].Officer_Name}`, inline: true },
                { name: `Officer Level:`, value: `${selectedOfficer[0].Officer_Level}`, inline: true },
                { name: `Camp:`, value: `${selectedOfficer[0].Officer_Camp}`, inline: true },
                { name: `Officer Type:`, value: `${selectedOfficer[0].Officer_Type}`, inline: true },
                { name: `Skill:`, value: `${selectedOfficer[0].Skill}`, inline: true },
                { name: `Skill Level:`, value: `${selectedOfficer[0].Skill_Level}`, inline: true },
            )
        
        interaction.update({
            embeds: [selectedOfficerEmbed],
            components: [selectOfficerMenuButtons],
            files: [playerImage]
        })

    },
    campaign: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const unitDetails = await sql.Execute(`SELECT * FROM units WHERE Camp = '${Level[0].unit_camp}' AND Unit_type = '${Level[0].unit_type}' AND Unit_Level = '${Level[0].unit_level}'`)
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const link = `http://battle-bot.com/img/${image}`
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })

        const campaignButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("camp1")
                    .setLabel('Sergeant Spanner (Level 50)')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("camp2")
                    .setLabel('White Wolf (Level 100)')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("camp3")
                    .setLabel('Death Adder (Level 150)')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("camp4")
                    .setLabel('Angel of Light (Level 200)')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("camp5")
                    .setLabel('The Erupter (Level 250)')
                    .setStyle(ButtonStyle.Success),
            )
            const campaignButtons2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("camp6")
                    .setLabel('Bloody Mary (Level 300)')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("camp7")
                    .setLabel('Tip of the Spear (Level 350)')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("camp8")
                    .setLabel('Steel Fighter (Level 400)')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("camp9")
                    .setLabel('Thorn Countess (Level 450)')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("camp10")
                    .setLabel('Valkyrie (Level 500)')
                    .setStyle(ButtonStyle.Primary),
            )
            const campaignButtons3 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("camp11")
                    .setLabel('Whip Cracker (Level 550)')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId("camp12")
                    .setLabel('Vox Veritatis (Level 600)')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId("camp13")
                    .setLabel('Lady Justice (Level 650)')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId("camp14")
                    .setLabel('Iron Bastion (Level 700)')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId("camp15")
                    .setLabel('Guardian of Truth (Level 750)')
                    .setStyle(ButtonStyle.Danger),
            )
            const campaignButtons4 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("camp16")
                    .setLabel('Eye of Providence (Level 800)')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("camp17")
                    .setLabel('Antonina Shevchenko (Level 850)')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("camp18")
                    .setLabel('Sabre of the Nation (Level 900)')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("camp19")
                    .setLabel('Golden Eagle (Level 950)')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("camp20")
                    .setLabel('Tiger Marauder (Level 1000)')
                    .setStyle(ButtonStyle.Secondary),
            )

            const campaignButtons5 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("camp21")
                    .setLabel('El Cartero (Level 1050)')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("camp22")
                    .setLabel('Brisk Eagle (Level 1100)')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("camp23")
                    .setLabel('The Witcher (Level 1150)')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("camp24")
                    .setLabel('Polar Phantom (Level 1200)')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("camp25")
                    .setLabel('Silver Comet (Level 1250)')
                    .setStyle(ButtonStyle.Primary),
            )

            const campaignButtonsMenu = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("easy")
                    .setLabel('Easy')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("normal")
                    .setLabel('Normal')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("hard")
                    .setLabel('Hard')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("profile")
                    .setLabel('Profile')
                    .setStyle(ButtonStyle.Secondary),
            )

            const campaignButtonsMenu2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("normal")
                    .setLabel('Normal')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("hard")
                    .setLabel('Hard')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId("extreme")
                    .setLabel('Extreme')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("profile")
                    .setLabel('Profile')
                    .setStyle(ButtonStyle.Secondary),
            )

            const campaignButtonsMenu3 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("hard")
                    .setLabel('Hard')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId("extreme")
                    .setLabel('Extreme')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("ultra")
                    .setLabel('Ultra')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("profile")
                    .setLabel('Profile')
                    .setStyle(ButtonStyle.Secondary),
            )

        const campaignEmbed = new EmbedBuilder()
            .setColor(Colours.Green)
            .setThumbnail(playerThumbnail)
            .setTimestamp()
            .setDescription(`Pick your Enemy`)
            .setTitle(`Select your opponent!`)
    let buttons = campaignButtons
    let menu = campaignButtonsMenu
    if (interaction.customId === 'easy') { 
        buttons = campaignButtons
        menu = campaignButtonsMenu
        campaignEmbed
            .setColor(Colours.Green)
    }
    if (interaction.customId === 'normal') { 
        buttons = campaignButtons2
        menu = campaignButtonsMenu
        campaignEmbed
            .setColor(Colours.Liberty)
    }
    if (interaction.customId === 'hard') { 
        buttons = campaignButtons3
        menu = campaignButtonsMenu2
        campaignEmbed
            .setColor(Colours.MartyrsW)
    }
    if (interaction.customId === 'extreme') { 
        buttons = campaignButtons4
        menu = campaignButtonsMenu3
        campaignEmbed
            .setColor(Colours.Grey)
    }
    if (interaction.customId === 'ultra') { 
        buttons = campaignButtons5
        menu = campaignButtonsMenu3
        campaignEmbed
            .setColor(Colours.Liberty)
    }
        interaction.update({
            embeds: [campaignEmbed],
            components: [buttons, menu],
            files: [playerImage]
        })
    },
    challenge: async function (interaction) {
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })
        const challengeButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("profile")
                    .setLabel('Profile')
                    .setStyle(ButtonStyle.Secondary),
            )
        const challengeEmbed = new EmbedBuilder()
            .setThumbnail(playerThumbnail)
            .setDescription(`Coming Soon...`)
            .setTitle(`Challenge!`)
        interaction.editReply({
            embeds: [challengeEmbed],
            //components: [challengeButtons]
        })
    },
    newOfficer: async function (interaction) {
        const Officers = await sql.Execute(`SELECT * FROM officers WHERE Officer_ID NOT IN (SELECT Officer_ID FROM playerofficers WHERE Discord_ID = '${interaction.member.id}');`)            
        const currentOfficers = await sql.Execute(`SELECT * FROM playerofficers WHERE discord_id = '${interaction.member.id}'`)
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)  
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })

        const newOfficerEmbed = new EmbedBuilder();
        const newOfficerButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("profile")
                    .setLabel('Profile')
                    .setStyle(ButtonStyle.Secondary),
            )
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name
        let presigeRequired = currentOfficers.length * 20 + 1
        if (currentOfficers.length < 2 ) {
            console.log(`Less than 2`)
            presigeRequired = 1
        }
        if (presigeRequired >= Level[0].officer_level) {
            console.log(`Officer Upgrade Required`)
            newOfficerEmbed
                .setColor(Colours.Black)
                .setThumbnail(playerThumbnail)
                .setTimestamp()
                .addFields(
                    { name: `Required Level: ${presigeRequired}`, value: `Current Level: ${Level[0].officer_level}` },
                )  
                .setDescription(`**${interaction.member}, Officer Upgrade Required**`)
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
            return interaction.update({ embeds: [newOfficerEmbed], components: [newOfficerButtons], files: [playerImage] })
        } else console.log(`No Officer Upgrade Required`)

        const officerSelection = Officers[Math.floor(Math.random() * Officers.length)]

        newOfficerEmbed
            .setColor(Colours.Black)
            .setThumbnail(playerThumbnail)
            .setTimestamp()
            .setDescription(`**${interaction.member}, New Officer Selection Successful**`)
            .addFields(
                { name: `Officer Name:`, value: `${officerSelection.Officer_Name}`, inline: true },
                { name: `Officer Level:`, value: `0`, inline: true },
                { name: `Camp:`, value: `${officerSelection.Officer_Camp}`, inline: true },
                { name: `Officer Type:`, value: `${officerSelection.Officer_Type}`, inline: true },
                { name: `Skill:`, value: `${officerSelection.Skill}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
        const saveNewOfficer = await sql.Execute(`INSERT INTO playerofficers (Discord_ID, Officer_ID, Officer_Type, Officer_Name, Officer_Camp, Skill, Image) 
        VALUES ('${interaction.member.id}', '${officerSelection.Officer_ID}', '${officerSelection.Officer_Type}', '${officerSelection.Officer_Name}', '${officerSelection.Officer_Camp}', '${officerSelection.Skill}', '${officerSelection.Image}')`)
        const updateNewOfficer = await sql.Execute(`UPDATE levels SET officer_name = '${officerSelection.Officer_Name}', officer_level = '0', skill_level = '0' WHERE discord_id = '${interaction.member.id}'`)
        console.log(`Update New Officer:${updateNewOfficer.info}`)
        console.log(`Save New Officer:${saveNewOfficer.info}`)

        return interaction.update({ embeds: [newOfficerEmbed], components: [newOfficerButtons], files: [playerImage] })
    },
    campaignSelection: async function (campaign) { //Medium is Starter Troop
        let unitCamps = [
            "Liberty",
            "MartyrsW",
            "Vanguard"
        ]
        //Random Campaign Camp Selection
        const unitCampSelection = unitCamps[Math.floor(Math.random() * unitCamps.length)]
        console.log(unitCampSelection)
        //if (campaign === 0) return campaignUnitLevel = '9.2', campaignUnitType = 'MediumTanks', campaignUnitCamp = 'Liberty', campaignOfficer = 'Sergeant Spanner', campaignOfficerLevel = 1500, campaignBaseLevel = 1500, skillLevel = 15
        if (campaign === 1) return campaignUnitLevel = '9.2', campaignUnitType = 'MediumTanks', campaignUnitCamp = unitCampSelection, campaignOfficer = 'Sergeant Spanner', campaignOfficerLevel = 50, campaignBaseLevel = 50, skillLevel = 0
        if (campaign === 2) return campaignUnitLevel = '9.2', campaignUnitType = 'Infantry', campaignUnitCamp = unitCampSelection, campaignOfficer = 'White Wolf', campaignOfficerLevel = 100, campaignBaseLevel = 100, skillLevel = 1
        if (campaign === 3) return campaignUnitLevel = '9.2', campaignUnitType = 'TankHunters', campaignUnitCamp = unitCampSelection, campaignOfficer = 'Death Adder', campaignOfficerLevel = 150, campaignBaseLevel = 150, skillLevel = 2
        if (campaign === 4) return campaignUnitLevel = '9.2', campaignUnitType = 'Infantry', campaignUnitCamp = unitCampSelection, campaignOfficer = 'Angel of Light', campaignOfficerLevel = 200, campaignBaseLevel = 200, skillLevel = 3
        if (campaign === 5) return campaignUnitLevel = '9.2', campaignUnitType = 'Howitzers', campaignUnitCamp = 'MartyrsW', campaignOfficer = 'The Erupter', campaignOfficerLevel = 250, campaignBaseLevel = 250, skillLevel = 4
        if (campaign === 6) return campaignUnitLevel = '9.2', campaignUnitType = 'HeavyTanks', campaignUnitCamp = unitCampSelection, campaignOfficer = 'Bloody Mary', campaignOfficerLevel = 300, campaignBaseLevel = 300, skillLevel = 5
        if (campaign === 7) return campaignUnitLevel = '9.2', campaignUnitType = 'TankHunters', campaignUnitCamp = unitCampSelection, campaignOfficer = 'Tip of the Spear', campaignOfficerLevel = 350, campaignBaseLevel = 350, skillLevel = 6
        if (campaign === 8) return campaignUnitLevel = '9.2', campaignUnitType = 'MediumTanks', campaignUnitCamp = unitCampSelection, campaignOfficer = 'Steel Fighter', campaignOfficerLevel = 400, campaignBaseLevel = 400, skillLevel = 7
        if (campaign === 9) return campaignUnitLevel = '9.2', campaignUnitType = 'MediumTanks', campaignUnitCamp = unitCampSelection, campaignOfficer = 'Thorn Countess', campaignOfficerLevel = 450, campaignBaseLevel = 450, skillLevel = 8
        if (campaign === 10) return campaignUnitLevel = '9.2', campaignUnitType = 'LightTanks', campaignUnitCamp = 'Liberty', campaignOfficer = 'Valkyrie', campaignOfficerLevel = 500, campaignBaseLevel = 500, skillLevel = 9
        if (campaign === 11) return campaignUnitLevel = '9.2', campaignUnitType = 'HeavyTanks', campaignUnitCamp = unitCampSelection, campaignOfficer = 'Whip Cracker', campaignOfficerLevel = 550, campaignBaseLevel = 550, skillLevel = 10
        if (campaign === 12) return campaignUnitLevel = '9.2', campaignUnitType = 'Infantry', campaignUnitCamp = unitCampSelection, campaignOfficer = 'Vox Veritatis', campaignOfficerLevel = 600, campaignBaseLevel = 600, skillLevel = 11
        if (campaign === 13) return campaignUnitLevel = '9.2', campaignUnitType = 'HeavyTanks', campaignUnitCamp = unitCampSelection, campaignOfficer = 'Lady Justice', campaignOfficerLevel = 650, campaignBaseLevel = 650, skillLevel = 12
        if (campaign === 14) return campaignUnitLevel = '9.2', campaignUnitType = 'Infantry', campaignUnitCamp = unitCampSelection, campaignOfficer = 'Iron Bastion', campaignOfficerLevel = 700, campaignBaseLevel = 700, skillLevel = 13
        if (campaign === 15) return campaignUnitLevel = '9.2', campaignUnitType = 'SuperHeavyTanks', campaignUnitCamp = 'Vanguard', campaignOfficer = 'Guardian of Truth', campaignOfficerLevel = 750, campaignBaseLevel = 750, skillLevel = 14
        if (campaign === 16) return campaignUnitLevel = '9.2', campaignUnitType = 'Howitzers', campaignUnitCamp = 'Liberty', campaignOfficer = 'Eye of Providence', campaignOfficerLevel = 800, campaignBaseLevel = 800, skillLevel = 15
        if (campaign === 17) return campaignUnitLevel = '9.2', campaignUnitType = 'Howitzers', campaignUnitCamp = 'MartyrsW', campaignOfficer = 'Antonina Shevchenko', campaignOfficerLevel = 850, campaignBaseLevel = 850, skillLevel = 16
        if (campaign === 18) return campaignUnitLevel = '9.2', campaignUnitType = 'AntiTankGuns', campaignUnitCamp = 'Vanguard', campaignOfficer = 'Saber of the Nation', campaignOfficerLevel = 900, campaignBaseLevel = 900, skillLevel = 17
        if (campaign === 19) return campaignUnitLevel = '9.2', campaignUnitType = 'HeavyTanks', campaignUnitCamp = unitCampSelection, campaignOfficer = 'Golden Eagle', campaignOfficerLevel = 950, campaignBaseLevel = 950, skillLevel = 18
        if (campaign === 20) return campaignUnitLevel = '9.2', campaignUnitType = 'HeavyTanks', campaignUnitCamp = unitCampSelection, campaignOfficer = 'Tiger Marauder', campaignOfficerLevel = 1000, campaignBaseLevel = 1000, skillLevel = 18
        if (campaign === 21) return campaignUnitLevel = '9.2', campaignUnitType = 'Bombers', campaignUnitCamp = unitCampSelection, campaignOfficer = 'El Cartero', campaignOfficerLevel = 1050, campaignBaseLevel = 1050, skillLevel = 19
        if (campaign === 22) return campaignUnitLevel = '9.2', campaignUnitType = 'Fighters', campaignUnitCamp = unitCampSelection, campaignOfficer = 'Brisk Eagle', campaignOfficerLevel = 1100, campaignBaseLevel = 1100, skillLevel = 19
        if (campaign === 23) return campaignUnitLevel = '9.2', campaignUnitType = 'Fighters', campaignUnitCamp = unitCampSelection, campaignOfficer = 'The Witcher', campaignOfficerLevel = 1150, campaignBaseLevel = 1150, skillLevel = 20
        if (campaign === 24) return campaignUnitLevel = '9.2', campaignUnitType = 'Fighters', campaignUnitCamp = unitCampSelection, campaignOfficer = 'Polar Phantom', campaignOfficerLevel = 1200, campaignBaseLevel = 1200, skillLevel = 20
        if (campaign === 25) return campaignUnitLevel = '9.2', campaignUnitType = 'Fighters', campaignUnitCamp = unitCampSelection, campaignOfficer = 'Silver Comet', campaignOfficerLevel = 1250, campaignBaseLevel = 1250, skillLevel = 20
        module.exports = {
            campaignUnitLevel: campaignUnitLevel,
            campaignUnitType: campaignUnitType,
            campaignUnitCamp: campaignUnitCamp,
            campaignOfficer: campaignOfficer,
            campaignOfficerLevel: campaignOfficerLevel,
            campaignBaseLevel: campaignBaseLevel,
            skillLevel: skillLevel
        }
    },
    skillupgrade: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const unitDetails = await sql.Execute(`SELECT * FROM units WHERE Camp = '${Level[0].unit_camp}' AND Unit_type = '${Level[0].unit_type}' AND Unit_Level = '${Level[0].unit_level}'`)
        const image = Level[0].unit_image || 'GeneralDeath.png'
		const playerImage = new AttachmentBuilder(`./img/${image}`)
        const playerThumbnail = interaction.member.displayAvatarURL({ dynamic: true })

        let CampColour = Colours.Black
        if (Level[0].unit_camp === 'Vanguard') {
            CampColour = Colours.VanguardBoost
        }
        if (Level[0].unit_camp === 'Liberty') {
            CampColour = Colours.LibertyBoost
        }
        if (Level[0].unit_camp === 'MartyrsW') {
            CampColour = Colours.MartyrsWBoost
        }
        const skillUpgradeEmbed = new EmbedBuilder();
        const skillUpgradeButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("skillupgrade")
                    .setLabel('Confirm Upgrade')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Cancel Upgrade')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId("profile")
                    .setLabel('Profile')
                    .setStyle(ButtonStyle.Secondary),
            )
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name
        const wallet = Level[0].war_coins
        const bank = Level[0].war_chest
        const officerLevel = Level[0].officer_level
        const skillLevel = Level[0].skill_level
        const officerLevelRequired = (skillLevel + 1) * 50
        const baseLevel = Level[0].base_level
        const cost = (skillLevel + 1) * 1000000 * (Level[0].prestige + 1)

        if (officerLevelRequired > officerLevel) {
            console.log(`Officer Upgrade Needed`),
            skillUpgradeEmbed
                    .setColor(CampColour)
                    .setThumbnail(playerThumbnail)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`${interaction.member}, You need to upgrade your **Officer** to apply this **Skill** Upgrade.`)
                    .addFields(
                        { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                        { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                        { name: `Officer Level:`, value: `${officerLevel}`, inline: true },
                        { name: `Officer Level Required:`, value: `${officerLevelRequired}`, inline: true },

                    )
                    .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
            return interaction.update({ embeds: [skillUpgradeEmbed], components: [skillUpgradeButtons], files: [playerImage] })
        }


        if (cost > wallet) {
            console.log(`No Money`),
                difference = cost - wallet
            skillUpgradeEmbed
                .setColor(CampColour)
                .setThumbnail(playerThumbnail)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setDescription(`${interaction.member}, You do not have enough **War-Coins** for this upgrade.\nYou are **$${difference.toLocaleString()} War-Coins** short!\nTry withdrawing from your **War-Chest**!`)
                .addFields(
                    { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                    { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                    { name: `Base Level:`, value: `${baseLevel}`, inline: true },
                    { name: `Officer Level:`, value: `${officerLevel}`, inline: true },
                    { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
                )
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
            return interaction.update({ embeds: [skillUpgradeEmbed], components: [skillUpgradeButtons], files: [playerImage] })
        }
        const newWallet = wallet - cost
        const newSkillLevel = skillLevel + 1
        skillUpgradeEmbed
            .setColor(CampColour)
            .setThumbnail(playerThumbnail)
            .setTimestamp()
            .setDescription(`**${interaction.member}, Officer Skill Upgrade Successful**`)
            .addFields(
                { name: `War-Coins:`, value: `$${newWallet.toLocaleString()}`, inline: true },
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                { name: `New Level:`, value: `${newSkillLevel}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

            const playerOfficerUpgrade = await sql.Execute(`UPDATE playerofficers SET Skill_Level = '${newSkillLevel}' WHERE Discord_ID = '${interaction.member.id}' AND Officer_Name = '${Level[0].officer_name}'`)
            const officerUpgrade = await sql.Execute(`UPDATE levels SET war_coins = ${newWallet}, skill_level = '${newSkillLevel}' WHERE discord_id = '${interaction.member.id}'`)
            console.log(`Update Player Officer: ${playerOfficerUpgrade.info}`)
            console.log(`Officer Upgrade: ${officerUpgrade.info}`)
        return interaction.update({ embeds: [skillUpgradeEmbed], components: [skillUpgradeButtons], files: [playerImage] })
    },
skillColours: async function (interaction) {    
        if (interaction.Attacker.UnitCamp === 'Vanguard') {interaction.Attacker.Color = Colours.Vanguard}
        if (interaction.Attacker.UnitCamp === 'Liberty') {interaction.Attacker.Color = Colours.Liberty}
        if (interaction.Attacker.UnitCamp === 'MartyrsW') {interaction.Attacker.Color = Colours.MartyrsW}

        if (interaction.Attacker.UnitCamp && interaction.Attacker.OfficerCamp === 'Vanguard') {interaction.Attacker.SkillColor = Colours.VanguardBoost}
        if (interaction.Attacker.UnitCamp && interaction.Attacker.OfficerCamp === 'Liberty') {interaction.Attacker.SkillColor = Colours.LibertyBoost}
        if (interaction.Attacker.UnitCamp && interaction.Attacker.OfficerCamp === 'MartyrsW') {interaction.Attacker.SkillColor = Colours.MartyrsWBoost}
        
        if (interaction.Defender.UnitCamp === 'Vanguard') {interaction.Defender.Color = Colours.Vanguard}
        if (interaction.Defender.UnitCamp === 'Liberty') {interaction.Defender.Color = Colours.Liberty}
        if (interaction.Defender.UnitCamp === 'MartyrsW') {interaction.Defender.Color = Colours.MartyrsW}

        if (interaction.Defender.UnitCamp && interaction.Defender.OfficerCamp === 'Vanguard') {interaction.Defender.SkillColor = Colours.VanguardBoost}
        if (interaction.Defender.UnitCamp && interaction.Defender.OfficerCamp === 'Liberty') {interaction.Defender.SkillColor = Colours.LibertyBoost}
        if (interaction.Defender.UnitCamp && interaction.Defender.OfficerCamp === 'MartyrsW') {interaction.Defender.SkillColor = Colours.MartyrsWBoost}
    },
battleBotHelp: async function (interaction) {  
            const guildName = interaction.member.guild.name
            const guildIcon = interaction.member.guild.iconURL();
            const embed = new EmbedBuilder();
            const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
            const image = Level[0].unit_image || 'GeneralDeath.png'
            const playerImage = new AttachmentBuilder(`./img/${image}`)    
			const helpButtons = new ActionRowBuilder()
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
			embed			
				.setColor(Colours.Black)
				.setTitle(`Battle Bot™ Help Menu`)
				.setDescription(`**Battle Bot™** has an integrated **AI help system**.\nMention ${interaction.client.user} with any **Battle Bot™** related questions.\nBelow are the **Basic Commands & Options** in **Battle Bot™**!`)
				.setFooter({ text: `${guildName} - Battle-Bot Help`, iconURL: `${guildIcon}`})
				.addFields(
					{ name: `Battle-Bot Profile:`, value: `**/Battle-Bot Profile** is the **Main Menu** of the game. From here you can switch between **Officers** & **Units** as well as **Challenge Yourself** against the **Campaigns** every **12 Hours**. You can also upgrade your **War-Chest** & **War-Base**. Recruit and power up your **Officers** as well as train and skill your **Units**.`, inline: true },
					{ name: `War-Coins:`, value: `**War-Coins** are the **Currency** of the **Battle Bot™**.\nNeeded for upgrading your **War-Chest** & **War_Base** to gain access to **Officers, Units & Skills**`, inline: true },
					{ name: `War-Chest:`, value: `Your **War-Chest** is your secure storage for the **War-Coins** earned on your adventures.\nHigher level **War-Chest** allows you to safely store even more **War-Coins**.\n**Start** by upgrading your **War-Base** to **Level 3!** This will allow you to pick your **First Unit**`, inline: true },
					{ name: `Battle:`, value: `**/Battle** allows to to compare your best **Officer & Unit** combinations on fellow battlers in your server. All **Winnings** are system generated and not taken from the player.\nEach victory goes towards your **Weekly Battle Score** and this command has a **Cooldown** of **15 minutes**.\n**Top 3 Warriors** in each server will receive a reward of **War-Coins** each week. Use **/Battle-LB** for more information.`, inline: true },
					{ name: `Daily Reward:`, value: `Active Warriors can claim their **Daily Reward** once every **12 Hours** using **/daily**.\nBetter rewards are offered to high level **Officers**.`, inline: true },
					{ name: `Work:`, value: `To help with supplies, you can carry out random **Work Orders** every **4 Hours**. The rewards increase with a higher appointed **Officer**. Use **/work**.`, inline: true },
					{ name: `Steal:`, value: `Use the **/Steal** command every **15 Minutes** to take **War-Coins** from any player who has not secured them into their **War-Chest**.`, inline: true },
					{ name: `Battle Bot™ AI:`, value: `**Battle Bot™** has a comprehensive **AI help function**.\nSimply mention ${interaction.client.user} with your queries!`, inline: true },
				);
				await interaction.update({embeds: [embed], files: [playerImage], components: [helpButtons] })

    }
}