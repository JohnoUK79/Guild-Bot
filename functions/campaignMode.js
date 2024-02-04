const ms = require('ms-prettify').default
const { campSelection, campaignSelection, attackSelection, skillColours } = require('../functions/warpathFunctions');
const { sleep } = require('../functions/discordFunctions')
const { Colours } = require('../data/colours')
const sql = require("../config/Database");
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { attackerSkills } = require('./attackerSkills');
const { defenderSkills} = require('./defenderSkills');
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
                .setColor(Colours.Black)
                .setThumbnail(guildIcon)
                .setTimestamp()
                .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setFooter({ text: `${guildName} - ${campaignOfficer}`, iconURL: `${guildIcon}`})
                .setDescription(`${interaction.user} you have already battled **${campaignOfficer}** recently, you can battle **${campaignOfficer}** again in **${ms(t - Date.now())}**`);
        return interaction.editReply({ embeds: [campaigncooldownEmbed] })
        }
        const embed = new EmbedBuilder();
        embed
            .setURL('http://www.battle-bot.com')
            .setTitle(`Battle Bot™`)
            .setColor(Colours.Black)
            .setThumbnail(guildIcon)
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            .setFooter({ text: `Battle ID:${interaction.id} - ${campaignOfficer}`, iconURL: `${guildIcon}`});

        const AttackerDB = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`);
        const AttackerUnit = await sql.Execute(`SELECT * FROM units WHERE Camp = '${AttackerDB[0].unit_camp}' AND Unit_Type = '${AttackerDB[0].unit_type}' AND Unit_Level = '${AttackerDB[0].unit_level}'`)

            if (!AttackerDB[0].unit_type) {
                commandCooldowns.set(`${interaction.member.id}_${interaction.customId}`, 0)

                embed
                    .setDescription(`${interaction.member} you haven't selected your **Unit**!\nUse **battle-bot profile** to level up and get your **Unit**!`)
                    return interaction.editReply({ embeds: [embed] });
            }
        const attackOfficer = await sql.Execute(`SELECT * FROM officers WHERE Officer_Name = '${AttackerDB[0].officer_name}'`)
            if (AttackerDB[0].officer_level === 1) {
                OfficerLevel = 1
            } else OfficerLevel = AttackerDB[0].officer_level
            if (AttackerDB[0].skill_level === 0) {
                AttackSkillMultiplier = 1
            } else AttackSkillMultiplier = AttackerDB[0].skill_level
        
        //Number of Units Unlocked (Used to Reduce Campaign Unit Level for New Players)
        const numberOfUnits = await sql.Execute(`SELECT * FROM playerunits WHERE discord_id = '${interaction.member.id}'`)
        console.log(`Units Unlocked: ${numberOfUnits.length}`)
        let newPlayerLevel = AttackerDB[0].unit_level
        if (AttackerDB[0].unit_level = '4.0' || '4.1') {
            newPlayerLevel = '5.0' 
        } 
        console.log(newPlayerLevel)
        let DefenderUnit = await sql.Execute(`SELECT * FROM units WHERE Camp = '${campaignUnitCamp}' AND Unit_Type = '${campaignUnitType}' AND Unit_Level = '${newPlayerLevel}'`)
        if (numberOfUnits < 1) {
            let DefenderUnit = await sql.Execute(`SELECT * FROM units WHERE Camp = '${campaignUnitCamp}' AND Unit_Type = '${campaignUnitType}' AND Unit_Level = '${campaignUnitLevel}'`)
        } 
        console.log("Defender Unit Log")
        console.log(DefenderUnit[0])


            const Attacker = {
                Player: interaction.member,
                Name: AttackerUnit[0].Unit_Name,
                Power: AttackerUnit[0].Firepower * (OfficerLevel / 10),
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
                Image: `http://battle-bot.com/img/${AttackerDB[0].unit_image}`,
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
                Image: `http://battle-bot.com/img/${DefenderUnit[0].Image}`,
                ImageFile: `${DefenderUnit[0].Image}`
            }
            if (Attacker.Prestige > 0 ) {
                console.log(`Campiagn Prestige Buff`, Attacker.Prestige)
                Defender.Multiplier = Attacker.Prestige
            }

            const attackImage = new AttachmentBuilder(`./img/${Attacker.ImageFile}`)
            const defendImage = new AttachmentBuilder(`./img/${Defender.ImageFile}`)
            Attacker.BattleHealth = Attacker.Health, Defender.BattleHealth = Defender.Health
            interaction.Attacker = Attacker, interaction.Defender = Defender
            skillColours(interaction)

