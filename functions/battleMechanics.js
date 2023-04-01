const sql = require("../config/Database");
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { officerSkills } = require("./officerSkills");
const { attackSelection, campSelection } = require("./warpathFunctions");

module.exports = {
    battle: async function (interaction) {
        const { commandCooldowns } = require('../bot');
        const guildIcon = interaction.member.guild.iconURL();
		const guildName = interaction.member.guild.name
        async function sleep(ms) {
            return new Promise(
              resolve => setTimeout(resolve, ms)
            );
          }
		const Battle = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`)
		const embed = new EmbedBuilder();
			embed
				.setColor('#ff5b05')
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

                const Attacker = {
                    Name: AttackerUnit[0].Unit_Name,
                    Power: AttackerUnit[0].Firepower * AttackerDB[0].officer_level,
                    Health: AttackerUnit[0].HP * AttackerDB[0].base_level * 10,
                    UnitCamp: AttackerDB[0].unit_camp,
                    Speed: AttackerUnit[0].Speed,
                    AttackType: AttackerUnit[0].Attack_Type,
                    Officer: attackOfficer[0].Officer_Name,
                    OfficerCamp: attackOfficer[0].Officer_Camp,
                    OfficerSkill: attackOfficer[0].Skill,
                    OfficerType: attackOfficer[0].Officer_Type,
                    Multiplier: 1,
                    Image: `http://phfamily.co.uk/img/${AttackerDB[0].unit_camp}.png`
                }
                if (attackOfficer[0].Image) {
                    Attacker.Image = `http://phfamily.co.uk/img/${attackOfficer[0].Image}`
                    console.log(`Attacker: ${Attacker.Image}`)
                } 
                if (AttackerUnit[0].Image) {
                    Attacker.Image = `http://phfamily.co.uk/img/${AttackerUnit[0].Image}`
                }
                await sleep(500)
                const defendOfficer = await sql.Execute(`SELECT * FROM officers WHERE Officer_Name = '${DefenderDB[0].officer_name}'`)

                const Defender = {
                    Name: DefenderUnit[0].Unit_Name,
                    Power: DefenderUnit[0].Firepower * DefenderDB[0].officer_level,
                    Health: DefenderUnit[0].HP * DefenderDB[0].base_level * 10,
                    UnitCamp: DefenderDB[0].unit_camp,
                    Speed: DefenderUnit[0].Speed,
                    AttackType: DefenderUnit[0].Attack_Type,
                    Officer: defendOfficer[0].Officer_Name,
                    OfficerCamp: defendOfficer[0].Officer_Camp,
                    OfficerSkill: defendOfficer[0].Skill,
                    OfficerType: defendOfficer[0].Officer_Type,
                    Multiplier: 1,
                    Image: `http://phfamily.co.uk/img/${DefenderDB[0].unit_camp}.png`
                }
                if (defendOfficer[0].Image) {
                    Defender.Image = `http://phfamily.co.uk/img/${defendOfficer[0].Image}`
                } 
                if (DefenderUnit[0].Image) {
                    Defender.Image = `http://phfamily.co.uk/img/${DefenderUnit[0].Image}`
                }
                await sleep(500)
                embed
					.setDescription(`${interaction.member} your **${Attacker.Name}** sucessfully Battled ${defender}'s **${Defender.Name}**!`)
                    
let AH = Attacker.Health, DH = Defender.Health

if (Attacker.Speed < Defender.Speed) {
    console.log(`Attacker: ${Attacker.Speed} Defender: ${Defender.Speed}`)
    while (DH >= 0 && AH >= 0) {
        attackSelection(Attacker, Defender)
        officerSkills(Attacker, Defender)
        campSelection(Attacker, Defender) 
        const defendPower = Math.floor(Math.random() * (Defender.Power - Defender.Power/2)) + Defender.Power/2
        const defenderPower = (defendPower * Defender.Multiplier)
        console.log('Defend', defendPower, Defender.Multiplier, defenderPower)
        if (DH >= 0) {let defenderPower = 0} 
        await sleep(750)
        AH = AH - defenderPower
        var playerImage = Defender.Image
        console.log(playerImage)
    
        embed
            .setImage(playerImage)
            .setTitle(`${defender}'s **${Defender.Name}** hit ${interaction.member}'s **${Attacker.Name}**! Dealing **${defenderPower.toLocaleString()}** damage!`)
            .setDescription(`${interaction.member}'s **${Attacker.Name}** has **${AH.toLocaleString()}** health remaining!`)
        interaction.editReply({ embeds: [embed] });
        console.log(`Defender hit for ${defenderPower.toLocaleString()}`)        
        const  attackPower = Math.floor(Math.random() * (Attacker.Power - Attacker.Power/2)) + Attacker.Power/2
        const attackerPower = (attackPower * Attacker.Multiplier)
        console.log('Attack', attackPower, Attacker.Multiplier, attackerPower)

        if (AH >= 0) {let attackerPower = 0} 
        await sleep(750)
        DH = DH - attackerPower
        var playerImage = Attacker.Image
        console.log(playerImage)

        embed
            .setImage(playerImage)
            .setTitle(`${interaction.member}'s **${Attacker.Name}** hit ${defender}'s **${Defender.Name}**! Dealing **${attackerPower.toLocaleString()}** damage!`)
            .setDescription(`${defender}'s **${Defender.Name}** has **${DH.toLocaleString()}** health remaining!`)
        interaction.editReply({ embeds: [embed] });
        console.log(`Attacker hit for ${attackerPower.toLocaleString()}`)
    }
} else {
    console.log(`Defender: ${Defender.Speed} Attacker: ${Attacker.Speed}`)
    while (DH >= 0 && AH >= 0) {
    await sleep(750)
    attackSelection(Attacker, Defender)
    officerSkills(Attacker, Defender)
    campSelection(Attacker, Defender) 
    const attackPower = Math.floor(Math.random() * (Attacker.Power - Attacker.Power/2)) + Attacker.Power/2
    const attackerPower = (attackPower * Attacker.Multiplier)
    console.log('Attack', attackPower, Attacker.Multiplier, attackerPower)

    if (AH >= 0) {let attackerPower = 0} 
    await sleep(750)
        DH = DH - attackerPower
        var playerImage = Attacker.Image
        console.log(playerImage)

        embed
            .setImage(playerImage)
            .setTitle(`${interaction.member}'s **${Attacker.Name}** hit ${defender}'s **${Defender.Name}**! Dealing **${attackerPower.toLocaleString()}** damage!`)
            .setDescription(`${defender}'s **${Defender.Name}** has **${DH.toLocaleString()}** health remaining!`)
        interaction.editReply({ embeds: [embed] });
    console.log(`Attacker hit for ${attackerPower.toLocaleString()}`)
    
    const defendPower = Math.floor(Math.random() * (Defender.Power - Defender.Power/2)) + Defender.Power/2
    const defenderPower = (defendPower * Defender.Multiplier)
    console.log('Defend', defendPower, Defender.Multiplier, defenderPower)
    if (DH >= 0) {let defenderPower = 0} 
    await sleep(750)
        AH = AH - defenderPower
        var playerImage = Defender.Image
        console.log(playerImage)
    
        embed
            .setImage(playerImage)
            .setTitle(`${defender}'s **${Defender.Name}** hit ${interaction.member}'s **${Attacker.Name}**! Dealing **${defenderPower.toLocaleString()}** damage!`)
            .setDescription(`${interaction.member}'s **${Attacker.Name}** has **${AH.toLocaleString()}** health remaining!`)
        interaction.editReply({ embeds: [embed] });
    console.log(`Defender hit for ${defenderPower.toLocaleString()}`)
    }
}

    if (DH < 0) {
        var playerImage = Attacker.Image
        console.log(playerImage)
        const winnings = AttackerDB[0].officer_level * 10000
        chest = AttackerDB[0].war_chest
        const wallet = AttackerDB[0].war_coins
        const wins = AttackerDB[0].battle_wins
        const newWins = parseInt(wins + 1)
        const losses = DefenderDB[0].battle_losses
        const newLosses = parseInt(losses + 1)
        const newWallet = parseInt(wallet + winnings)

        embed 
            .setImage(playerImage)
            .addFields(
                { name: `Attackers War-Coins Earned`, value: `**$${winnings.toLocaleString()}**! Well Done ${interaction.member}` },
            )        
            .setDescription(`${defender}'s **${Defender.Name}** has been killed by ${interaction.member}'s **${Attacker.Name} & ${Attacker.Officer} using ${Attacker.OfficerSkill}**.`)

        interaction.editReply({ embeds: [embed] });
    
    const win = await sql.Execute(`UPDATE levels SET battle_wins = '${newWins}', war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`)
    const loss = await sql.Execute(`UPDATE levels SET battle_losses = '${newLosses}' WHERE discord_id = ${defender.id}`)
    console.log(`Winner: ${interaction.member.displayName}`, win.info,`\nLoser: ${defender.username}`, loss.info)
    } else
    if (AH < 0) {
        var playerImage = Defender.Image
        console.log(playerImage)
        const winnings = DefenderDB[0].officer_level * 10000
        chest = DefenderDB[0].war_chest
        const wallet = DefenderDB[0].war_coins
        const wins = DefenderDB[0].battle_wins
        const newWins = parseInt(wins + 1)
        const losses = AttackerDB[0].battle_losses
        const newLosses = parseInt(losses + 1)
        const newWallet = wallet + winnings
    
        embed
            .setImage(playerImage)
            .addFields(
                { name: `Defenders War-Coins Earned`, value: `**$${winnings.toLocaleString()}**! Well Done ${defender}` },
            )     
            .setDescription(`${interaction.member}'s **${Attacker.Name}** has been killed by ${defender}'s **${Defender.Name} & ${Defender.Officer} using ${Defender.OfficerSkill}**.`)
        interaction.editReply({ embeds: [embed] });  

        const win = await sql.Execute(`UPDATE levels SET battle_wins = '${newWins}', war_coins = '${newWallet}' WHERE discord_id = ${defender.id}`)
        const loss = await sql.Execute(`UPDATE levels SET battle_losses = '${newLosses}' WHERE discord_id = ${interaction.member.id}`)
        console.log(`Winner: ${defender.username}`, win.info,`\nLoser: ${interaction.member.displayName}`, loss.info)
    }
}
}