const sql = require("../config/Database");
const { TextInputStyle, ModalBuilder, EmbedBuilder, TextInputBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    battle: async function (interaction) {
        const guildIcon = interaction.member.guild.iconURL();
		const guildName = interaction.member.guild.name
		const Battle = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`)
		const embed = new EmbedBuilder();
			embed
				.setColor('#ff5b05')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Battles`, iconURL: `${guildIcon}`});


				const defender = interaction.options.getUser('target');
				if (defender.bot === true) return interaction.editReply(`${interaction.member} Stop trying to **Bully the Bots**, You can only **Battle** real members\nMan Up and pick a better foe!`)
				const DefenderDB = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${defender.id}`)
				if (defender.id === interaction.member.id) {
				embed
					.setDescription(`${interaction.member}, Stop picking fights with yourself!\nPlease select a worthy adversary!`)
	
					return interaction.editReply({ embeds: [embed] })
				}
                console.log(DefenderDB[0].unit_type)
                if (!DefenderDB[0].unit_type) {
                    embed
                        .setDescription(`${interaction.member}, ${defender} has not trained their troops!\nPlease select a worthy adversary!`)
        
                        return interaction.editReply({ embeds: [embed] })
                    }
                const DefenderUnit = await sql.Execute(`SELECT * FROM units WHERE Camp = '${DefenderDB[0].unit_camp}' AND Unit_Type = '${DefenderDB[0].unit_type}' AND Unit_Level = '${DefenderDB[0].unit_level}'`)
                console.log(`Defender`, DefenderUnit)
                const AttackerDB = await sql.Execute(`SELECT * FROM levels WHERE discord_id = ${interaction.member.id}`);
                const AttackerUnit = await sql.Execute(`SELECT * FROM units WHERE Camp = '${AttackerDB[0].unit_camp}' AND Unit_Type = '${AttackerDB[0].unit_type}' AND Unit_Level = '${AttackerDB[0].unit_level}'`)
                console.log(`Attacker`, AttackerUnit)
                if (!AttackerUnit) {
                    embed
					    .setDescription(`${interaction.member} you haven't selected your **Unit**!\nUse **warpath-upgrade** to level up and get your **Unit**!`)
                        return interaction.editReply({ embeds: [embed] });
                }

                const AttackerStats = {
                    Name: AttackerUnit[0].Unit_Name,
                    Firepower: AttackerUnit[0].Firepower,
                    HP: AttackerUnit[0].HP,
                    Speed: AttackerUnit[0].Speed,
                    BaseLevel: AttackerDB[0].base_level,
                    OfficerLevel: AttackerDB[0].officer_level
                }
                const DefenderStats = {
                    Name: DefenderUnit[0].Unit_Name,
                    Firepower: DefenderUnit[0].Firepower,
                    HP: DefenderUnit[0].HP,
                    Speed: DefenderUnit[0].Speed,
                    BaseLevel: DefenderDB[0].base_level,
                    OfficerLevel: DefenderDB[0].officer_level
                }
                const Attacker = {
                    Name: AttackerStats.Name,
                    Power: AttackerStats.Firepower * AttackerStats.OfficerLevel,
                    Health: AttackerStats.HP * AttackerStats.BaseLevel * 10,
                    Speed: AttackerStats.Speed
                }
                const Defender = {
                    Name: DefenderStats.Name,
                    Power: DefenderStats.Firepower * AttackerStats.OfficerLevel,
                    Health: DefenderStats.HP * AttackerStats.BaseLevel * 10,
                    Speed: DefenderStats.Speed
                }

                embed
					.setDescription(`${interaction.member} your **${AttackerStats.Name}** sucessfully Battled ${defender}'s **${DefenderStats.Name}**!`)

async function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }

let AH = Attacker.Health, DH = Defender.Health

