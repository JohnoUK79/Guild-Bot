const ms = require('ms-prettify').default
const { campSelection, campaignSelection, attackSelection } = require('../functions/warpathFunctions');
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
    async function sleep(ms) {
        return new Promise(
          resolve => setTimeout(resolve, ms)
        );
      }
        
        let campaign = 0
        if (interaction.customId === 'camp1') {campaign = 0}
        if (interaction.customId === 'camp2') {campaign = 1}
        if (interaction.customId === 'camp3') {campaign = 2}
        if (interaction.customId === 'camp4') {campaign = 3}
        if (interaction.customId === 'camp5') {campaign = 4}
        if (interaction.customId === 'camp6') {campaign = 5}
        if (interaction.customId === 'camp7') {campaign = 6}
        if (interaction.customId === 'camp8') {campaign = 7}
        if (interaction.customId === 'camp9') {campaign = 8}
        if (interaction.customId === 'camp10') {campaign = 9}
        if (interaction.customId === 'camp11') {campaign = 10}
        if (interaction.customId === 'camp12') {campaign = 11}
        if (interaction.customId === 'camp13') {campaign = 12}
        if (interaction.customId === 'camp14') {campaign = 13}
        if (interaction.customId === 'camp15') {campaign = 14}
        if (interaction.customId === 'camp16') {campaign = 15}
        campaignSelection(campaign)
        console.log(t)
        console.log(Date.now() - t)
        if (Date.now() - t < 0) {
        const campaigncooldownEmbed = new EmbedBuilder()
            campaigncooldownEmbed
                .setColor('#ff5b05')
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
            .setTimestamp()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
            .setFooter({ text: `${guildName} - ${campaignOfficer}`, iconURL: `${guildIcon}`});

    
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
                OfficerType: attackOfficer[0].Officer_Type,
                Multiplier: 1,
                Prestige: AttackerDB[0].prestige,
                Image: `http://phfamily.co.uk/img/${AttackerDB[0].unit_camp}.png`,
                ImageFile: `${AttackerDB[0].unit_camp}.png`
            }
            if (attackOfficer[0].Image) {
                Attacker.Image = `http://phfamily.co.uk/img/${attackOfficer[0].Image}`
                Attacker.ImageFile = attackOfficer[0].Image
            } 
            if (AttackerUnit[0].Image) {
                Attacker.Image = `http://phfamily.co.uk/img/${AttackerUnit[0].Image}`
                Attacker.ImageFile = AttackerUnit[0].Image
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
                OfficerType: defendOfficer[0].Officer_Type,
                Multiplier: 1,
                Image: `http://phfamily.co.uk/img/${campaignUnitCamp}.png`,
                ImageFile: `${campaignUnitCamp}.png`
            }
            if (Attacker.Prestige > 0 ) {
                console.log(`Defender Buff`, Attacker.Prestige)
                Defender.Multiplier = Attacker.Prestige
            }
            if (defendOfficer[0].Image) {
                Defender.Image = `http://phfamily.co.uk/img/${defendOfficer[0].Image}`
                Defender.ImageFile = defendOfficer[0].Image
            } 
            if (DefenderUnit[0].Image) {
                Defender.Image = `http://phfamily.co.uk/img/${DefenderUnit[0].Image}`
                Defender.ImageFile = DefenderUnit[0].Image
            }
            embed
                .setDescription(`${interaction.member} your **${Attacker.Name}** sucessfully Battled ${campaignOfficer}'s **${Defender.Name}**!`)

const attackImage = new AttachmentBuilder(`./img/${Attacker.ImageFile}`)
const defendImage = new AttachmentBuilder(`./img/${Defender.ImageFile}`)
console.log(Attacker, Defender)
let AH = Attacker.Health, DH = Defender.Health

