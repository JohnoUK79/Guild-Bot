const ms = require('ms-prettify').default
const sql = require("../config/Database");
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { officerSkills } = require("./officerSkills");
const { attackSelection, campSelection } = require("./warpathFunctions");
const { sleep } = require('../functions/discordFunctions')
const { Colours } = require('../data/colours')

module.exports = {
    battle: async function (interaction) {
        const { commandCooldowns } = require('../bot');
        const guildIcon = interaction.member.guild.iconURL();
		const guildName = interaction.member.guild.name
		const Battle = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`)
		const embed = new EmbedBuilder();
			embed
				.setColor(Colours.Green)
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Battles`, iconURL: `${guildIcon}`});


				const defender = interaction.options.getUser('target');
				if (defender.bot === true) {
                    commandCooldowns.set(`${interaction.user.id}_${interaction.commandName}`, 0)

                    return interaction.editReply(`${interaction.member} Stop trying to **Bully the Bots**, You can only **Battle** real members\nMan Up and pick a better foe!`)
                }
				if (defender.id === interaction.member.id) {
                    commandCooldowns.set(`${interaction.user.id}_${interaction.commandName}`, 0)

				embed
					.setDescription(`${interaction.member}, Stop picking fights with yourself!\nPlease select a worthy adversary!`)
	
					return interaction.editReply({ embeds: [embed] })
				}
				const DefenderDB = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${defender.id}`)

                if (!DefenderDB[0].unit_type) {
                    commandCooldowns.set(`${interaction.user.id}_${interaction.commandName}`, 0)

                    embed
                        .setDescription(`${interaction.member}, ${defender} has not trained their troops!\nPlease select a worthy adversary!`)
        
                        return interaction.editReply({ embeds: [embed] })
                    }
                const DefenderUnit = await sql.Execute(`SELECT * FROM units WHERE Camp = '${DefenderDB[0].unit_camp}' AND Unit_Type = '${DefenderDB[0].unit_type}' AND Unit_Level = '${DefenderDB[0].unit_level}'`)

                const AttackerDB = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`);
                const AttackerUnit = await sql.Execute(`SELECT * FROM units WHERE Camp = '${AttackerDB[0].unit_camp}' AND Unit_Type = '${AttackerDB[0].unit_type}' AND Unit_Level = '${AttackerDB[0].unit_level}'`)

                if (!AttackerDB[0].unit_type) {
                    commandCooldowns.set(`${interaction.user.id}_${interaction.commandName}`, 0)

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
                    Power: AttackerUnit[0].Firepower * (OfficerLevel / 10),
                    Health: AttackerUnit[0].HP * AttackerDB[0].base_level * 10,
                    UnitCamp: AttackerDB[0].unit_camp,
                    UnitType: AttackerDB[0].unit_type,
                    Speed: AttackerUnit[0].Speed,
                    AttackType: AttackerUnit[0].Attack_Type,
                    Officer: attackOfficer[0].Officer_Name,
                    OfficerLevel: OfficerLevel,
                    OfficerCamp: attackOfficer[0].Officer_Camp,
                    OfficerSkill: attackOfficer[0].Skill,
                    OfficerType: attackOfficer[0].Officer_Type,
                    Multiplier: 1,
                    Image: `http://phfamily.co.uk/img/${AttackerUnit[0].Image}`,
                    ImageFile: `${AttackerUnit[0].Image}`
                }
                if (attackOfficer[0].Image) {
                    Attacker.Image = `http://phfamily.co.uk/img/${attackOfficer[0].Image}`
                    Attacker.ImageFile = attackOfficer[0].Image
                    console.log(`Attacker OFficer: ${Attacker.Image}\n${Attacker.ImageFile}`)
                } 

                const defendOfficer = await sql.Execute(`SELECT * FROM officers WHERE Officer_Name = '${DefenderDB[0].officer_name}'`)

                const Defender = {
                    Player: defender, 
                    Name: DefenderUnit[0].Unit_Name,
                    Power: DefenderUnit[0].Firepower * (DefenderDB[0].officer_level / 10),
                    Health: DefenderUnit[0].HP * DefenderDB[0].base_level * 10,
                    UnitCamp: DefenderDB[0].unit_camp,
                    UnitType: DefenderDB[0].unit_type,
                    Speed: DefenderUnit[0].Speed,
                    AttackType: DefenderUnit[0].Attack_Type,
                    Officer: defendOfficer[0].Officer_Name,
                    OfficerCamp: defendOfficer[0].Officer_Camp,
                    OfficerSkill: defendOfficer[0].Skill,
                    OfficerType: defendOfficer[0].Officer_Type,
                    Multiplier: 1,
                    Image: `http://phfamily.co.uk/img/${DefenderDB[0].unit_image}`,
                    ImageFile: `${DefenderDB[0].unit_image}`
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
                    Attacker.Color = Colours.VanguardBoost
                }
                if (Attacker.UnitCamp && Attacker.OfficerCamp === 'Liberty') {
                    Attacker.Color = Colours.LibertyBoost
                }
                if (Attacker.UnitCamp && Attacker.OfficerCamp === 'MartyrsW') {
                    Attacker.Color = Colours.MartyrsWBoost
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
                    Defender.Color = Colours.VanguardBoost
                }
                if (Defender.UnitCamp && Defender.OfficerCamp === 'Liberty') {
                    Defender.Color = Colours.LibertyBoost
                }
                if (Defender.UnitCamp && Defender.OfficerCamp === 'MartyrsW') {
                    Defender.Color = Colours.MartyrsWBoost
                }

