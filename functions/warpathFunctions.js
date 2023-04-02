const sql = require("../config/Database");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
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
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
            .addFields(
                { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                { name: `Current Level:`, value: `${baseLevel}`, inline: true },
                { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
        return interaction.update({ embeds: [upgradeEmbed], components: [upgradeBase] })

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
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`${interaction.member}, You need to upgrade your **War-Base** for this upgrade.`)
                    .addFields(
                        { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                        { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                        { name: `Bank Level:`, value: `${bankLevel}`, inline: true },
                        { name: `Base Level:`, value: `${baseLevel}`, inline: true },
                    )
                    .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

            return interaction.update({ embeds: [upgradeBankEmbed], components: [upgradeButtons] })
        }
        if (cost > wallet) {
            console.log(`No Money`),
                difference = cost - wallet
            upgradeBankEmbed
                .setColor('#ff5b05')
                .setThumbnail(guildIcon)
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

            return interaction.update({ embeds: [upgradeBankEmbed], components: [upgradeBankButtons] })
        }
        const newWallet = wallet - cost
        const newBank = bankLevel + 1
        upgradeBankEmbed
            .setColor('#ff5b05')
            .setThumbnail(guildIcon)
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
        return interaction.update({ embeds: [upgradeBankEmbed], components: [upgradeButtons] })
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
        if (baseLevel > bankLevel) {
            console.log(`Chest Upgrade Needed`),
                upgradeBaseEmbed
                    .setColor('#ff5b05')
                    .setThumbnail(guildIcon)
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

            return interaction.update({ embeds: [upgradeBaseEmbed], components: [upgradeButtons] })
        }


        if (cost > wallet) {
            console.log(`No Money`),
                difference = cost - wallet
            upgradeBaseEmbed
                .setColor('#ff5b05')
                .setThumbnail(guildIcon)
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
            return interaction.update({ embeds: [upgradeBaseEmbed], components: [upgradeBaseButtons] })
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
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
        const baseUpgrade = await sql.Execute(`UPDATE levels SET war_coins = ${newWallet}, base_level = '${newBase}' WHERE discord_id = '${interaction.member.id}'`)
        console.log(`Base ${baseUpgrade.info}`)
        return interaction.update({ embeds: [upgradeBaseEmbed], components: [upgradeButtons] })

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

        if (officerLevel > baseLevel) {
            console.log(`Base Upgrade Needed`),
                upgradeOfficerEmbed
                    .setColor('#ff5b05')
                    .setThumbnail(guildIcon)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`${interaction.member}, You need to upgrade your **War-Base** for this upgrade.`)
                    .addFields(
                        { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                        { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                        { name: `Base Level:`, value: `${baseLevel}`, inline: true },
                    )
                    .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

            return interaction.update({ embeds: [upgradeOfficerEmbed], components: [upgradeButtons] })
        }


        if (cost > wallet) {
            console.log(`No Money`),
                difference = cost - wallet
            upgradeOfficerEmbed
                .setColor('#ff5b05')
                .setThumbnail(guildIcon)
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
            return interaction.update({ embeds: [upgradeOfficerEmbed], components: [upgradeOfficerButtons] })
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
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
        const baseUpgrade = await sql.Execute(`UPDATE levels SET war_coins = ${newWallet}, officer_level = '${newOfficer}' WHERE discord_id = '${interaction.member.id}'`)

        return interaction.update({ embeds: [upgradeOfficerEmbed], components: [upgradeButtons] })

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
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
            .setDescription(`**${interaction.member}, What would you like to upgrade**?`)
            .addFields(
                { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
        return interaction.update({ embeds: [upgradeEmbed], components: [upgradeButtons] })

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
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
            .setDescription(`**${interaction.member}, Confirm the upgrade your War-Chest**?`)
            .addFields(
                { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                { name: `Current Level:`, value: `${bankLevel}`, inline: true },
                { name: `Upgrade Cost:`, value: `$${cost.toLocaleString()}`, inline: true },
            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

        return interaction.update({ embeds: [upgradeChestEmbed], components: [upgradeChestButtons] })
    },
    officerSelect: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const selectOfficerEmbed = new EmbedBuilder();
        const selectOfficerButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Success),
            )
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name
        const Officer = await sql.Execute(`SELECT Officer_Name, Officer_Camp, Skill FROM officers WHERE Officer_Type = 'GROUND'`)
        const officerSelection = Officer[Math.floor(Math.random() * Officer.length)]

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
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
        const updateOfficer = await sql.Execute(`UPDATE levels SET officer_name	= '${officerSelection.Officer_Name}', officer_level = '1' WHERE discord_id = '${interaction.member.id}'`)
        console.log(updateOfficer.info)
        return interaction.update({ embeds: [selectOfficerEmbed], components: [selectOfficerButtons] })

    },
    officerUpgrade: async function (interaction) {
        const upgradeOfficerEmbed = new EmbedBuilder();
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.guild.name
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const wallet = Level[0].war_coins
        const bank = Level[0].war_chest
        const baseLevel = Level[0].base_level
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
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setDescription(`${interaction.member}, You need to upgrade your **Base** to Select your **Officer**?`)
                .addFields(
                    { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                    { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                    { name: `Base Level:`, value: `${baseLevel}`, inline: true },
                )
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

            return interaction.update({ embeds: [upgradeOfficerEmbed], components: [upgradeButtons] })
        }
        const officer = Level[0].officer_name

        if (officer === '') {

            upgradeOfficerEmbed
                .setColor('#ff5b05')
                .setThumbnail(guildIcon)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setDescription(`**${interaction.member}**, First you need to select your **Officer**!`)
                .addFields(
                    { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                    { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                )
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

            return interaction.update({ embeds: [upgradeOfficerEmbed], components: [chooseOfficerButtons] })

        } else
            upgradeOfficerEmbed
                .setColor('#ff5b05')
                .setThumbnail(guildIcon)
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

        return interaction.update({ embeds: [upgradeOfficerEmbed], components: [upgradeOfficerButtons] })
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
        const prestige = Level[0].prestige + 1
        const officerLevel = Level[0].officer_level
        const cost = (unitLevel + 1) * (125000 * prestige)

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
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setDescription(`${interaction.member}, You need to upgrade your **Officer** to Select your **Unit**?`)
                .addFields(
                    { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                    { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                    { name: `Unit Level:`, value: `${unitLevel}`, inline: true },
                )
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

            return interaction.update({ embeds: [upgradeUnitEmbed], components: [upgradeButtons] })
        } else
            if (unitLevel === '0.0') {

                upgradeUnitEmbed
                    .setColor('#ff5b05')
                    .setThumbnail(guildIcon)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`**${interaction.member}**, First you need to select your **Unit**!`)
                    .addFields(
                        { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                        { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                    )
                    .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

                return interaction.update({ embeds: [upgradeUnitEmbed], components: [chooseUnitButtons] })

            } else
                upgradeUnitEmbed
                    .setColor('#ff5b05')
                    .setThumbnail(guildIcon)
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

        return interaction.update({ embeds: [upgradeUnitEmbed], components: [upgradeUnitButtons] })
    },
    unitSelect: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const selectUnitEmbed = new EmbedBuilder();
        const selectUnitButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Success),
            )
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name
        const Unit = await sql.Execute(`SELECT * FROM units WHERE Unit_Level = '4.0' AND Unit_Type = 'MediumTanks'`)
        const unitSelection = Unit[Math.floor(Math.random() * Unit.length)]

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
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

        const saveUnit = await sql.Execute(`INSERT INTO playerunits (discord_id, camp, unit_type, unit_level) VALUES ('${interaction.member.id}', '${unitSelection.Camp}', '${unitSelection.Unit_Type}', '${unitSelection.Unit_Level}')`)
        console.log(saveUnit.info)

        const updateOfficer = await sql.Execute(`UPDATE levels SET Unit_Camp = '${unitSelection.Camp}', Unit_Type = '${unitSelection.Unit_Type}', Unit_Level = '${unitSelection.Unit_Level}' WHERE discord_id = '${interaction.member.id}'`)
        console.log(updateOfficer.info)
        return interaction.update({ embeds: [selectUnitEmbed], components: [selectUnitButtons] })
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
                    .setLabel('Select New Unit')
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
        const prestige = Level[0].prestige + 1
        const cost = (unitLevel + 1) * (125000 * prestige)

        if (unitLevel === '9.2') {
            console.log(`Unit Maxed`),

                upgradeUnitEmbed
                    .setColor('#ff5b05')
                    .setThumbnail(guildIcon)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`${interaction.member}, You have already **Maxed** your **${unitType}**.\nUpgrade your **Officer** to increase your **Battle Rewards**!\nUpgrade your **War-Base** to increase your **Unit Strength**!\nSelect **New Unit** below to receive your next **Unit**`)
                    .addFields(
                        { name: `War-Coins:`, value: `$${wallet.toLocaleString()}`, inline: true },
                        { name: `War-Chest:`, value: `$${bank.toLocaleString()}`, inline: true },
                        { name: `Unit Level:`, value: `${unitLevel}`, inline: true },
                    )
                    .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });

            return interaction.update({ embeds: [upgradeUnitEmbed], components: [newUnitButtons] })
        }

        if (unitLevel > officerLevel) {
            console.log(`Officer Upgrade Needed`),
                upgradeUnitEmbed
                    .setColor('#ff5b05')
                    .setThumbnail(guildIcon)
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

            return interaction.update({ embeds: [upgradeUnitEmbed], components: [upgradeButtons] })
        } else


            if (cost > wallet) {
                console.log(`No Money`),
                    difference = cost - wallet
                upgradeUnitEmbed
                    .setColor('#ff5b05')
                    .setThumbnail(guildIcon)
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
                return interaction.update({ embeds: [upgradeUnitEmbed], components: [upgradeUnitButtons] })
            }
        const newWallet = (wallet - cost)
        const newUnit = await sql.Execute(`SELECT * FROM units WHERE Camp = '${camp}' AND Unit_Type = '${unitType}' AND Unit_Level > '${unitLevel}'`)
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
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });


        const unitUpgrade = await sql.Execute(`UPDATE levels SET War_Coins = ${newWallet}, Unit_Level = '${newLevel}' WHERE discord_id = '${interaction.member.id}'`)
        console.log(unitUpgrade.info)

        const updateUnit = await sql.Execute(`UPDATE playerunits SET unit_level = '${Level[0].unit_level}' WHERE discord_id = '${interaction.member.id}' AND camp = '${Level[0].unit_camp}' AND unit_type = '${Level[0].unit_type}'`)
        console.log(updateUnit.info)


        return interaction.update({ embeds: [upgradeUnitEmbed], components: [upgradeButtons] })
    },
    profile: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)

        const profileEmbed = new EmbedBuilder();
        const profileButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("campaign")
                    .setLabel('Raven Campaign')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("challenge")
                    .setLabel('Pro Challenge Mode')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("selectunit")
                    .setLabel('Select Unit')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("selectofficer")
                    .setLabel('Select Officer')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Primary),
            )
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name
        const officerLevel = Level[0].officer_level || 'No Officer Chosen'
        const officer = Level[0].officer_name || 'No Officer Chosen'
        const unitType = Level[0].unit_type || 'No Unit Trained'
        const unitLevel = Level[0].unit_level || 'No Unit Trained'
        const unitCamp = Level[0].unit_camp || 'No Unit Trained'
        const officerDetails = await sql.Execute(`SELECT * from officers WHERE Officer_Name = '${officer}'`)
        const officerType = officerDetails[0].Officer_Type || 'No Officer Chosen'
        const officerCamp = officerDetails[0].Officer_Camp || 'No Officer Chosen'
        const officerSkill = officerDetails[0].Skill || 'No Officer Chosen'
        const unitDetails = await sql.Execute(`SELECT * FROM units WHERE Camp = '${Level[0].unit_camp}' AND Unit_type = '${Level[0].unit_type}' AND Unit_Level = '${Level[0].unit_level}'`)

        profileEmbed

            .setColor('#ff5b05')
            .setThumbnail(guildIcon)
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
                { name: `Unit Type:`, value: `${unitType}`, inline: false },
                { name: `Unit Level:`, value: `${unitLevel}`, inline: false },
                { name: `Attack Type:`, value: `${unitDetails[0].Attack_Type}`, inline: false },
                { name: `Unit Camp:`, value: `${unitCamp}`, inline: false },

            )
            .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });


        return interaction.update({ empheral: true, embeds: [profileEmbed], components: [profileButtons] })

    },
    newUnit: async function (interaction) {
        const Level = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const prestige = Level[0].prestige
        const newPrestige = prestige + 1
        const newUnitEmbed = new EmbedBuilder();
        const newUnitButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Success),
            )
        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name

        newUnitSelection = async function (prestige) {
            if (prestige === 0) return newUnitLevel = '5.0', newUnitType = 'Fighters'
            if (prestige === 1) return newUnitLevel = '4.0', newUnitType = 'Infantry'
            if (prestige === 2) return newUnitLevel = '5.0', newUnitType = 'SuperHeavy'
            if (prestige === 3) return newUnitLevel = '4.0', newUnitType = 'Howitzers'
            if (prestige === 4) return newUnitLevel = '5.0', newUnitType = 'Bombers'
            if (prestige === 5) return newUnitLevel = '4.0', newUnitType = 'TankHunters'
            if (prestige === 6) return newUnitLevel = '5.0', newUnitType = 'RocketLaunchers'
            if (prestige === 7) return newUnitLevel = '4.0', newUnitType = 'HeavyTanks'
            module.exports.newUnitLevel = newUnitLevel
            module.exports.newUnitType = newUnitType
        }
        newUnitSelection(prestige)

        let presigeRequired = newPrestige * 10 - 1
        console.log(presigeRequired, Level[0].officer_level)
        if (presigeRequired >= Level[0].officer_level) {
            console.log(`Officer Upgrade Required`)
            newUnitEmbed
                .setColor('#ff5b05')
                .setThumbnail(guildIcon)
                .setTimestamp()
                .setDescription(`**${interaction.member}, Officer Upgrade Required**\nRequired Level: ${presigeRequired}`)
                .setFooter({ text: `${guildName} - ${interaction.customId}`, iconURL: `${guildIcon}` });
            return interaction.update({ embeds: [newUnitEmbed], components: [newUnitButtons] })
        } else console.log(`No Officer Upgrade Required`)

        const Unit = await sql.Execute(`SELECT * FROM units WHERE Unit_Level = '${newUnitLevel}' AND Unit_Type LIKE '%${newUnitType}%'`)
        const unitSelection = Unit[Math.floor(Math.random() * Unit.length)]

        newUnitEmbed
            .setColor('#ff5b05')
            .setThumbnail(guildIcon)
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
        const updateUnit = await sql.Execute(`UPDATE playerunits SET unit_level = '${Level[0].unit_level}' WHERE discord_id = '${interaction.member.id}' AND camp = '${Level[0].unit_camp}' AND unit_type = '${Level[0].unit_type}'`)
        console.log(updateUnit.info)
        const saveNewUnit = await sql.Execute(`INSERT INTO playerunits (discord_id, camp, unit_type, unit_level) VALUES ('${interaction.member.id}', '${unitSelection.Camp}', '${unitSelection.Unit_Type}', '${unitSelection.Unit_Level}')`)
        const updateNewUnit = await sql.Execute(`UPDATE levels SET Unit_Camp = '${unitSelection.Camp}', Unit_Type = '${unitSelection.Unit_Type}', Unit_Level = '${unitSelection.Unit_Level}', prestige = '${newPrestige}' WHERE discord_id = '${interaction.member.id}'`)
        console.log(updateNewUnit.info)
        console.log(saveNewUnit.info)

        return interaction.update({ embeds: [newUnitEmbed], components: [newUnitButtons] })
    },
    attackSelection: async function (Attacker, Defender) {
        if (Attacker.AttackType === 'Ground' && Defender.AttackType === 'Ground') return Attacker.Multiplier = Attacker.Multiplier * 1, Defender.Multiplier = Defender.Multiplier * 1
        if (Attacker.AttackType === 'Air' && Defender.AttackType === 'Air') return Attacker.Multiplier = Attacker.Multiplier * 1, Defender.Multiplier = Defender.Multiplier * 1
        if (Attacker.AttackType === 'Air' && Defender.AttackType === 'Ground') return Attacker.Multiplier = Attacker.Multiplier * 1.25, Defender.Multiplier = Defender.Multiplier * 0.75
        if (Attacker.AttackType === 'Ground' && Defender.AttackType === 'Air') return Attacker.Multiplier = Attacker.Multiplier * 0.75, Defender.Multiplier = Defender.Multiplier * 1.25
    },
    newUnitSelection: async function (prestige) {
        if (prestige === 0) return newUnitLevel = '5.0', newUnitType = 'Fighters'
        if (prestige === 1) return newUnitLevel = '4.0', newUnitType = 'Infantry'
        if (prestige === 2) return newUnitLevel = '5.0', newUnitType = 'SuperHeavy'
        if (prestige === 3) return newUnitLevel = '4.0', newUnitType = 'Howitzers'
        if (prestige === 4) return newUnitLevel = '5.0', newUnitType = 'Bombers'
        if (prestige === 5) return newUnitLevel = '4.0', newUnitType = 'TankHunters'
        if (prestige === 6) return newUnitLevel = '5.0', newUnitType = 'RocketLaunchers'
        if (prestige === 7) return newUnitLevel = '4.0', newUnitType = 'HeavyTanks'
        module.exports.newUnitLevel = newUnitLevel
        module.exports.newUnitType = newUnitType
    },
    campSelection: async function (Attacker, Defender) {
        if (Attacker.UnitCamp === Attacker.OfficerCamp) return Attacker.Multiplier = Attacker.Multiplier + Attacker.Multiplier
        if (Defender.UnitCamp === Defender.OfficerCamp) return Defender.Multiplier = Defender.Multiplier + Defender.Multiplier
        if (Attacker.UnitCamp === Attacker.OfficerCamp && Attacker.AttackType === Attacker.OfficerType) return Attacker.Multiplier = Attacker.Multiplier + Attacker.Multiplier + Attacker.Multiplier + Attacker.Multiplier
        if (Defender.UnitCamp === Defender.OfficerCamp && Defender.AttackType === Defender.OfficerType) return Defender.Multiplier = Defender.Multiplier + Defender.Multiplier + Defender.Multiplier + Defender.Multiplier
        console.log(Attacker.Multiplier, Defender.Multiplier)
        //module.exports.attackerMultipler = attackerMultipler
        //module.exports.defenderMultipler = defenderMultipler
    },
    selectunit: async function (interaction) {
        const playerUnits = await sql.Execute(`SELECT * FROM playerunits WHERE discord_id = '${interaction.member.id}'`)
        const unitChoices = [];
        for (const entry in playerUnits) {
            const id = playerUnits[entry].discord_id
            const camp = playerUnits[entry].camp
            const type = playerUnits[entry].unit_type
            const level = playerUnits[entry].unit_level

            unitChoices.push({
                label: type,
                description: `${camp} - ${type} - ${level}`,
                value: type.toString()
            })
        }
        const unitMenu = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("selectunitmenu")
                    .setPlaceholder('Select your Unit')
                    .addOptions(unitChoices),
            )
        const selectUnitButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Success),
            )
        const selectUnitEmbed = new EmbedBuilder()
            .setColor('#ff5b05')
            .setThumbnail(guildIcon)
            .setTimestamp()
            .setTitle(`Select Your Unit!`)
        interaction.update({
            embeds: [selectUnitEmbed],
            components: [unitMenu]
        })
    },
    selectunitmenu: async function (interaction) {
        const selected = interaction.values[0]
        const selectedUnit = await sql.Execute(`SELECT * FROM playerunits WHERE discord_id = '${interaction.member.id}' AND unit_type = '${selected}'`)
        const newUnitSelect = await sql.Execute(`SELECT * FROM units WHERE Camp = '${selectedUnit[0].camp}' AND Unit_Type = '${selectedUnit[0].unit_type}' AND Unit_Level = '${selectedUnit[0].unit_level}'`)
        const playerProfile = await sql.Execute(`SELECT * FROM levels WHERE discord_id = '${interaction.member.id}'`)
        const firepower = newUnitSelect[0].Firepower * playerProfile[0].officer_level
        const HP = newUnitSelect[0].HP * playerProfile[0].base_level * 10
        const unitImage = `http://phfamily.co.uk/img/${newUnitSelect[0].Image}`
        const updateUnit = await sql.Execute(`UPDATE levels SET unit_level = '${selectedUnit[0].unit_level}', unit_camp = '${selectedUnit[0].camp}', unit_type = '${selectedUnit[0].unit_type}' WHERE discord_id = '${interaction.member.id}'`)
        const selectUnitMenuButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("cancel")
                .setLabel('Upgrade')
                .setStyle(ButtonStyle.Success),
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId("profile")
                .setLabel('Profile')
                .setStyle(ButtonStyle.Secondary),
        )
        const selectedUnitEmbed = new EmbedBuilder()
            .setTitle(`${selected} chosen`)
            .setColor('#ff5b05')
            .setImage(unitImage)
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
            components: [selectUnitMenuButtons]
        })

    },
    selectofficer: async function (interaction) {
        const selectOfficerButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Success),
            )
        const selectOfficerEmbed = new EmbedBuilder()
            .setDescription(`Coming Soon...`)
            .setTitle(`Select Your Officer!`)
        interaction.update({
            embeds: [selectOfficerEmbed],
            components: [selectOfficerButtons]
        })
    },
    campaign: async function (interaction) {
        const campaignButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Success),
            )
        const campaignEmbed = new EmbedBuilder()
            .setDescription(`Coming Soon...`)
            .setTitle(`Campaign Mode!`)
        interaction.update({
            embeds: [campaignEmbed],
            components: [campaignButtons]
        })
    },
    challenge: async function (interaction) {
        const challengeButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel('Upgrade')
                    .setStyle(ButtonStyle.Success),
            )
        const challengeEmbed = new EmbedBuilder()
            .setDescription(`Coming Soon...`)
            .setTitle(`Challenge Mode!`)
        interaction.update({
            embeds: [challengeEmbed],
            components: [challengeButtons]
        })
    }
}