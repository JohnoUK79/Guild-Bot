const sql = require("../config/Database");
const { TextInputStyle, ModalBuilder, EmbedBuilder, TextInputBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Embed } = require('discord.js');

module.exports = {
    officerSkills: async function (interaction, Attacker, Defender, AH, DH) {
        Attacker.SkillUsed, Defender.SkillUsed = ''
        const guildIcon = interaction.member.guild.iconURL();
		const guildName = interaction.member.guild.name
        const skillEmbed = new EmbedBuilder();
        skillEmbed 
				.setColor('#ff5b05')
				.setThumbnail(guildIcon)
				.setTimestamp()
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
				.setFooter({ text: `${guildName} - Battles`, iconURL: `${guildIcon}`});

        if (Attacker.OfficerSkill === 'Indomitable') {
            const chance = [
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'Yes',
                'No',
                'Yes',
            ]

            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
                console.log(`Indomitable`) 
                AH = AH + AH * 0.3
                if (AH > 0) {
                    console.log(`Health Increased`)
                    health = Math.round(AH)
                } else return console.log(`Health Error`)
                console.log(AH)

                skillEmbed
                        .addFields(
                            { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Health** to **${health.toLocaleString()}**` },
                        )   
            Attacker.SkillUsed = 'Health'
            interaction.followUp({embeds: [skillEmbed]})
            } else return
        }
        if (Attacker.OfficerSkill === 'Caring Angel') {
            if (Defender.SkillUsed === 'Attack') {
            console.log(`Caring Angel`)   
            AH = AH + AH * 0.35
            if (AH > 0) {
                console.log(`Health Increased`)
                health = Math.round(AH)
            } else return console.log(`Health Error`)

            skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Health** to **${health.toLocaleString()}**` },
                    )  
            interaction.followUp({embeds: [skillEmbed]})
            Attacker.SkillUsed = 'Health'
        } else return
        }
        if (Attacker.OfficerSkill === `The Soldier's Soldier`) {
            const chance = [
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'No',
                'Yes',
            ]
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {

                console.log(`The Soldier's Soldier`)  
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.125)
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            } else return
        }        
        if (Attacker.OfficerSkill === 'Undaunted') {
            const chance = [
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'No',
                'Yes',
            ]
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {

                console.log(`Undaunted`)  
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.5)
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            } else return
        }        
        if (Attacker.OfficerSkill === 'Who Dares Wins') {
            if (Defender.AttackType === 'Ground') {
            console.log(`Who Dares Wins`)   
            DH = DH - DH * 0.2
            if (AH > 0) {
                console.log(`Health Decreased`)
                health = Math.round(AH)
            } else return console.log(`Health Error`)

            skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & decreases ${Defender.Player} **${Defender.Name}'s Health** to **${health.toLocaleString()}**` },
                    )  
            interaction.followUp({embeds: [skillEmbed]})
            Attacker.SkillUsed = 'Health'
        }
        } else return 
        if (Attacker.OfficerSkill === 'Guardian Angel') {
            const chance = [
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'No',
                'Yes',
            ]
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess)
                console.log(`Guardian Angel`)  
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.2)
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            } else return
        }        
        if (Attacker.OfficerSkill === 'Hand of Destruction') {
            if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
                const chance = [
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'No',
                    'Yes',
                ]
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Hand of Destruction`)
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.4)
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
        }
            } else return
        }        
        if (Attacker.OfficerSkill === 'Frontline Fire') {
            const chance = [
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'No',
                'Yes',
            ]
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {

                console.log(`Frontline Fire`)            
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.08)
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            } else return
        }        
        if (Attacker.OfficerSkill === 'Vengeance') {
            const chance = [
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'No',
                'Yes',
            ]
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {

                console.log(`Vengeance`)            
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.3)
                if (Attacker.UnitType === 'Infantry') {
                    Attacker.AttackPower = Attacker.AttackPower + Attacker.AttackPower * 0.25
                }
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            } else return
        }        
        if (Attacker.OfficerSkill === 'The Motherland') {
            if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
                const chance = [
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'No',
                    'Yes',
                ]
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`The Motherland`)
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.05)
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
        }
            } else return
        }        
        if (Attacker.OfficerSkill === 'Mine Detonator') {
            const chance = [
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'No',
                'Yes',
            ]
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {

                console.log(`Mine Detonator`)            
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.135)
                if (Defender.UnitType === 'Infantry') {
                    const health = DH = DH - DH * .05
                    skillEmbed
                    .addFields(
                        { name: `${Attacker.OfficerSkill}`, value: `**${Attacker.Officer}** & reduces ${Defender.Player} **${Defender.Name}'s Heal** by **${health.toLocaleString()}**` },
                    ) 
                }

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            } else return
        }        
        if (Attacker.OfficerSkill === 'Flamestorm') {
            if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
                const chance = [
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'No',
                    'Yes',
                ]
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Flamestorm`)
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.1)
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
        }
            } else return
        }        
        if (Attacker.OfficerSkill === 'Inpenetrable') {
            const chance = [
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'Yes',
                'No',
                'Yes',
            ]

            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
                console.log(`Inpenetrable`) 
                AH = AH + AH * 0.5
                if (AH > 0) {
                    console.log(`Health Increased`)
                    health = Math.round(AH)
                } else return console.log(`Health Error`)
                console.log(AH)

                skillEmbed
                        .addFields(
                            { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Health** to **${health.toLocaleString()}**` },
                        )   
            Attacker.SkillUsed = 'Health'
            interaction.followUp({embeds: [skillEmbed]})
            } else return

        }        
        if (Attacker.OfficerSkill === 'Breaching Charge') {
            const chance = [
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'No',
                'Yes',
            ]
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {

                console.log(`Breaching Charge`)            
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.13)
                if (Defender.UnitType === 'Infantry') {
                    Attacker.AttackPower = Attacker.AttackPower - Attacker.AttackPower * .5
                    skillEmbed
                    .addFields(
                        { name: `${Attacker.OfficerSkill}`, value: `**${Attacker.Officer}** & reduces ${Defender.Player} **${Defender.Name}'s Heal** by **${health.toLocaleString()}**` },
                    ) 
                }

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            } else return
        }        
        if (Attacker.OfficerSkill === 'Flaming Meteors') {
            if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
                const chance = [
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'No',
                    'Yes',
                ]
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Flaming Meteors`)
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.3)
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
        }
            } else return
        }        
        if (Attacker.OfficerSkill === 'Master of War') {
            const chance = [
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'No',
                'Yes',
            ]
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {

                console.log(`Master of War`)            
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.10)

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            } else return
        }        
        if (Attacker.OfficerSkill === 'Phantom Power') {
            const chance = [
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'No',
                'Yes',
            ]
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {

                console.log(`Phantom Power`)            
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.10)
                const damage = DH - DH * .2
                DH - damage

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                        { name: `${Attacker.OfficerSkill}`, value: `**${Attacker.Officer}** decreases ${Defender.Player} **${Defender.Name}'s Health** by **${damage.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            } else return
        }        
        if (Attacker.OfficerSkill === 'Blinding Flash') {
            const chance = [
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'No',
                'Yes',
            ]
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {

                console.log(`Blinding Flash`)            
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.10)

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            } else return
        }        
        if (Attacker.OfficerSkill === 'Rain of Blades') {
            if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
                const chance = [
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'No',
                    'Yes',
                ]
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Rain of Blades`)
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.1)
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
        }
            } else return
        }        
        if (Attacker.OfficerSkill === 'Devastation') {
            if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
                const chance = [
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'No',
                    'Yes',
                ]
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Rain of Blades`)
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.25)
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
        }
            } else return
        }        
        if (Attacker.OfficerSkill === 'Beauty Worth Preserving') {
            const chance = [
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'No',
                'Yes',
            ]
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {

                console.log(`Beauty Worth Preserving`)            
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.15)
                const damage = Math.round(Defender.AttackPower = Defender.AttackPower * .1)
                Defender.AttackPower - damage

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                        { name: `${Attacker.OfficerSkill}`, value: `**${Attacker.Officer}** & decreases ${Defender.Player} **${Defender.Name}'s Health** by **${damage.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            } else return
        }        
        if (Attacker.OfficerSkill === 'Forlorn Hope') {
            const chance = [
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'No',
                'Yes',
            ]
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {

                console.log(`Forlorn Hope`)            
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.25)

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            } else return
        }        
        if (Attacker.OfficerSkill === 'Sky Dancer') {
            if (Defender.UnitType === 'Bombers' || 'Fighters'){
                const chance = [
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'No',
                    'Yes',
                ]
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Sky Dancer`)
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.15)
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
        }
            } else return
        }        
        if (Attacker.OfficerSkill === 'Untouchable') {
            const chance = [
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'No',
                'Yes',
            ]
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {

                console.log(`Untouchable`)            
                Defender.AttackPower = 0

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & decreases ${Defender.Player} **${Defender.Name}'s Attack** to **${Defender.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            console.log(Defender.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            } else return
        }        
        if (Attacker.OfficerSkill === 'Heavenly Rays') {
            console.log(`Heavenly Rays`)  
                      
            if (Defender.UnitType === 'Fighters' && Attacker.UnitType === 'Fighters'){
                const chance = [
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'No',
                    'Yes',
                ]
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Sky Dancer`)
                Attacker.AttackPower = Math.round(Attacker.AttackPower  - Attacker.AttackPower * 0.15)

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** to **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
        }
            } else return
        }        
        if (Attacker.OfficerSkill === 'Twin Fangs') {
            if (Defender.UnitType === 'Bombers' || 'Fighters'){
                const chance = [
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'No',
                    'Yes',
                ]
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Twin Fangs`)            
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 0.25)
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
        }
            } else return
        }        
        if (Attacker.OfficerSkill === 'Night Evader') {
            const chance = [
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'No',
                'Yes',
            ]
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {

                console.log(`Night Evader`)            
                Defender.AttackPower = Defender.AttackPower - Defender.AttackPower * .2

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & decreases ${Defender.Player} **${Defender.Name}'s Attack** to **${Defender.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            console.log(Defender.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            } else return
        }        
        if (Attacker.OfficerSkill === 'Unleashed Justice') {
            if (Defender.UnitType === 'Bombers'){
                const chance = [
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'No',
                    'Yes',
                ]
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Unleashed Justice`)            
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 2)
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
        }
            } else return
        }        
        if (Attacker.OfficerSkill === 'Sticky Situation') {
            const chance = [
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'No',
                'Yes',
            ]
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {

                console.log(`Sticky Situation`)            
                Attacker.AttackPower = Attacker.AttackPower + Attacker.AttackPower * .2
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            console.log(Defender.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            } else return
        }        
        if (Attacker.OfficerSkill === 'Desperate Counterattack') {
            const chance = [
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'Yes',
                'No',
                'No',
                'Yes',
            ]
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
            if (Attacker.UnitType === 'Fighter') {
                console.log(`Desperate Counterattack`)        
                Attacker.AttackPower = Attacker.AttackPower + Attacker.AttackPower * .25
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            console.log(Defender.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
        }
            } else return
        }        
        if (Attacker.OfficerSkill === 'Last Gasp') {
            if (Defender.UnitType === 'Bombers'){
                const chance = [
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'Yes',
                    'No',
                    'No',
                    'Yes',
                ]
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Last Gasp`)            
                Attacker.AttackPower = Math.round(Attacker.AttackPower + Attacker.AttackPower * 2)
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Attacker.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
        }
            } else return
        }
        // module.exports.defenderMultipler = defenderMultipler

    }
}