const attackImage = new AttachmentBuilder(`./img/${Attacker.ImageFile}`)
const defendImage = new AttachmentBuilder(`./img/${Defender.ImageFile}`)
console.log(Attacker, Defender)
Attacker.BattleHealth = Attacker.Health, Defender.BattleHealth = Defender.Health

if (Attacker.Speed < Defender.Speed) {
    console.log(`Attacker Speed: ${Attacker.Speed} Defender Speed: ${Defender.Speed}`)
    while (Defender.BattleHealth >= 0 && Attacker.BattleHealth >= 0) {
        console.count('Round:')
        await sleep(1600)      
        attackSelection(Attacker, Defender)
        officerSkills(interaction, Attacker, Defender)
        campSelection(Attacker, Defender) 
        const defendPower = Math.floor(Math.random() * (Defender.Power - Defender.Power/2)) + Defender.Power/2
        Defender.AttackPower = (defendPower * Defender.Multiplier)
        console.log('Defend Multiplier', Defender.Multiplier )
        Attacker.BattleHealth = Attacker.BattleHealth - Defender.AttackPower
    
        embed
            .setColor(Defender.Color)
            .setThumbnail(`attachment://${Defender.ImageFile}`)
            .setImage(`attachment://${Defender.ImageFile}`)
            .setTitle(`${defender}'s **${Defender.Name}** hit ${interaction.member}'s **${Attacker.Name}**! Dealing **${Defender.AttackPower.toLocaleString()}** damage!`)
            .setDescription(`${interaction.member}'s **${Attacker.Name}** has **${Attacker.BattleHealth.toLocaleString()}** health remaining!`)
        interaction.editReply({ embeds: [embed], files: [defendImage] });
        console.log(`Defender hit for ${Defender.AttackPower.toLocaleString()}`)  
        const  attackPower = Math.floor(Math.random() * (Attacker.Power - Attacker.Power/2)) + Attacker.Power/2
        Attacker.AttackPower = (attackPower * Attacker.Multiplier)
        console.log('Attack Multiplier', Attacker.Multiplier )
        attackSelection(Attacker, Defender)
        officerSkills(interaction, Attacker, Defender)
        campSelection(Attacker, Defender) 
        Defender.BattleHealth = Defender.BattleHealth - Attacker.AttackPower
        console.log(Attacker.ImageFile)

        embed
            .setColor(Attacker.Color)
            .setThumbnail(`attachment://${Attacker.ImageFile}`)
            .setImage(`attachment://${Attacker.ImageFile}`)
            .setTitle(`${interaction.member}'s **${Attacker.Name}** hit ${defender}'s **${Defender.Name}**! Dealing **${Attacker.AttackPower.toLocaleString()}** damage!`)
            .setDescription(`${defender}'s **${Defender.Name}** has **${Defender.BattleHealth.toLocaleString()}** health remaining!`)
        interaction.editReply({ embeds: [embed], files: [attackImage] });
        console.log(`Attacker hit for ${Attacker.AttackPower.toLocaleString()}`)
    }
} else {
    console.log(`Defender Speed: ${Defender.Speed} Attacker Speed: ${Attacker.Speed}`)
    while (Defender.BattleHealth >= 0 && Attacker.BattleHealth >= 0) {
    console.count('Round:')
    await sleep(1600)
    attackSelection(Attacker, Defender)
    officerSkills(interaction, Attacker, Defender)
    campSelection(Attacker, Defender) 
    const attackPower = Math.floor(Math.random() * (Attacker.Power - Attacker.Power/2)) + Attacker.Power/2
    Attacker.AttackPower = (attackPower * Attacker.Multiplier)
    console.log('Attack Multiplier', Attacker.Multiplier )
        attackSelection(Attacker, Defender)
        officerSkills(interaction, Attacker, Defender)
        campSelection(Attacker, Defender) 
        Defender.BattleHealth = Defender.BattleHealth - Attacker.AttackPower
        console.log(Attacker.ImageFile)

        embed
            .setColor(Attacker.Color)
            .setThumbnail(`attachment://${Attacker.ImageFile}`)
            .setImage(`attachment://${Attacker.ImageFile}`)
            .setTitle(`${interaction.member}'s **${Attacker.Name}** hit ${defender}'s **${Defender.Name}**! Dealing **${Attacker.AttackPower.toLocaleString()}** damage!`)
            .setDescription(`${defender}'s **${Defender.Name}** has **${Defender.BattleHealth.toLocaleString()}** health remaining!`)
        interaction.editReply({ embeds: [embed], files: [attackImage] });
    console.log(`Attacker hit for ${Attacker.AttackPower.toLocaleString()}`)   
    const defendPower = Math.floor(Math.random() * (Defender.Power - Defender.Power/2)) + Defender.Power/2
    Defender.AttackPower = (defendPower * Defender.Multiplier)
    console.log('Defend Multiplier', Defender.Multiplier )
    Attacker.BattleHealth = Attacker.BattleHealth - Defender.AttackPower
        console.log(Defender.ImageFile)
        attackSelection(Attacker, Defender)
        officerSkills(interaction, Attacker, Defender)
        campSelection(Attacker, Defender) 
        embed
            .setColor(Defender.Color)
            .setThumbnail(`attachment://${Defender.ImageFile}`)
            .setImage(`attachment://${Defender.ImageFile}`)
            .setTitle(`${defender}'s **${Defender.Name}** hit ${interaction.member}'s **${Attacker.Name}**! Dealing **${Defender.AttackPower.toLocaleString()}** damage!`)
            .setDescription(`${interaction.member}'s **${Attacker.Name}** has **${Attacker.BattleHealth.toLocaleString()}** health remaining!`)
        interaction.editReply({ embeds: [embed], files: [defendImage] });
    console.log(`Defender hit for ${Defender.AttackPower.toLocaleString()}`)
    }
}