const startTime = Date.now();
class Battle {
    constructor(interaction) {
      this.id = interaction.id;
      this.Attacker = interaction.Attacker;
      this.Defender = interaction.Defender;
    }
    win() {
        interaction.followUp({
            content: `**Congratulations on the Win** 🏆🏆🏆`,
            ephemeral: true
        })
    }
    lose() {
        interaction.followUp({
            content: `**Better Luck Next Time** ❌❌❌`,
            ephemeral: true
        })
    }
  }
  const Battles = [];
  Battles[interaction.id] = new Battle({
    id: interaction.id,
    Attacker: interaction.Attacker,
    Defender: interaction.Defender
  });
if (Battles[interaction.id].Attacker.Speed < Battles[interaction.id].Defender.Speed) {
console.log(`Attacker Speed: ${Battles[interaction.id].Attacker.Speed} Defender Speed: ${Battles[interaction.id].Defender.Speed}`)
while (Battles[interaction.id].Defender.BattleHealth >= 0 && Battles[interaction.id].Attacker.BattleHealth >= 0) {
    console.count(`Battle ID: ${Battles[interaction.id].id} Round`)
    await sleep(800)
    Battles[interaction.id].Defender.Multiplier = Battles[interaction.id].Defender.Multiplier + Battles[interaction.id].Defender.Multiplier
    const defendPower = Math.floor(Math.random() * (Battles[interaction.id].Defender.Power - Battles[interaction.id].Defender.Power/2)) + Battles[interaction.id].Defender.Power/2
    Battles[interaction.id].Defender.AttackPower = (defendPower * Battles[interaction.id].Defender.Multiplier)
    attackSelection(interaction)
    campSelection(interaction) 
    attackerSkills(interaction)
    Battles[interaction.id].Attacker.BattleHealth = Battles[interaction.id].Attacker.BattleHealth - Battles[interaction.id].Defender.AttackPower

    embed
        .setColor(Battles[interaction.id].Defender.Color)
        .setThumbnail(`attachment://${Battles[interaction.id].Defender.ImageFile}`)
        .setImage(`attachment://${Battles[interaction.id].Defender.ImageFile}`)
        .setDescription(`**${campaignOfficer}**'s **${Battles[interaction.id].Defender.Name}** hit ${Battles[interaction.id].Attacker.Player}'s **${Battles[interaction.id].Attacker.Name}**! Dealing **${Battles[interaction.id].Defender.AttackPower.toLocaleString()}** damage!\n${Battles[interaction.id].member}'s **${Battles[interaction.id].Attacker.Name}** has **${Battles[interaction.id].Attacker.BattleHealth.toLocaleString()}** health remaining!`)
    interaction.editReply({ embeds: [embed], files: [defendImage] });
    console.log(`Defender hit for ${Battles[interaction.id].Defender.AttackPower.toLocaleString()}`)    
    await sleep(800)       
    const  attackPower = Math.floor(Math.random() * (Battles[interaction.id].Attacker.Power - Battles[interaction.id].Attacker.Power/2)) + Battles[interaction.id].Attacker.Power/2
    Battles[interaction.id].Attacker.AttackPower = (attackPower * Battles[interaction.id].Attacker.Multiplier)
    attackSelection(interaction)
    campSelection(interaction) 
    defenderSkills(interaction)
    Battles[interaction.id].Defender.BattleHealth = Battles[interaction.id].Defender.BattleHealth - Battles[interaction.id].Attacker.AttackPower

    embed
        .setColor(Battles[interaction.id].Attacker.Color)
        .setThumbnail(`attachment://${Battles[interaction.id].Attacker.ImageFile}`)
        .setImage(`attachment://${Battles[interaction.id].Attacker.ImageFile}`)
        .setDescription(`${Battles[interaction.id].Attacker.Player}'s **${Battles[interaction.id].Attacker.Name}** hit **${campaignOfficer}**'s **${Battles[interaction.id].Defender.Name}**! Dealing **${Battles[interaction.id].Attacker.AttackPower.toLocaleString()}** damage!\n**${campaignOfficer}**'s **${Battles[interaction.id].Defender.Name}** has **${Battles[interaction.id].Defender.BattleHealth.toLocaleString()}** health remaining!`)
    interaction.editReply({ embeds: [embed], files: [attackImage] });
    console.log(`Attacker hit for ${Battles[interaction.id].Attacker.AttackPower.toLocaleString()}`)
    await sleep(800)      
}
} else {
    console.log(`Defender Speed: ${Battles[interaction.id].Defender.Speed} Attacker Speed: ${Battles[interaction.id].Attacker.Speed}`)
    while (Battles[interaction.id].Defender.BattleHealth >= 0 && Battles[interaction.id].Attacker.BattleHealth >= 0) {
    attackSelection(interaction)
    campSelection(interaction) 
    defenderSkills(interaction)
    console.count(`Battle ID: ${Battles[interaction.id].id} Round`)
    await sleep(800)      
    Battles[interaction.id].Defender.Multiplier = Battles[interaction.id].Defender.Multiplier + Battles[interaction.id].Defender.Multiplier
    const attackPower = Math.floor(Math.random() * (Battles[interaction.id].Attacker.Power - Battles[interaction.id].Attacker.Power/2)) + Battles[interaction.id].Attacker.Power/2
    Battles[interaction.id].Attacker.AttackPower = (attackPower * Battles[interaction.id].Attacker.Multiplier)
    Battles[interaction.id].Defender.BattleHealth = Battles[interaction.id].Defender.BattleHealth - Battles[interaction.id].Attacker.AttackPower
        embed
            .setColor(Battles[interaction.id].Attacker.Color)
            .setThumbnail(`attachment://${Battles[interaction.id].Attacker.ImageFile}`)
            .setImage(`attachment://${Battles[interaction.id].Attacker.ImageFile}`)
            .setDescription(`${Battles[interaction.id].Attacker.Player}'s **${Battles[interaction.id].Attacker.Name}** hit ${campaignOfficer}'s **${Battles[interaction.id].Defender.Name}**! Dealing **${Battles[interaction.id].Attacker.AttackPower.toLocaleString()}** damage!\n${campaignOfficer}'s **${Battles[interaction.id].Defender.Name}** has **${Battles[interaction.id].Defender.BattleHealth.toLocaleString()}** health remaining!`)
        interaction.editReply({ embeds: [embed], files: [attackImage] });
    console.log(`Attacker hit for ${Battles[interaction.id].Attacker.AttackPower.toLocaleString()}`)    
    await sleep(800)      
    const defendPower = Math.floor(Math.random() * (Battles[interaction.id].Defender.Power - Battles[interaction.id].Defender.Power/2)) + Battles[interaction.id].Defender.Power/2
    Battles[interaction.id].Defender.AttackPower = (defendPower * Battles[interaction.id].Defender.Multiplier)
    attackSelection(interaction)
    campSelection(interaction) 
    attackerSkills(interaction)
    Battles[interaction.id].Attacker.BattleHealth = Battles[interaction.id].Attacker.BattleHealth - Battles[interaction.id].Defender.AttackPower

        embed
            .setColor(Battles[interaction.id].Defender.Color)
            .setThumbnail(`attachment://${Battles[interaction.id].Defender.ImageFile}`)
            .setImage(`attachment://${Battles[interaction.id].Defender.ImageFile}`)
            .setDescription(`**${campaignOfficer}**'s **${Battles[interaction.id].Defender.Name}** hit ${Battles[interaction.id].Attacker.Player}'s **${Battles[interaction.id].Attacker.Name}**! Dealing **${Battles[interaction.id].Defender.AttackPower.toLocaleString()}** damage!\n${Battles[interaction.id].Attacker.Player}'s **${Battles[interaction.id].Attacker.Name}** has **${Battles[interaction.id].Attacker.BattleHealth.toLocaleString()}** health remaining!`)
        interaction.editReply({ embeds: [embed], files: [defendImage] });
    console.log(`Defender hit for ${Battles[interaction.id].Defender.AttackPower.toLocaleString()}`)
    await sleep(800)      
    }
}
if (Battles[interaction.id].Defender.BattleHealth < 0) {
    await sleep(1000)      
    console.count(`Battle ID: ${Battles[interaction.id].id} Round`)
    if (AttackerDB[0].officer_level === 0) {
        attackOfficerLevel = 1
    } else attackOfficerLevel = AttackerDB[0].officer_level
    const winnings = (attackOfficerLevel * 1000) * (campaignOfficerLevel / 10)
    const wallet = AttackerDB[0].war_coins
    const wins = AttackerDB[0].battle_wins
    const newWins = parseInt(wins + 1)
    const newWallet = parseInt(wallet + winnings)
    const endTime = Date.now();
    const duration = endTime - startTime
    const battleLength = ms(duration)

    commandCooldowns.set(`${interaction.member.id}_${interaction.customId}`, Date.now() + 60 * 60 * 1000 * 12)

    embed 
        .setColor(Battles[interaction.id].Attacker.Color)
        .setThumbnail(`attachment://${Battles[interaction.id].Attacker.ImageFile}`)
        .setImage(`attachment://${Battles[interaction.id].Attacker.ImageFile}`)
        .addFields(
            { name: `Congratulations`, value: `You have defeated **${campaignOfficer}**! You can now challenge the next campaign` },
            { name: `Attackers War-Coins Earned`, value: `**$${winnings.toLocaleString()}**! Well Done ${Battles[interaction.id].Attacker.Player}` },
            { name: `Battle Duration`, value: `||${battleLength}||` },
        )        
        .setDescription(`**${campaignOfficer}**'s **${Battles[interaction.id].Defender.Name}** has been killed by ${Battles[interaction.id].Attacker.Player}'s **${Battles[interaction.id].Attacker.Name} & ${Battles[interaction.id].Attacker.Officer} using ${Battles[interaction.id].Attacker.OfficerSkill}**.`)

    interaction.editReply({ embeds: [embed], files: [attackImage] });

const win = await sql.Execute(`UPDATE levels SET battle_wins = '${newWins}', war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`)
console.log(`Winner: ${Battles[interaction.id].Attacker.Player.displayName}`, win.info,`\nLoser: ${campaignOfficer}`)
Battles[interaction.id].win();
} else
if (Battles[interaction.id].Attacker.BattleHealth < 0) {
    await sleep(1000)      
    console.count(`Battle ID: ${Battles[interaction.id].id} Round`)
    const losses = AttackerDB[0].battle_losses
    const newLosses = parseInt(losses + 1)
    const endTime = Date.now();
    const duration = endTime - startTime
    const battleLength = ms(duration)


    embed
        .setColor(Battles[interaction.id].Defender.Color)
        .setThumbnail(`attachment://${Battles[interaction.id].Defender.ImageFile}`)
        .setImage(`attachment://${Battles[interaction.id].Defender.ImageFile}`)
        .addFields(
            { name: `You Were Unsuccessful`, value: `**You Failed**! You were unable to defeat **${campaignOfficer}**` },
            { name: `Battle Duration`, value: `||${battleLength}||` },
        )     
        .setDescription(`${Battles[interaction.id].Attacker.Player.displayName}'s **${Battles[interaction.id].Attacker.Name}** has been killed by **${campaignOfficer}**'s **${Battles[interaction.id].Defender.Name} & ${Battles[interaction.id].Defender.Officer} using ${Battles[interaction.id].Defender.OfficerSkill}**.`)
    interaction.editReply({ embeds: [embed], files: [defendImage] });
    const loss = await sql.Execute(`UPDATE levels SET battle_losses = '${newLosses}' WHERE discord_id = ${interaction.member.id}`)
    console.log(`Winner: ${campaignOfficer}`,`\nLoser: ${Battles[interaction.id].Attacker.Player.displayName}`, loss.info)
    Battles[interaction.id].lose();

}
}
}