const ms = require('ms-prettify').default
const sql = require("../config/Database");
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { officerSkills } = require("./officerSkills");
const { attackSelection, campSelection, skillColours } = require("./warpathFunctions");
const { sleep } = require('../functions/discordFunctions')
const { Colours } = require('../data/colours')

module.exports = {
    battle: async function (interaction) {
        const { commandCooldowns } = require('../bot');
        const guildIcon = interaction.member.guild.iconURL();
		const guildName = interaction.member.guild.name
		const Battle = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`)
        const defender = interaction.options.getUser('target');

		const embed = new EmbedBuilder();
			embed
				.setColor(Colours.Green)
				.setThumbnail(guildIcon)
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})


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
                
                AttackOfficerLevel = 1
                if (AttackerDB[0].officer_level > 0) {
                    AttackOfficerLevel = AttackerDB[0].officer_level
                } 
                console.log(`Attack Officer Multipler Level: ${AttackOfficerLevel}`)

                AttackSkillMultiplier = 1
                if (AttackerDB[0].skill_level > 0) {
                    AttackSkillMultiplier = AttackerDB[0].skill_level
                } 
                console.log(`Attack Skill Multiplier Level: ${AttackSkillMultiplier}`)

                const Attacker = {
                    Player: interaction.member,
                    Name: AttackerUnit[0].Unit_Name,
                    Power: AttackerUnit[0].Firepower * (AttackOfficerLevel / 10),
                    Health: AttackerUnit[0].HP * AttackerDB[0].base_level * 10,
                    UnitCamp: AttackerDB[0].unit_camp,
                    Speed: AttackerUnit[0].Speed,
                    AttackType: AttackerUnit[0].Attack_Type,
                    Officer: attackOfficer[0].Officer_Name,
                    OfficerLevel: AttackOfficerLevel,
                    OfficerCamp: attackOfficer[0].Officer_Camp,
                    OfficerSkill: attackOfficer[0].Skill,
                    SKillLevel: AttackerDB[0].skill_level,
                    SkillMultiplier: AttackSkillMultiplier,
                    OfficerType: attackOfficer[0].Officer_Type,
                    Multiplier: 1,
                    Image: `http://phfamily.co.uk/img/${AttackerDB[0].unit_image}`,
                    ImageFile: `${AttackerDB[0].unit_image}`
                }

                const defendOfficer = await sql.Execute(`SELECT * FROM officers WHERE Officer_Name = '${DefenderDB[0].officer_name}'`)
                
                DefendOfficerLevel = 1
                if (DefenderDB[0].officer_level > 0) {
                    DefendOfficerLevel = DefenderDB[0].officer_level
                } 
                console.log(`Defend Officer Multiplier Level: ${DefendOfficerLevel}`)

                let DefendSkillMultiplier = 1
                if (DefenderDB[0].skill_level > 0) {
                    DefendSkillMultiplier = DefenderDB[0].skill_level
                } 
                console.log(`Defend Skill Multiplier Level: ${DefendSkillMultiplier}`)

                const Defender = {
                    Player: defender, 
                    Name: DefenderUnit[0].Unit_Name,
                    Power: DefenderUnit[0].Firepower * (DefendOfficerLevel / 10),
                    Health: DefenderUnit[0].HP * DefenderDB[0].base_level * 10,
                    UnitCamp: DefenderDB[0].unit_camp,
                    Speed: DefenderUnit[0].Speed,
                    AttackType: DefenderUnit[0].Attack_Type,
                    Officer: defendOfficer[0].Officer_Name,
                    OfficerLevel: DefendOfficerLevel,
                    OfficerCamp: defendOfficer[0].Officer_Camp,
                    OfficerSkill: defendOfficer[0].Skill,
                    SKillLevel: DefenderDB[0].skill_level,
                    SkillMultiplier: DefendSkillMultiplier,
                    OfficerType: defendOfficer[0].Officer_Type,
                    Multiplier: DefendSkillMultiplier,
                    Image: `http://phfamily.co.uk/img/${DefenderDB[0].unit_image}`,
                    ImageFile: `${DefenderDB[0].unit_image}`
                }

                const attackImage = new AttachmentBuilder(`./img/${Attacker.ImageFile}`)
                const defendImage = new AttachmentBuilder(`./img/${Defender.ImageFile}`)
                Attacker.Attachment = attackImage, Defender.Attachment = defendImage
                Attacker.BattleHealth = Attacker.Health, Defender.BattleHealth = Defender.Health
                interaction.Attacker = Attacker, interaction.Defender = Defender
                console.log(interaction)
                skillColours(interaction)

const startTime = Date.now();
if (Attacker.Speed < Defender.Speed) {
    console.log(`Attacker Speed: ${Attacker.Speed} Defender Speed: ${Defender.Speed}`)
    while (interaction.Defender.BattleHealth >= 0 && interaction.Attacker.BattleHealth >= 0) {
        console.count(`Battle ID: ${interaction.id} Round`)
        await sleep(1600)      
        attackSelection(interaction)
        officerSkills(interaction)
        campSelection(interaction) 
        const defendPower = Math.floor(Math.random() * (interaction.Defender.Power - interaction.Defender.Power/2)) + interaction.Defender.Power/2
        interaction.Defender.AttackPower = (defendPower * interaction.Defender.Multiplier)
        console.log('Defend Multiplier', interaction.Defender.Multiplier )
        interaction.Attacker.BattleHealth = interaction.Attacker.BattleHealth - Defender.AttackPower
    
        embed
            .setColor(interaction.Defender.Color)
            .setFooter({ text: `Battle ID:${interaction.id} - ${defender.username}`, iconURL: `${guildIcon}`})
            .setThumbnail(`attachment://${interaction.Defender.ImageFile}`)
            .setImage(`attachment://${interaction.Defender.ImageFile}`)
            .setDescription(`${defender}'s **${interaction.Defender.Name}** hit ${interaction.member}'s **${interaction.Attacker.Name}**! Dealing **${interaction.Defender.AttackPower.toLocaleString()}** damage!\n${interaction.member}'s **${interaction.Attacker.Name}** has **${interaction.Attacker.BattleHealth.toLocaleString()}** health remaining!`)
        interaction.editReply({ embeds: [embed], files: [defendImage] });
        console.log(`Defender hit for ${interaction.Defender.AttackPower.toLocaleString()}`)  
        const  attackPower = Math.floor(Math.random() * (interaction.Attacker.Power - interaction.Attacker.Power/2)) + interaction.Attacker.Power/2
        interaction.Attacker.AttackPower = (attackPower * interaction.Attacker.Multiplier)
        console.log('Attack Multiplier', interaction.Attacker.Multiplier )
        attackSelection(interaction)
        officerSkills(interaction)
        campSelection(interaction) 
        interaction.Defender.BattleHealth = interaction.Defender.BattleHealth - interaction.Attacker.AttackPower

        embed
            .setColor(interaction.Attacker.Color)
            .setThumbnail(`attachment://${interaction.Attacker.ImageFile}`)
            .setImage(`attachment://${interaction.Attacker.ImageFile}`)
            .setDescription(`${interaction.member}'s **${interaction.Attacker.Name}** hit ${defender}'s **${interaction.Defender.Name}**! Dealing **${interaction.Attacker.AttackPower.toLocaleString()}** damage!\n${defender}'s **${interaction.Defender.Name}** has **${interaction.Defender.BattleHealth.toLocaleString()}** health remaining!`)
        interaction.editReply({ embeds: [embed], files: [attackImage] });
        console.log(`Attacker hit for ${interaction.Attacker.AttackPower.toLocaleString()}`)
    }
} else {
    console.log(`Defender Speed: ${interaction.Defender.Speed} Attacker Speed: ${interaction.Attacker.Speed}`)
    while (interaction.Defender.BattleHealth >= 0 && interaction.Attacker.BattleHealth >= 0) {
    console.count(`Battle ID: ${interaction.id} Round`)
    await sleep(1600)
    attackSelection(interaction)
    officerSkills(interaction)
    campSelection(interaction) 
    const attackPower = Math.floor(Math.random() * (interaction.Attacker.Power - interaction.Attacker.Power/2)) + interaction.Attacker.Power/2
    interaction.Attacker.AttackPower = (attackPower * interaction.Attacker.Multiplier)
    console.log('Attack Multiplier', interaction.Attacker.Multiplier )
        attackSelection(interaction)
        officerSkills(interaction)
        campSelection(interaction) 
        interaction.Defender.BattleHealth = interaction.Defender.BattleHealth - interaction.Attacker.AttackPower
        console.log(interaction.Attacker.ImageFile)

        embed
            .setColor(interaction.Attacker.Color)
            .setFooter({ text: `Battle ID:${interaction.id} - ${defender.username}`, iconURL: `${guildIcon}`})
            .setThumbnail(`attachment://${interaction.Attacker.ImageFile}`)
            .setImage(`attachment://${interaction.Attacker.ImageFile}`)
            .setDescription(`${interaction.member}'s **${interaction.Attacker.Name}** hit ${defender}'s **${interaction.Defender.Name}**! Dealing **${interaction.Attacker.AttackPower.toLocaleString()}** damage!\n${defender}'s **${interaction.Defender.Name}** has **${interaction.Defender.BattleHealth.toLocaleString()}** health remaining!`)
        interaction.editReply({ embeds: [embed], files: [attackImage] });
    console.log(`Attacker hit for ${interaction.Attacker.AttackPower.toLocaleString()}`)   
    const defendPower = Math.floor(Math.random() * (interaction.Defender.Power - interaction.Defender.Power/2)) + interaction.Defender.Power/2
    Defender.AttackPower = (defendPower * interaction.Defender.Multiplier)
    console.log('Defend Multiplier', interaction.Defender.Multiplier )
    interaction.Attacker.BattleHealth = interaction.Attacker.BattleHealth - interaction.Defender.AttackPower
        attackSelection(interaction)
        officerSkills(interaction)
        campSelection(interaction) 
        embed
            .setColor(interaction.Defender.Color)
            .setThumbnail(`attachment://${interaction.Defender.ImageFile}`)
            .setImage(`attachment://${interaction.Defender.ImageFile}`)
            .setDescription(`${defender}'s **${interaction.Defender.Name}** hit ${interaction.member}'s **${interaction.Attacker.Name}**! Dealing **${interaction.Defender.AttackPower.toLocaleString()}** damage!\n${interaction.member}'s **${interaction.Attacker.Name}** has **${interaction.Attacker.BattleHealth.toLocaleString()}** health remaining!`)
        interaction.editReply({ embeds: [embed], files: [defendImage] });
    console.log(`Defender hit for ${interaction.Defender.AttackPower.toLocaleString()}`)
    }
}

if (interaction.Defender.BattleHealth < 0) {
        await sleep(1800)
        const winnings = interaction.Attacker.OfficerLevel * 10000
        chest = AttackerDB[0].war_chest
        const wallet = AttackerDB[0].war_coins
        const wins = AttackerDB[0].battle_wins
        const newWins = parseInt(wins + 1)
        const losses = DefenderDB[0].battle_losses
        const newLosses = parseInt(losses + 1)
        const newWallet = parseInt(wallet + winnings)
        const endTime = Date.now();
        const duration = endTime - startTime
        const battleLength = ms(duration)
        


        embed 
            .setColor(interaction.Attacker.Color)
            .setThumbnail(`attachment://${interaction.Attacker.ImageFile}`)
            .setFooter({ text: `Battle ID:${interaction.id} - ${defender.username}`, iconURL: `${guildIcon}`})
            .setImage(`attachment://${interaction.Attacker.ImageFile}`)
            .addFields(
                { name: `Attackers War-Coins Earned`, value: `**$${winnings.toLocaleString()}**! Well Done ${interaction.member}` },
                { name: `Battle Duration`, value: `**${battleLength}**` },
            )        
            .setDescription(`${defender}'s **${interaction.Defender.Name}** has been killed by ${interaction.member}'s **${interaction.Attacker.Name} & ${interaction.Attacker.Officer} using ${interaction.Attacker.OfficerSkill}**.`)
        interaction.editReply({ embeds: [embed], files: [attackImage] });
    const win = await sql.Execute(`UPDATE levels SET battle_wins = '${newWins}', war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`)
    const loss = await sql.Execute(`UPDATE levels SET battle_losses = '${newLosses}' WHERE discord_id = ${defender.id}`)
    console.log(`Winner: ${interaction.member.displayName}`, win.info,`\nLoser: ${defender.username}`, loss.info)
} else
if (interaction.Attacker.BattleHealth < 0) {
        await sleep(1800)
        const winnings = DefenderDB[0].officer_level * 10000
        chest = DefenderDB[0].war_chest
        const wallet = DefenderDB[0].war_coins
        const wins = DefenderDB[0].battle_wins
        const newWins = parseInt(wins + 1)
        const losses = AttackerDB[0].battle_losses
        const newLosses = parseInt(losses + 1)
        const newWallet = wallet + winnings
        const endTime = Date.now();
        const duration = endTime - startTime
        const battleLength = ms(duration)
    
        embed
            .setColor(interaction.Defender.Color)
            .setFooter({ text: `Battle ID:${interaction.id} - ${defender.username}`, iconURL: `${guildIcon}`})
            .setThumbnail(`attachment://${interaction.Defender.ImageFile}`)
            .setImage(`attachment://${interaction.Defender.ImageFile}`)
            .addFields(
                { name: `Defenders War-Coins Earned`, value: `**$${winnings.toLocaleString()}**! Well Done ${defender}` },
                { name: `Battle Duration`, value: `**${battleLength}**` },
            )     
            .setDescription(`${interaction.member}'s **${interaction.Attacker.Name}** has been killed by ${defender}'s **${interaction.Defender.Name} & ${interaction.Defender.Officer} using ${interaction.Defender.OfficerSkill}**.`)
        interaction.editReply({ embeds: [embed], files: [defendImage] });
        const win = await sql.Execute(`UPDATE levels SET battle_wins = '${newWins}', war_coins = '${newWallet}' WHERE discord_id = ${defender.id}`)
        const loss = await sql.Execute(`UPDATE levels SET battle_losses = '${newLosses}' WHERE discord_id = ${interaction.member.id}`)
        console.log(`Winner: ${defender.username}`, win.info,`\nLoser: ${interaction.member.displayName}`, loss.info)
    }
}
}