if (Defender.BattleHealth < 0) {
        await sleep(1800)
        console.log(Attacker.ImageFile)
        const winnings = Attacker.OfficerLevel * 10000
        chest = AttackerDB[0].war_chest
        const wallet = AttackerDB[0].war_coins
        const wins = AttackerDB[0].battle_wins
        const newWins = parseInt(wins + 1)
        const losses = DefenderDB[0].battle_losses
        const newLosses = parseInt(losses + 1)
        const newWallet = parseInt(wallet + winnings)

        embed 
            .setColor(Attacker.Color)
            .setThumbnail(`attachment://${Attacker.ImageFile}`)
            .setImage(`attachment://${Attacker.ImageFile}`)
            .addFields(
                { name: `Attackers War-Coins Earned`, value: `**$${winnings.toLocaleString()}**! Well Done ${interaction.member}` },
            )        
            .setDescription(`${defender}'s **${Defender.Name}** has been killed by ${interaction.member}'s **${Attacker.Name} & ${Attacker.Officer} using ${Attacker.OfficerSkill}**.`)
        interaction.editReply({ embeds: [embed], files: [attackImage] });
    const win = await sql.Execute(`UPDATE levels SET battle_wins = '${newWins}', war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`)
    const loss = await sql.Execute(`UPDATE levels SET battle_losses = '${newLosses}' WHERE discord_id = ${defender.id}`)
    console.log(`Winner: ${interaction.member.displayName}`, win.info,`\nLoser: ${defender.username}`, loss.info)
    } else
if (Attacker.BattleHealth < 0) {
        await sleep(1800)
        const winnings = DefenderDB[0].officer_level * 10000
        chest = DefenderDB[0].war_chest
        const wallet = DefenderDB[0].war_coins
        const wins = DefenderDB[0].battle_wins
        const newWins = parseInt(wins + 1)
        const losses = AttackerDB[0].battle_losses
        const newLosses = parseInt(losses + 1)
        const newWallet = wallet + winnings
    
        embed
            .setColor(Defender.Color)
            .setThumbnail(`attachment://${Defender.ImageFile}`)
            .setImage(`attachment://${Defender.ImageFile}`)
            .addFields(
                { name: `Defenders War-Coins Earned`, value: `**$${winnings.toLocaleString()}**! Well Done ${defender}` },
            )     
            .setDescription(`${interaction.member}'s **${Attacker.Name}** has been killed by ${defender}'s **${Defender.Name} & ${Defender.Officer} using ${Defender.OfficerSkill}**.`)
        interaction.editReply({ embeds: [embed], files: [defendImage] });
        const win = await sql.Execute(`UPDATE levels SET battle_wins = '${newWins}', war_coins = '${newWallet}' WHERE discord_id = ${defender.id}`)
        const loss = await sql.Execute(`UPDATE levels SET battle_losses = '${newLosses}' WHERE discord_id = ${interaction.member.id}`)
        console.log(`Winner: ${defender.username}`, win.info,`\nLoser: ${interaction.member.displayName}`, loss.info)
    }
}
}