if (Attacker.Speed < Defender.Speed) {
console.log(`Attacker Speed: ${Attacker.Speed} Defender Speed: ${Defender.Speed}`)
while (DH >= 0 && AH >= 0) {
    attackSelection(Attacker, Defender)
    officerSkills(interaction, Attacker, Defender, AH, DH)
    campSelection(Attacker, Defender) 
    Defender.Multiplier = Defender.Multiplier + Defender.Multiplier
    const defendPower = Math.floor(Math.random() * (Defender.Power - Defender.Power/2)) + Defender.Power/2
    Defender.AttackPower = (defendPower * Defender.Multiplier)
    console.log('Defend Multiplier', Defender.Multiplier )
    await sleep(800)
    AH = AH - Defender.AttackPower

    embed
        .setTitle(`${campaignOfficer}'s **${Defender.Name}** hit ${interaction.member}'s **${Attacker.Name}**! Dealing **${Defender.AttackPower.toLocaleString()}** damage!`)
        .setImage(`attachment://${Defender.ImageFile}`)
        .setThumbnail(`attachment://${Attacker.ImageFile}`)
        .setDescription(`${interaction.member}'s **${Attacker.Name}** has **${AH.toLocaleString()}** health remaining!`)
    interaction.editReply({ embeds: [embed], files: [defendImage] });
    console.log(`Defender hit for ${Defender.AttackPower.toLocaleString()}`)     
    await sleep(950)         
    const  attackPower = Math.floor(Math.random() * (Attacker.Power - Attacker.Power/2)) + Attacker.Power/2
    Attacker.AttackPower = (attackPower * Attacker.Multiplier)
    console.log('Attack Multiplier', Attacker.Multiplier )
    DH = DH - Attacker.AttackPower

    embed
        .setImage(`attachment://${Attacker.ImageFile}`)
        .setThumbnail(`attachment://${Defender.ImageFile}`)
        .setTitle(`${interaction.member}'s **${Attacker.Name}** hit ${campaignOfficer}'s **${Defender.Name}**! Dealing **${Attacker.AttackPower.toLocaleString()}** damage!`)
        .setDescription(`${campaignOfficer}'s **${Defender.Name}** has **${DH.toLocaleString()}** health remaining!`)
    interaction.editReply({ embeds: [embed], files: [attackImage] });
    console.log(`Attacker hit for ${Attacker.AttackPower.toLocaleString()}`)
}
} else {
console.log(`Defender Speed: ${Defender.Speed} Attacker Speed: ${Attacker.Speed}`)
while (DH >= 0 && AH >= 0) {
attackSelection(Attacker, Defender)
officerSkills(interaction, Attacker, Defender, AH, DH)
campSelection(Attacker, Defender) 
Defender.Multiplier = Defender.Multiplier + Defender.Multiplier
const attackPower = Math.floor(Math.random() * (Attacker.Power - Attacker.Power/2)) + Attacker.Power/2
Attacker.AttackPower = (attackPower * Attacker.Multiplier)
console.log('Attack Multiplier', Attacker.Multiplier )
DH = DH - Attacker.AttackPower
    embed
        .setImage(`attachment://${Attacker.ImageFile}`)
        .setThumbnail(`attachment://${Defender.ImageFile}`)
        .setTitle(`${interaction.member}'s **${Attacker.Name}** hit ${campaignOfficer}'s **${Defender.Name}**! Dealing **${Attacker.AttackPower.toLocaleString()}** damage!`)
        .setDescription(`${campaignOfficer}'s **${Defender.Name}** has **${DH.toLocaleString()}** health remaining!`)
    interaction.editReply({ embeds: [embed], files: [attackImage] });
console.log(`Attacker hit for ${Attacker.AttackPower.toLocaleString()}`)    
await sleep(950)      
const defendPower = Math.floor(Math.random() * (Defender.Power - Defender.Power/2)) + Defender.Power/2
Defender.AttackPower = (defendPower * Defender.Multiplier)
console.log('Defend Multiplier', Defender.Multiplier )
AH = AH - Defender.AttackPower

    embed
        .setImage(`attachment://${Defender.ImageFile}`)
        .setThumbnail(`attachment://${Attacker.ImageFile}`)
        .setTitle(`${campaignOfficer}'s **${Defender.Name}** hit ${interaction.member}'s **${Attacker.Name}**! Dealing **${Defender.AttackPower.toLocaleString()}** damage!`)
        .setDescription(`${interaction.member}'s **${Attacker.Name}** has **${AH.toLocaleString()}** health remaining!`)
    interaction.editReply({ embeds: [embed], files: [defendImage] });
console.log(`Defender hit for ${Defender.AttackPower.toLocaleString()}`)
await sleep(950)      
}
}

if (DH < 0) {
    await sleep(950)      
    const winnings = AttackerDB[0].officer_level * 10000 * campaignOfficerLevel / 10
    chest = AttackerDB[0].war_chest
    const wallet = AttackerDB[0].war_coins
    const wins = AttackerDB[0].battle_wins
    const newWins = parseInt(wins + 1)
    const newWallet = parseInt(wallet + winnings)
    commandCooldowns.set(`${interaction.member.id}_${interaction.customId}`, Date.now() + 60 * 60 * 1000 * 12)
    // if (interaction.guild.id === '964496256057630720') {
    //     commandCooldowns.set(`${interaction.user.id}_${interaction.customId}`, 0)
    // }

    embed 
        .setImage(`attachment://${Attacker.ImageFile}`)
        .setThumbnail(`attachment://${Defender.ImageFile}`)
        .addFields(
            { name: `Congratulations`, value: `You have defeated **${campaignOfficer}**! You can now challenge the next campaign` },
            { name: `Attackers War-Coins Earned`, value: `**$${winnings.toLocaleString()}**! Well Done ${interaction.member}` },
        )        
        .setDescription(`${campaignOfficer}'s **${Defender.Name}** has been killed by ${interaction.member}'s **${Attacker.Name} & ${Attacker.Officer} using ${Attacker.OfficerSkill}**.`)

    interaction.editReply({ embeds: [embed], files: [attackImage] });
const win = await sql.Execute(`UPDATE levels SET battle_wins = '${newWins}', war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`)
console.log(`Winner: ${interaction.member.displayName}`, win.info,`\nLoser: ${campaignOfficer}`)
} else
if (AH < 0) {
    await sleep(950)      
    console.log(Defender.ImageFile)
    const losses = AttackerDB[0].battle_losses
    const newLosses = parseInt(losses + 1)

    embed
        .setImage(`attachment://${Defender.ImageFile}`)
        .setThumbnail(`attachment://${Attacker.ImageFile}`)
        .addFields(
            { name: `You Were Unsuccessful`, value: `**You Failed**! You were unable to defeat **${campaignOfficer}**` },
        )     
        .setDescription(`${interaction.member}'s **${Attacker.Name}** has been killed by **${campaignOfficer}**'s **${Defender.Name} & ${Defender.Officer} using ${Defender.OfficerSkill}**.`)
    interaction.editReply({ embeds: [embed], files: [defendImage] });
    const loss = await sql.Execute(`UPDATE levels SET battle_losses = '${newLosses}' WHERE discord_id = ${interaction.member.id}`)
    console.log(`Winner: ${campaignOfficer}`,`\nLoser: ${interaction.member.displayName}`, loss.info)
}
}
}