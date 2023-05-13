const ms = require('ms-prettify').default
const { campSelection, campaignSelection, attackSelection } = require('../functions/warpathFunctions');
const { sleep } = require('../functions/discordFunctions')
const { Colours } = require('../data/colours')
const { officerSkills } = require('../functions/officerSkills');
const sql = require("../config/Database");
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
module.exports = {
campaignMode: async function (interaction) {
    await interaction.deferReply({
        fetchReply: true,
        empheral: false
    });
    
    const guildIcon = interaction.member.guild.iconURL();
    const guildName = interaction.member.guild.name
	const { commandCooldowns } = require('../bot');
	let t = commandCooldowns.get(`${interaction.member.id}_${interaction.customId}`) || 0
        
        campaign = 0
        if (interaction.customId === 'camp1') {campaign = 1}
        if (interaction.customId === 'camp2') {campaign = 2}
        if (interaction.customId === 'camp3') {campaign = 3}
        if (interaction.customId === 'camp4') {campaign = 4}
        if (interaction.customId === 'camp5') {campaign = 5}
        if (interaction.customId === 'camp6') {campaign = 6}
        if (interaction.customId === 'camp7') {campaign = 7}
        if (interaction.customId === 'camp8') {campaign = 8}
        if (interaction.customId === 'camp9') {campaign = 9}
        if (interaction.customId === 'camp10') {campaign = 10}
        if (interaction.customId === 'camp11') {campaign = 11}
        if (interaction.customId === 'camp12') {campaign = 12}
        if (interaction.customId === 'camp13') {campaign = 13}
        if (interaction.customId === 'camp14') {campaign = 14}
        if (interaction.customId === 'camp15') {campaign = 15}
        if (interaction.customId === 'camp16') {campaign = 16}
        if (interaction.customId === 'camp17') {campaign = 17}
        if (interaction.customId === 'camp18') {campaign = 18}
        if (interaction.customId === 'camp19') {campaign = 19}
        if (interaction.customId === 'camp20') {campaign = 20}
        if (interaction.customId === 'camp21') {campaign = 21}
        if (interaction.customId === 'camp22') {campaign = 22}
        if (interaction.customId === 'camp23') {campaign = 23}
        if (interaction.customId === 'camp24') {campaign = 24}
        if (interaction.customId === 'camp25') {campaign = 25}

        campaignSelection(campaign)
        if (Date.now() - t < 0) {
        const campaigncooldownEmbed = new EmbedBuilder()
            campaigncooldownEmbed
                .setColor(Colours.Red)
                .setThumbnail(guildIcon)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setFooter({ text: `${guildName} - ${campaignOfficer}`, iconURL: `${guildIcon}`})
                .setDescription(`${interaction.user} you have already battled **${campaignOfficer}** recently, you can battle **${campaignOfficer}** again in **${ms(t - Date.now())}**`);
        return interaction.editReply({ embeds: [campaigncooldownEmbed] })
        }
        const embed = new EmbedBuilder();
        embed
            .setColor('#ff5b05')
            .setThumbnail(guildIcon)
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            .setFooter({ text: `Battle ID:${interaction.id} - ${campaignOfficer}`, iconURL: `${guildIcon}`});

    
        const DefenderUnit = await sql.Execute(`SELECT * FROM units WHERE Camp = '${campaignUnitCamp}' AND Unit_Type = '${campaignUnitType}' AND Unit_Level = '${campaignUnitLevel}'`)

        const AttackerDB = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`);
        const AttackerUnit = await sql.Execute(`SELECT * FROM units WHERE Camp = '${AttackerDB[0].unit_camp}' AND Unit_Type = '${AttackerDB[0].unit_type}' AND Unit_Level = '${AttackerDB[0].unit_level}'`)

            if (!AttackerDB[0].unit_type) {
                commandCooldowns.set(`${interaction.member.id}_${interaction.customId}`, 0)

                embed
                    .setDescription(`${interaction.member} you haven't selected your **Unit**!\nUse **warpath-upgrade** to level up and get your **Unit**!`)
                    return interaction.editReply({ embeds: [embed] });
            }
        const attackOfficer = await sql.Execute(`SELECT * FROM officers WHERE Officer_Name = '${AttackerDB[0].officer_name}'`)
            if (AttackerDB[0].officer_level === 0) {
                OfficerLevel = 1
            } else OfficerLevel = AttackerDB[0].officer_level
            if (AttackerDB[0].skill_level === 0) {
                AttackSkillMultiplier = 1
            } else AttackSkillMultiplier = AttackerDB[0].skill_level

            const Attacker = {
                Player: interaction.member,
                Name: AttackerUnit[0].Unit_Name,
                Power: AttackerUnit[0].Firepower * OfficerLevel / 10,
                Health: (AttackerUnit[0].HP * AttackerDB[0].base_level) * 10,
                UnitCamp: AttackerDB[0].unit_camp,
                Speed: AttackerUnit[0].Speed,
                AttackType: AttackerUnit[0].Attack_Type,
                Officer: attackOfficer[0].Officer_Name,
                OfficerLevel: OfficerLevel,
                OfficerLevel: AttackerDB[0].officer_level,
                OfficerCamp: attackOfficer[0].Officer_Camp,
                OfficerSkill: attackOfficer[0].Skill,
                SkillLevel: AttackerDB[0].skill_level,
                SkillMultiplier: AttackSkillMultiplier,
                OfficerType: attackOfficer[0].Officer_Type,
                Multiplier: 1,
                Prestige: AttackerDB[0].prestige,
                Image: `http://phfamily.co.uk/img/${AttackerDB[0].unit_image}`,
                ImageFile: `${AttackerDB[0].unit_image}`
            }

            const defendOfficer = await sql.Execute(`SELECT * FROM officers WHERE Officer_Name = '${campaignOfficer}'`)

            const Defender = {
                Player: campaignOfficer,
                Name: DefenderUnit[0].Unit_Name,
                Power: DefenderUnit[0].Firepower * (campaignOfficerLevel / 10),
                Health: DefenderUnit[0].HP * campaignBaseLevel * 10,
                UnitCamp: campaignUnitCamp,
                Speed: DefenderUnit[0].Speed,
                AttackType: DefenderUnit[0].Attack_Type,
                Officer: defendOfficer[0].Officer_Name,
                OfficerCamp: defendOfficer[0].Officer_Camp,
                OfficerSkill: defendOfficer[0].Skill,
                SkillLevel: skillLevel,
                SkillMultiplier: skillLevel,
                OfficerType: defendOfficer[0].Officer_Type,
                Multiplier: 1,
                Image: `http://phfamily.co.uk/img/${DefenderUnit[0].Image}`,
                ImageFile: `${DefenderUnit[0].Image}`
            }
            if (Attacker.Prestige > 1 ) {
                console.log(`Campiagn Prestige Buff`, Attacker.Prestige)
                Defender.Multiplier = Attacker.Prestige
            }
            if (Attacker.UnitCamp === 'Vanguard') {
                Attacker.Color = Colours.Vanguard
            }
            if (Attacker.UnitCamp === 'Liberty') {
                Attacker.Color = Colours.Liberty
            }
            if (Attacker.UnitCamp === 'MartyrsW') {
                Attacker.Color = Colours.MartyrsW
            }
            if (Attacker.UnitCamp && Attacker.OfficerCamp === 'Vanguard') {
                Attacker.SkillColor = Colours.VanguardBoost
            }
            if (Attacker.UnitCamp && Attacker.OfficerCamp === 'Liberty') {
                Attacker.SkillColor = Colours.LibertyBoost
            }
            if (Attacker.UnitCamp && Attacker.OfficerCamp === 'MartyrsW') {
                Attacker.SkillColor = Colours.MartyrsWBoost
            }
            if (Defender.UnitCamp === 'Vanguard') {
                Defender.Color = Colours.Vanguard
            }
            if (Defender.UnitCamp === 'Liberty') {
                Defender.Color = Colours.Liberty
            }
            if (Defender.UnitCamp === 'MartyrsW') {
                Defender.Color = Colours.MartyrsW
            }
            if (Defender.UnitCamp && Defender.OfficerCamp === 'Vanguard') {
                Defender.SkillColor = Colours.VanguardBoost
            }
            if (Defender.UnitCamp && Defender.OfficerCamp === 'Liberty') {
                Defender.SkillColor = Colours.LibertyBoost
            }
            if (Defender.UnitCamp && Defender.OfficerCamp === 'MartyrsW') {
                Defender.SkillColor = Colours.MartyrsWBoost
            }

const attackImage = new AttachmentBuilder(`./img/${Attacker.ImageFile}`)
const defendImage = new AttachmentBuilder(`./img/${Defender.ImageFile}`)
Attacker.BattleHealth = Attacker.Health, Defender.BattleHealth = Defender.Health
interaction.Attacker = Attacker, interaction.Defender = Defender
console.log(interaction)

if (interaction.Attacker.Speed < interaction.Defender.Speed) {
console.log(`Attacker Speed: ${interaction.Attacker.Speed} Defender Speed: ${interaction.Defender.Speed}`)
while (interaction.Defender.BattleHealth >= 0 && interaction.Attacker.BattleHealth >= 0) {
    attackSelection(interaction)
    campSelection(interaction) 
    officerSkills(interaction)
    console.count(`Battle ID: ${interaction.id} Round`)
    await sleep(1600)      
    interaction.Defender.Multiplier = interaction.Defender.Multiplier + interaction.Defender.Multiplier
    const defendPower = Math.floor(Math.random() * (interaction.Defender.Power - interaction.Defender.Power/2)) + interaction.Defender.Power/2
    interaction.Defender.AttackPower = (defendPower * interaction.Defender.Multiplier)
    interaction.Attacker.BattleHealth = interaction.Attacker.BattleHealth - interaction.Defender.AttackPower

    embed
        .setColor(interaction.Defender.Color)
        .setThumbnail(`attachment://${interaction.Defender.ImageFile}`)
        .setImage(`attachment://${interaction.Defender.ImageFile}`)
        .setDescription(`${campaignOfficer}'s **${interaction.Defender.Name}** hit ${interaction.member}'s **${Attacker.Name}**! Dealing **${interaction.Defender.AttackPower.toLocaleString()}** damage!\n${interaction.member}'s **${interaction.Attacker.Name}** has **${interaction.Attacker.BattleHealth.toLocaleString()}** health remaining!`)
    interaction.editReply({ embeds: [embed], files: [defendImage] });
    console.log(`Defender hit for ${interaction.Defender.AttackPower.toLocaleString()}`)     
    const  attackPower = Math.floor(Math.random() * (interaction.Attacker.Power - interaction.Attacker.Power/2)) + interaction.Attacker.Power/2
    interaction.Attacker.AttackPower = (attackPower * interaction.Attacker.Multiplier)
    interaction.Defender.BattleHealth = interaction.Defender.BattleHealth - interaction.Attacker.AttackPower

    embed
        .setColor(interaction.Attacker.Color)
        .setThumbnail(`attachment://${interaction.Attacker.ImageFile}`)
        .setImage(`attachment://${interaction.Attacker.ImageFile}`)
        .setDescription(`${interaction.member}'s **${interaction.Attacker.Name}** hit ${campaignOfficer}'s **${interaction.Defender.Name}**! Dealing **${interaction.Attacker.AttackPower.toLocaleString()}** damage!\n**${campaignOfficer}**'s **${interaction.Defender.Name}** has **${interaction.Defender.BattleHealth.toLocaleString()}** health remaining!`)
    interaction.editReply({ embeds: [embed], files: [attackImage] });
    console.log(`Attacker hit for ${interaction.Attacker.AttackPower.toLocaleString()}`)
}
} else {
    console.log(`Defender Speed: ${interaction.Defender.Speed} Attacker Speed: ${interaction.Attacker.Speed}`)
    while (interaction.Defender.BattleHealth >= 0 && interaction.Attacker.BattleHealth >= 0) {
    attackSelection(interaction)
    campSelection(interaction) 
    officerSkills(interaction)
    console.count(`Battle ID: ${interaction.id} Round`)
    await sleep(1600)      
    interaction.Defender.Multiplier = interaction.Defender.Multiplier + interaction.Defender.Multiplier
    const attackPower = Math.floor(Math.random() * (interaction.Attacker.Power - interaction.Attacker.Power/2)) + interaction.Attacker.Power/2
    interaction.Attacker.AttackPower = (attackPower * interaction.Attacker.Multiplier)
    interaction.Defender.BattleHealth = interaction.Defender.BattleHealth - interaction.Attacker.AttackPower
        embed
            .setColor(interaction.Attacker.Color)
            .setThumbnail(`attachment://${interaction.Attacker.ImageFile}`)
            .setImage(`attachment://${interaction.Attacker.ImageFile}`)
            .setDescription(`${interaction.member}'s **${interaction.Attacker.Name}** hit ${campaignOfficer}'s **${interaction.Defender.Name}**! Dealing **${interaction.Attacker.AttackPower.toLocaleString()}** damage!\n${campaignOfficer}'s **${interaction.Defender.Name}** has **${interaction.Defender.BattleHealth.toLocaleString()}** health remaining!`)
        interaction.editReply({ embeds: [embed], files: [attackImage] });
    console.log(`Attacker hit for ${interaction.Attacker.AttackPower.toLocaleString()}`)    
    const defendPower = Math.floor(Math.random() * (interaction.Defender.Power - interaction.Defender.Power/2)) + interaction.Defender.Power/2
    interaction.Defender.AttackPower = (defendPower * interaction.Defender.Multiplier)
    interaction.Attacker.BattleHealth = interaction.Attacker.BattleHealth - interaction.Defender.AttackPower

        embed
            .setColor(interaction.Defender.Color)
            .setThumbnail(`attachment://${interaction.Defender.ImageFile}`)
            .setImage(`attachment://${interaction.Defender.ImageFile}`)
            .setDescription(`${campaignOfficer}'s **${interaction.Defender.Name}** hit ${interaction.member}'s **${interaction.Attacker.Name}**! Dealing **${interaction.Defender.AttackPower.toLocaleString()}** damage!\n${interaction.member}'s **${interaction.Attacker.Name}** has **${interaction.Attacker.BattleHealth.toLocaleString()}** health remaining!`)
        interaction.editReply({ embeds: [embed], files: [defendImage] });
    console.log(`Defender hit for ${interaction.Defender.AttackPower.toLocaleString()}`)
    }
}
if (interaction.Defender.BattleHealth < 0) {
    await sleep(2000)      
    console.count(`Battle ID: ${interaction.id} Round`)
    if (AttackerDB[0].officer_level === 0) {
        attackOfficerLevel = 1
    } else attackOfficerLevel = AttackerDB[0].officer_level
    const winnings = (attackOfficerLevel * 1000) * (campaignOfficerLevel / 10)
    const wallet = AttackerDB[0].war_coins
    const wins = AttackerDB[0].battle_wins
    const newWins = parseInt(wins + 1)
    const newWallet = parseInt(wallet + winnings)
    commandCooldowns.set(`${interaction.member.id}_${interaction.customId}`, Date.now() + 60 * 60 * 1000 * 12)

    embed 
        .setColor(interaction.Attacker.Color)
        .setThumbnail(`attachment://${interaction.Attacker.ImageFile}`)
        .setImage(`attachment://${interaction.Attacker.ImageFile}`)
        .addFields(
            { name: `Congratulations`, value: `You have defeated **${campaignOfficer}**! You can now challenge the next campaign` },
            { name: `Attackers War-Coins Earned`, value: `**$${winnings.toLocaleString()}**! Well Done ${interaction.member}` },
        )        
        .setDescription(`${campaignOfficer}'s **${interaction.Defender.Name}** has been killed by ${interaction.member}'s **${interaction.Attacker.Name} & ${interaction.Attacker.Officer} using ${interaction.Attacker.OfficerSkill}**.`)

    interaction.editReply({ embeds: [embed], files: [attackImage] });

const win = await sql.Execute(`UPDATE levels SET battle_wins = '${newWins}', war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`)
console.log(`Winner: ${interaction.member.displayName}`, win.info,`\nLoser: ${campaignOfficer}`)
} else
if (interaction.Attacker.BattleHealth < 0) {
    await sleep(2000)      
    console.count(`Battle ID: ${interaction.id} Round`)
    const losses = AttackerDB[0].battle_losses
    const newLosses = parseInt(losses + 1)

    embed
        .setColor(interaction.Defender.Color)
        .setThumbnail(`attachment://${interaction.Defender.ImageFile}`)
        .setImage(`attachment://${interaction.Defender.ImageFile}`)
        .addFields(
            { name: `You Were Unsuccessful`, value: `**You Failed**! You were unable to defeat **${campaignOfficer}**` },
        )     
        .setDescription(`${interaction.member}'s **${interaction.Attacker.Name}** has been killed by **${campaignOfficer}**'s **${interaction.Defender.Name} & ${interaction.Defender.Officer} using ${interaction.Defender.OfficerSkill}**.`)
    interaction.editReply({ embeds: [embed], files: [defendImage] });
    const loss = await sql.Execute(`UPDATE levels SET battle_losses = '${newLosses}' WHERE discord_id = ${interaction.member.id}`)
    console.log(`Winner: ${campaignOfficer}`,`\nLoser: ${interaction.member.displayName}`, loss.info)
}
}
}