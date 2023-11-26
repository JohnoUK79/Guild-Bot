const ms = require('ms-prettify').default
const sql = require("../config/Database");
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { campSelection, skillColours, attackSelection } = require("./warpathFunctions");
const { sleep } = require('../functions/discordFunctions')
const { Colours } = require('../data/colours');
const { attackerSkills } = require('./attackerSkills');
const { defenderSkills } = require('./defenderSkills');

module.exports = {
    battle: async function (interaction) {
        const { commandCooldowns } = require('../bot');
        const guildIcon = interaction.member.guild.iconURL();
		const guildName = interaction.member.guild.name
        const defender = interaction.options.getUser('target');

		const embed = new EmbedBuilder();
			embed
                .setURL('http://www.battle-bot.com')
                .setTitle(`Battle Bot™`)
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

                if (DefenderDB.length === 0) {
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
                    Image: `http://battle-bot.com/img/${AttackerDB[0].unit_image}`,
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
                    Image: `http://battle-bot.com/img/${DefenderDB[0].unit_image}`,
                    ImageFile: `${DefenderDB[0].unit_image}`
                }

                const attackImage = new AttachmentBuilder(`./img/${Attacker.ImageFile}`)
                const defendImage = new AttachmentBuilder(`./img/${Defender.ImageFile}`)
                Attacker.Attachment = attackImage, Defender.Attachment = defendImage
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
        console.count(`Battle ID: ${interaction.id} Round`)
        await sleep(800)      
        attackSelection(interaction)
        attackerSkills(interaction)
        campSelection(interaction) 
        const defendPower = Math.floor(Math.random() * (Battles[interaction.id].Defender.Power - Battles[interaction.id].Defender.Power/2)) + Battles[interaction.id].Defender.Power/2
        Battles[interaction.id].Defender.AttackPower = (defendPower * Battles[interaction.id].Defender.Multiplier)
        console.log('Defend Multiplier', Battles[interaction.id].Defender.Multiplier )
        Battles[interaction.id].Attacker.BattleHealth = Battles[interaction.id].Attacker.BattleHealth - Battles[interaction.id].Defender.AttackPower
    
        embed
            .setColor(Battles[interaction.id].Defender.Color)
            .setFooter({ text: `Battle ID:${interaction.id} - ${Battles[interaction.id].Defender.Player.username}`, iconURL: `${guildIcon}`})
            .setThumbnail(`attachment://${Battles[interaction.id].Defender.ImageFile}`)
            .setImage(`attachment://${Battles[interaction.id].Defender.ImageFile}`)
            .setDescription(`${defender}'s **${Battles[interaction.id].Defender.Name}** hit ${interaction.member}'s **${Battles[interaction.id].Attacker.Name}**! Dealing **${Battles[interaction.id].Defender.AttackPower.toLocaleString()}** damage!\n${interaction.member}'s **${Battles[interaction.id].Attacker.Name}** has **${Battles[interaction.id].Attacker.BattleHealth.toLocaleString()}** health remaining!`)
        interaction.editReply({ embeds: [embed], files: [defendImage] });
        console.log(`Defender hit for ${Battles[interaction.id].Defender.AttackPower.toLocaleString()}`)  
        const  attackPower = Math.floor(Math.random() * (Battles[interaction.id].Attacker.Power - Battles[interaction.id].Attacker.Power/2)) + Battles[interaction.id].Attacker.Power/2
        Battles[interaction.id].Attacker.AttackPower = (attackPower * Battles[interaction.id].Attacker.Multiplier)
        console.log('Attack Multiplier', Battles[interaction.id].Attacker.Multiplier )
        await sleep(800)      
        attackSelection(interaction)
        defenderSkills(interaction)
        campSelection(interaction) 
        Battles[interaction.id].Defender.BattleHealth = Battles[interaction.id].Defender.BattleHealth - Battles[interaction.id].Attacker.AttackPower

        embed
            .setColor(Battles[interaction.id].Attacker.Color)
            .setThumbnail(`attachment://${Battles[interaction.id].Attacker.ImageFile}`)
            .setImage(`attachment://${Battles[interaction.id].Attacker.ImageFile}`)
            .setDescription(`${interaction.member}'s **${Battles[interaction.id].Attacker.Name}** hit ${defender}'s **${Battles[interaction.id].Defender.Name}**! Dealing **${Battles[interaction.id].Attacker.AttackPower.toLocaleString()}** damage!\n${defender}'s **${Battles[interaction.id].Defender.Name}** has **${Battles[interaction.id].Defender.BattleHealth.toLocaleString()}** health remaining!`)
        interaction.editReply({ embeds: [embed], files: [attackImage] });
        console.log(`Attacker hit for ${Battles[interaction.id].Attacker.AttackPower.toLocaleString()}`)
        await sleep(800)      
    }
} else {
    console.log(`Defender Speed: ${Battles[interaction.id].Defender.Speed} Attacker Speed: ${Battles[interaction.id].Attacker.Speed}`)
    while (Battles[interaction.id].Defender.BattleHealth >= 0 && Battles[interaction.id].Attacker.BattleHealth >= 0) {
    console.count(`Battle ID: ${interaction.id} Round`)
    await sleep(800)      
    attackSelection(interaction)
    defenderSkills(interaction)
    campSelection(interaction) 
    const attackPower = Math.floor(Math.random() * (Battles[interaction.id].Attacker.Power - Battles[interaction.id].Attacker.Power/2)) + Battles[interaction.id].Attacker.Power/2
    Battles[interaction.id].Attacker.AttackPower = (attackPower * Battles[interaction.id].Attacker.Multiplier)
    console.log('Attack Multiplier', Battles[interaction.id].Attacker.Multiplier )
        attackSelection(interaction)
        attackerSkills(interaction)
        campSelection(interaction) 
        Battles[interaction.id].Defender.BattleHealth = Battles[interaction.id].Defender.BattleHealth - Battles[interaction.id].Attacker.AttackPower

        embed
            .setColor(Battles[interaction.id].Attacker.Color)
            .setFooter({ text: `Battle ID:${interaction.id} - ${defender.username}`, iconURL: `${guildIcon}`})
            .setThumbnail(`attachment://${Battles[interaction.id].Attacker.ImageFile}`)
            .setImage(`attachment://${Battles[interaction.id].Attacker.ImageFile}`)
            .setDescription(`${interaction.member}'s **${Battles[interaction.id].Attacker.Name}** hit ${defender}'s **${Battles[interaction.id].Defender.Name}**! Dealing **${Battles[interaction.id].Attacker.AttackPower.toLocaleString()}** damage!\n${defender}'s **${Battles[interaction.id].Defender.Name}** has **${Battles[interaction.id].Defender.BattleHealth.toLocaleString()}** health remaining!`)
        interaction.editReply({ embeds: [embed], files: [attackImage] });
    console.log(`Attacker hit for ${Battles[interaction.id].Attacker.AttackPower.toLocaleString()}`)  
    await sleep(800)       
    const defendPower = Math.floor(Math.random() * (Battles[interaction.id].Defender.Power - Battles[interaction.id].Defender.Power/2)) + Battles[interaction.id].Defender.Power/2
    Battles[interaction.id].Defender.AttackPower = (defendPower * Battles[interaction.id].Defender.Multiplier)
    console.log('Defend Multiplier', Battles[interaction.id].Defender.Multiplier )
    Battles[interaction.id].Attacker.BattleHealth = Battles[interaction.id].Attacker.BattleHealth - Battles[interaction.id].Defender.AttackPower
        attackSelection(interaction)
        attackerSkills(interaction)
        campSelection(interaction) 
        embed
            .setColor(Battles[interaction.id].Defender.Color)
            .setThumbnail(`attachment://${Battles[interaction.id].Defender.ImageFile}`)
            .setImage(`attachment://${Battles[interaction.id].Defender.ImageFile}`)
            .setDescription(`${defender}'s **${Battles[interaction.id].Defender.Name}** hit ${interaction.member}'s **${Battles[interaction.id].Attacker.Name}**! Dealing **${Battles[interaction.id].Defender.AttackPower.toLocaleString()}** damage!\n${interaction.member}'s **${Battles[interaction.id].Attacker.Name}** has **${Battles[interaction.id].Attacker.BattleHealth.toLocaleString()}** health remaining!`)
        interaction.editReply({ embeds: [embed], files: [defendImage] });
    console.log(`Defender hit for ${Battles[interaction.id].Defender.AttackPower.toLocaleString()}`)
    await sleep(800)      
    }
}