if (Attacker.Speed < Defender.Speed) {
    console.log(`Attacker: ${Attacker.Speed} Defender: ${Defender.Speed}`)
    while (DH >= 0 && AH >= 0) {
        await sleep(1000)
        let defenderPower = Math.floor(Math.random() * (Defender.Power - Defender.Power/2)) + Defender.Power/2
        if (DH >= 0) {let defenderPower = 0} 
        AH = AH - defenderPower
        var playerImage = `http://phfamily.co.uk/img/Warpath/${DefenderDB[0].unit_camp}.png`
    
        embed
            .setImage(playerImage)
            .addFields(
                { name: `${defender}'s **${Defender.Name}** hit ${interaction.member}'s **${Attacker.Name}**! Dealing **${defenderPower.toLocaleString()}** damage!`, value: `${interaction.member}'s **${Attacker.Name}** has **${AH.toLocaleString()}** health remaining!` },
            ) 
        interaction.editReply({ embeds: [embed] });
        console.log(`Defender hit for ${defenderPower.toLocaleString()}`)        
        let attackerPower = Math.floor(Math.random() * (Attacker.Power - Attacker.Power/2)) + Attacker.Power/2
        if (AH >= 0) {let attackerPower = 0} 
        DH = DH - attackerPower
        var playerImage = `http://phfamily.co.uk/img/Warpath/${AttackerDB[0].unit_camp}.png`

        embed
            .setImage(playerImage)
            .addFields(
                { name: `${interaction.member}'s **${Attacker.Name}** hit ${defender}'s **${Defender.Name}**! Dealing **${attackerPower.toLocaleString()}** damage!`, value: `${defender}'s **${Defender.Name}** has **${DH.toLocaleString()}** health remaining!` },
            )     
        await sleep(1000)
        interaction.editReply({ embeds: [embed] });
        console.log(`Attacker hit for ${attackerPower.toLocaleString()}`)
    
    }
} else {
    console.log(`Defender: ${Defender.Speed} Attacker: ${Attacker.Speed}`)
    while (DH >= 0 && AH >= 0) {
        await sleep(1000)
        let attackerPower = Math.floor(Math.random() * (Attacker.Power - Attacker.Power/2)) + Attacker.Power/2
        if (AH >= 0) {let attackerPower = 0} 
        DH = DH - attackerPower
        var playerImage = `http://phfamily.co.uk/img/Warpath/${AttackerDB[0].unit_camp}.png`

        embed
            .setImage(playerImage)
            .addFields(
                { name: `${interaction.member}'s **${Attacker.Name}** hit ${defender}'s **${Defender.Name}**! Dealing **${attackerPower.toLocaleString()}** damage!`, value: `${defender}'s **${Defender.Name}** has **${DH.toLocaleString()}** health remaining!` },
            )     
        interaction.editReply({ embeds: [embed] });
        console.log(`Attacker hit for ${attackerPower.toLocaleString()}`)
    
    let defenderPower = Math.floor(Math.random() * (Defender.Power - Defender.Power/2)) + Defender.Power/2
    if (DH >= 0) {let defenderPower = 0} 
        AH = AH - defenderPower
        var playerImage = `http://phfamily.co.uk/img/Warpath/${DefenderDB[0].unit_camp}.png`
    
        embed
            .setImage(playerImage)
            .addFields(
                { name: `${defender}'s **${Defender.Name}** hit ${interaction.member}'s **${Attacker.Name}**! Dealing **${defenderPower.toLocaleString()}** damage!`, value: `${interaction.member}'s **${Attacker.Name}** has **${AH.toLocaleString()}** health remaining!` },
            ) 
        await sleep(1000)
        interaction.editReply({ embeds: [embed] });
        console.log(`Defender hit for ${defenderPower.toLocaleString()}`)
    }
}

if (AH < 0) {
    await sleep(1000)
    var playerImage = `http://phfamily.co.uk/img/Warpath/${AttackerDB[0].unit_camp}.png`
    const winnings = DefenderDB[0].officer_level * 10000
    chest = DefenderDB[0].war_chest
    console.log(chest)    
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
        .setDescription(`${interaction.member}'s **${Attacker.Name}** has been killed by ${defender}'s **${Defender.Name}**.`)
    interaction.editReply({ embeds: [embed] });  
    const win = await sql.Execute(`UPDATE levels SET battle_wins = '${newWins}', war_coins = '${newWallet}' WHERE discord_id = ${defender.id}`)
    const loss = await sql.Execute(`UPDATE levels SET battle_losses = '${newLosses}' WHERE discord_id = ${interaction.member.id}`)
    console.log('Winner:', win.info,'Loser:', loss.info)
} else
if (DH < 0) {
    await sleep(1000)
    var playerImage = `http://phfamily.co.uk/img/Warpath/${DefenderDB[0].unit_camp}.png`
    const winnings = AttackerDB[0].officer_level * 10000
    chest = AttackerDB[0].war_chest
    console.log(chest)
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
        .setDescription(`${defender}'s **${Defender.Name}** has been killed by ${interaction.member}'s **${Attacker.Name}**.`)
    await sleep(1000)
    interaction.editReply({ embeds: [embed] });
    const win = await sql.Execute(`UPDATE levels SET battle_wins = '${newWins}', war_coins = '${newWallet}' WHERE discord_id = ${interaction.member.id}`)
    const loss = await sql.Execute(`UPDATE levels SET battle_losses = '${newLosses}' WHERE discord_id = ${defender.id}`)
    console.log('Winner:', win.info,'Loser:', loss.info)
    }
}
}