if (Battles[interaction.id].Defender.BattleHealth < 0) {
        await sleep(1200)
        const winnings = Battles[interaction.id].Attacker.OfficerLevel * 10000
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
            .setColor(Battles[interaction.id].Attacker.Color)
            .setThumbnail(`attachment://${Battles[interaction.id].Attacker.ImageFile}`)
            .setFooter({ text: `Battle ID:${Battles[interaction.id].id} - ${defender.username}`, iconURL: `${guildIcon}`})
            .setImage(`attachment://${Battles[interaction.id].Attacker.ImageFile}`)
            .addFields(
                { name: `Attackers War-Coins Earned`, value: `**$${winnings.toLocaleString()}**! Well Done ${interaction.member}` },
                { name: `Battle Duration`, value: `||${battleLength}||` },
            )        
            .setDescription(`${defender}'s **${Battles[interaction.id].Defender.Name}** has been killed by ${interaction.member}'s **${Battles[interaction.id].Attacker.Name} & ${Battles[interaction.id].Attacker.Officer} using ${Battles[interaction.id].Attacker.OfficerSkill}**.`)
        interaction.editReply({ embeds: [embed], files: [attackImage] });
    const win = await sql.Execute(`UPDATE levels SET battle_wins = '${newWins}', war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`)
    const loss = await sql.Execute(`UPDATE levels SET battle_losses = '${newLosses}' WHERE discord_id = ${defender.id}`)
    console.log(`Winner: ${interaction.member.displayName}`, win.info,`\nLoser: ${defender.username}`, loss.info)
    Battles[interaction.id].win();

} else
if (interaction.Attacker.BattleHealth < 0) {
        await sleep(1200)
        const winnings = DefenderDB[0].officer_level * 10000
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
            .setColor(Battles[interaction.id].Defender.Color)
            .setFooter({ text: `Battle ID:${Battles[interaction.id].id} - ${defender.username}`, iconURL: `${guildIcon}`})
            .setThumbnail(`attachment://${Battles[interaction.id].Defender.ImageFile}`)
            .setImage(`attachment://${Battles[interaction.id].Defender.ImageFile}`)
            .addFields(
                { name: `Defenders War-Coins Earned`, value: `**$${winnings.toLocaleString()}**! Well Done ${defender}` },
                { name: `Battle Duration`, value: `||${battleLength}||` },
            )     
            .setDescription(`${interaction.member}'s **${Battles[interaction.id].Attacker.Name}** has been killed by ${defender}'s **${Battles[interaction.id].Defender.Name} & ${Battles[interaction.id].Defender.Officer} using ${Battles[interaction.id].Defender.OfficerSkill}**.`)
        interaction.editReply({ embeds: [embed], files: [defendImage] });
        const win = await sql.Execute(`UPDATE levels SET battle_wins = '${newWins}', war_coins = '${newWallet}' WHERE discord_id = ${defender.id}`)
        const loss = await sql.Execute(`UPDATE levels SET battle_losses = '${newLosses}' WHERE discord_id = ${interaction.member.id}`)
        console.log(`Winner: ${defender.username}`, win.info,`\nLoser: ${interaction.member.displayName}`, loss.info)
        Battles[interaction.id].lose();
    }
}
}