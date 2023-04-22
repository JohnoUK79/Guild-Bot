const sql = require("../config/Database");
const { EmbedBuilder } = require('discord.js');
async function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
    }
module.exports = {
    officerSkills: async function (interaction, Attacker, Defender, AH, DH) {

        const guildIcon = interaction.member.guild.iconURL();
        const guildName = interaction.member.guild.name
        Attacker.SkillUsed, Defender.SkillUsed = ''
        if (Attacker.OfficerLevel === 0) {
            Attacker.OfficerLevel = 1
            console.log(`Officer Not Levelled Up`)
        }
        const chance = [
            'Yes',
            'No',
            'No',
            'No',
            'No',
            'Yes',
            'No',
            'No',
            'No',
            'Yes',
        ]
        const skillEmbed = new EmbedBuilder();
            skillEmbed 
                    .setColor('#ff5b05')
                    .setThumbnail(guildIcon)
                    .setTimestamp()
                    .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                    .setFooter({ text: `${guildName} - Battles`, iconURL: `${guildIcon}`});
    
        if (Attacker.OfficerSkill === 'Indomitable') {
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                    console.log(`Indomitable`) 
                    health = AH * 0.3
                    AH = AH + health
                    if (AH > 0) {
                        console.log(`Health Increased`, health)
                    } else return console.log(`Health Error`)
                    console.log(health)
    
                    skillEmbed
                            .addFields(
                                { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Health** to **${health.toLocaleString()}**` },
                            )   
                Attacker.SkillUsed = 'Health'
                interaction.followUp({embeds: [skillEmbed]})
                return
                } 
        }            
            
        if (Attacker.OfficerSkill === 'Caring Angel') {
            if (Defender.SkillUsed === 'Attack') {
                console.log(`Caring Angel`)   
                health = AH * 0.35
                AH = AH + health
                if (AH > 0) {
                    console.log(`Health Increased`, health)
                } else return console.log(`Health Error`)
    
                skillEmbed
                        .addFields(
                            { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Health** to **${health.toLocaleString()}**` },
                        )  
                interaction.followUp({embeds: [skillEmbed]})
                Attacker.SkillUsed = 'Health'
                return
            } 
            }
        if (Attacker.OfficerSkill === `The Soldier's Soldier`) {
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
                console.log(`The Soldier's Soldier`)  
                Power = Attacker.AttackPower * 0.125
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        if (Attacker.OfficerSkill === 'Undaunted') {
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
                console.log(`Undaunted`)  
                Power = Attacker.AttackPower * 0.5
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        if (Attacker.OfficerSkill === 'Who Dares Wins') {
            if (Defender.AttackType === 'Ground') {
                console.log(`Who Dares Wins`)   
                const health = DH * 0.2
                DH - health
                if (DH > 0) {
                    console.log(`Health Decreased`, health)
                } else return console.log(`Health Error`)
    
                skillEmbed
                        .addFields(
                            { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & decreases ${Defender.Player} **${Defender.Name}'s Health** by **${health.toLocaleString()}**` },
                        )  
                interaction.followUp({embeds: [skillEmbed]})
                Attacker.SkillUsed = 'Health'
                return
            }         }        
        if (Attacker.OfficerSkill === 'Guardian Angel') {
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
            console.log(skillSuccess)
                console.log(`Guardian Angel`)  
                Power = Attacker.AttackPower * 0.2
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        if (Attacker.OfficerSkill === 'Hand of Destruction') {
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Hand of Destruction`)
                Power = Attacker.AttackPower * 0.4
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        if (Attacker.OfficerSkill === 'Frontline Fire') {
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
                console.log(`Frontline Fire`)            
                Power = Attacker.AttackPower * 0.08
                Attacker.AttackPower = Attacker.AttackPower + Power

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        if (Attacker.OfficerSkill === 'Vengeance') {

            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
                console.log(`Vengeance`)            
                Attacker.AttackPower * 0.3
                Attacker.AttackPower = Attacker.AttackPower + Power
                if (Attacker.UnitType === 'Infantry') {
                    Special = Attacker.AttackPower + Attacker.AttackPower * 0.25 
                    Attacker.AttackPower = Attacker.AttackPower + Special
                }
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Special.toLocaleString() || Power.toLocaleString()}**` },
                    ),   
            console.log(Special.toLocaleString() || Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        if (Attacker.OfficerSkill === 'The Motherland') {
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`The Motherland`)
                damage = Attacker.AttackPower * 0.5
                Attacker.AttackPower = Attacker.AttackPower + damage
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${damage.toLocaleString()}**` },
                    ),   
            console.log(damage.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        if (Attacker.OfficerSkill === 'Mine Detonator') {
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
                console.log(`Mine Detonator`)            
                Power = Attacker.AttackPower * 0.135
                Attacker.AttackPower = Attacker.AttackPower + Power
                if (Defender.UnitType === 'Infantry') {
                    health = DH * .05
                    DH = DH - health
                    skillEmbed
                        .addFields(
                            { name: `${Attacker.OfficerSkill}`, value: `**${Attacker.Officer}** & reduces ${Defender.Player} **${Defender.Name}'s Heal** by **${health.toLocaleString()}**` },
                    ) 
                }

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${damage.toLocaleString()}**` },
                    ),   
            console.log(damage.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        if (Attacker.OfficerSkill === 'Flamestorm') {
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Flamestorm`)
                Power = Attacker.AttackPower * 0.1
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        if (Attacker.OfficerSkill === 'Inpenetrable') {
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
                console.log(`Inpenetrable`) 
                health = AH * 0.5
                AH = AH + health
                if (AH > 0) {
                    console.log(`Health Increased`, health)
                } else return console.log(`Health Error`)

                skillEmbed
                        .addFields(
                            { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Health** to **${health.toLocaleString()}**` },
                        )   
            Attacker.SkillUsed = 'Health'
            interaction.followUp({embeds: [skillEmbed]})
            return
            }         
        }        
        if (Attacker.OfficerSkill === 'Breaching Charge') {
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
                console.log(`Breaching Charge`)            
                Power = Attacker.AttackPower * 0.13
                Attacker.AttackPower = Attacker.AttackPower + Power
                if (Defender.UnitType === 'Infantry') {
                    Special = Attacker.AttackPower * .5
                    Attacker.AttackPower = Attacker.AttackPower + Special
                    skillEmbed
                        .addFields(
                            { name: `${Attacker.OfficerSkill}`, value: `**${Attacker.Officer}** & reduces ${Defender.Player} **${Defender.Name}'s Health** by **${Special.toLocaleString()}**` },
                    ) 
                }

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Special.toLocaleString() || Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        if (Attacker.OfficerSkill === 'Flaming Meteors') {
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Flaming Meteors`)
                Power = Attacker.AttackPower * 0.3
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        if (Attacker.OfficerSkill === 'Master of War') {
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
                console.log(`Master of War`)            
                Power = Attacker.AttackPower * 0.10
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        if (Attacker.OfficerSkill === 'Phantom Power') {
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
                console.log(`Phantom Power`)            
                Power = Attacker.AttackPower * 0.10
                Attacker.AttackPower = Attacker.AttackPower + Power
                Damage = DH * 0.2
                DH = DH - Damage

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                        { name: `${Attacker.OfficerSkill}`, value: `**${Attacker.Officer}** decreases ${Defender.Player} **${Defender.Name}'s Health** by **${Damage.toLocaleString()}**` },
                    ),   
            console.log(Damage.toLocaleString() || Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        if (Attacker.OfficerSkill === 'Blinding Flash') {
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
                console.log(`Blinding Flash`)            
                Power = Attacker.AttackPower * 0.10
                Attacker.AttackPower = Attacker.AttackPower + Power

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        if (Attacker.OfficerSkill === 'Rain of Blades') {
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Rain of Blades`)
                Power = Attacker.AttackPower * 0.1
                Attacker.AttackPower = Attacker.AttackPower + Power

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        if (Attacker.OfficerSkill === 'Devastation') {
            if (Attacker.UnitType === 'Howitzers' || 'AntiTankGuns'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Devastation`)
                Power = Attacker.AttackPower * 0.25
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        if (Attacker.OfficerSkill === 'Beauty Worth Preserving') {
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
                console.log(`Beauty Worth Preserving`)            
                Power = Attacker.AttackPower * 0.15
                Attacker.AttackPower = Attacker.AttackPower + Power
                Special = Math.round(Defender.AttackPower = Defender.AttackPower * .1)
                Defender.AttackPower = Defender.AttackPower - Special

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                        { name: `${Attacker.OfficerSkill}`, value: `**${Attacker.Officer}** & decreases ${Defender.Player} **${Defender.Name}'s Health** by **${Special.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString(), Special.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        if (Attacker.OfficerSkill === 'Forlorn Hope') {
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
                console.log(`Forlorn Hope`)            
                Power = Attacker.AttackPower * 0.25
                Attacker.AttackPower = Attacker.AttackPower + Power

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        if (Attacker.OfficerSkill === 'Sky Dancer') {
            if (Attacker.UnitType === 'Bombers' || 'Fighters'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Sky Dancer`)
                Power = Attacker.AttackPower * 0.15
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        if (Attacker.OfficerSkill === 'Untouchable') {
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
                console.log(`Untouchable`)   
                Defend = Defender.AttackPower
                Defender.AttackPower = 0

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & decreases ${Defender.Player} **${Defender.Name}'s Attack** to **${Defender.AttackPower.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            console.log(Defender.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            sleep(1000)
            Defender.AttackPower = Defend
            return
            } 
        }        
        if (Attacker.OfficerSkill === 'Heavenly Rays') {
            if (Attacker.UnitType === 'Fighters' && Attacker.UnitType === 'Fighters'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Heavenly Rays`)    
                Power = Attacker.AttackPower * 0.15
                Attacker.AttackPower = Attacker.AttackPower + Power

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** to **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        if (Attacker.OfficerSkill === 'Twin Fangs') {
            if (Attacker.UnitType === 'Bombers' || 'Fighters'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Twin Fangs`)            
                Power = Attacker.AttackPower * 0.25
                Attacker.AttackPower = Attacker.AttackPower + Power

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        if (Attacker.OfficerSkill === 'Night Evader') {
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
                console.log(`Night Evader`)            
                Power = Defender.AttackPower * .2
                Defender.AttackPower = Defender.AttackPower - Power

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & decreases ${Defender.Player} **${Defender.Name}'s Attack** to **${Power.toLocaleString()}**` },
                    ),   
            console.log(Attacker.AttackPower.toLocaleString())
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        if (Attacker.OfficerSkill === 'Unleashed Justice') {
            if (Attacker.UnitType === 'Bombers'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Unleashed Justice`)            
                Power = Attacker.AttackPower * 2
                Attacker.AttackPower = Attacker.AttackPower + Power

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
            } 
        }        
        if (Attacker.OfficerSkill === 'Sticky Situation') {
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
                console.log(`Sticky Situation`)            
                Power = Attacker.AttackPower * .2
                Attacker.AttackPower = Attacker.AttackPower + Power

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            console.log(Defender.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
            } 
        }        
        if (Attacker.OfficerSkill === 'Desperate Counterattack') {
            const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
            console.log(skillSuccess)
            if (skillSuccess === 'Yes') {
            if (Attacker.UnitType === 'Fighter') {
                console.log(`Desperate Counterattack`)        
                Power = Attacker.AttackPower * .25
                Attacker.AttackPower = Attacker.AttackPower + Power
                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            console.log(Defender.AttackPower.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]})
            return
        }
            } 
        }        
        if (Attacker.OfficerSkill === 'Last Gasp') {
            if (Attacker.UnitType === 'Bombers'){
                const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
                console.log(skillSuccess)
                if (skillSuccess === 'Yes') {
                console.log(`Last Gasp`)            
                Power = Attacker.AttackPower * 2
                Attacker.AttackPower = Attacker.AttackPower + Power

                skillEmbed
                    .addFields(
                        { name: `${Attacker.Officer}`, value: `used the **${Attacker.OfficerSkill} Skill** & increases ${interaction.member} **${Attacker.Name}'s Attack** by **${Power.toLocaleString()}**` },
                    ),   
            console.log(Power.toLocaleString())
            Attacker.SkillUsed = 'Attack'
            interaction.followUp({embeds: [skillEmbed]}) 
            return
        }
        } 
        }

    //Defender Skills
    skillEmbed 
        .setAuthor({ name: Defender.Player.username || Defender.Name, iconURL: Defender.Image })

    if (Defender.OfficerSkill === 'Indomitable') {
    console.log(`Indomitable`) 
        const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
        console.log(skillSuccess)
        if (skillSuccess === 'Yes') {
            console.log(`Indomitable`) 
            health = DH * 0.3
            DH = DH + health
            if (DH > 0) {
                console.log(`Health Increased`, health)
            } else return console.log(`Health Error`)
            console.log(DH)

            skillEmbed
                    .addFields(
                        { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Health** to **${health.toLocaleString()}**` },
                    )   
        Defender.SkillUsed = 'Health'
        interaction.followUp({embeds: [skillEmbed]})
        return
        } 
                }            
    
if (Defender.OfficerSkill === 'Caring Angel') {
    if (Attacker.SkillUsed === 'Attack') {
        console.log(`Caring Angel`)   
        health = DH * 0.35
        DH = DH + health
        if (DH > 0) {
            console.log(`Health Increased`, health)
        } else return console.log(`Health Error`)

        skillEmbed
                .addFields(
                    { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Health** to **${health.toLocaleString()}**` },
                )  
        interaction.followUp({embeds: [skillEmbed]})
        Defender.SkillUsed = 'Health'
        return
    } 
    }
if (Defender.OfficerSkill === `The Soldier's Soldier`) {
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    console.log(skillSuccess)
    if (skillSuccess === 'Yes') {
        console.log(`The Soldier's Soldier`)  
        Power = Defender.AttackPower * 0.125
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Defender.AttackPower.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
if (Defender.OfficerSkill === 'Undaunted') {
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    console.log(skillSuccess)
    if (skillSuccess === 'Yes') {
        console.log(`Undaunted`)  
        Power = Defender.AttackPower * 0.5
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
if (Defender.OfficerSkill === 'Who Dares Wins') {
    if (Defender.AttackType === 'Ground') {
        console.log(`Who Dares Wins`)   
        damage = DH * 0.2
        DH = DH - damage
        if (DH > 0) {
            console.log(`Health Decreased`, damage)
        } else return console.log(`Health Error`)

        skillEmbed
                .addFields(
                    { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & decreases ${Attacker.Player} **${Attacker.Name}'s Health** by **${damage.toLocaleString()}**` },
                )  
        interaction.followUp({embeds: [skillEmbed]})
        Defender.SkillUsed = 'Health'
        return
    }         }        
if (Defender.OfficerSkill === 'Guardian Angel') {
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    console.log(skillSuccess)
    if (skillSuccess === 'Yes') {
    console.log(skillSuccess)
        console.log(`Guardian Angel`)  
        Power = Defender.AttackPower * 0.2
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
if (Defender.OfficerSkill === 'Hand of Destruction') {
    if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
        const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
        console.log(skillSuccess)
        if (skillSuccess === 'Yes') {
        console.log(`Hand of Destruction`)
        Power = Defender.AttackPower * 0.4
        Defender.AttackPower = Defender.AttackPower + Power
        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]}) 
    return
}
    } 
}        
if (Defender.OfficerSkill === 'Frontline Fire') {
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    console.log(skillSuccess)
    if (skillSuccess === 'Yes') {
        console.log(`Frontline Fire`)            
        Power = Defender.AttackPower * 0.08
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
if (Defender.OfficerSkill === 'Vengeance') {
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    console.log(skillSuccess)
    if (skillSuccess === 'Yes') {
        console.log(`Vengeance`)            
        Power = Defender.AttackPower * 0.3
        Defender.AttackPower = Defender.AttackPower + Power
        if (Defender.UnitType === 'Infantry') {
            Special = Defender.AttackPower * 0.25
            Defender.AttackPower = Defender.AttackPower + Special
        }
        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Special.toLocaleString() || Power.toLocaleString()}**` },
            ),   
    console.log(Special.toLocaleString() || Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
if (Defender.OfficerSkill === 'The Motherland') {
    if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
        const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
        console.log(skillSuccess)
        if (skillSuccess === 'Yes') {
        console.log(`The Motherland`)
        Power = Defender.AttackPower * 0.5
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]}) 
    return
}
    } 
}        
if (Defender.OfficerSkill === 'Mine Detonator') {
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    console.log(skillSuccess)
    if (skillSuccess === 'Yes') {
        console.log(`Mine Detonator`)            
        Power = Defender.AttackPower * 0.135
        Defender.AttackPower = Defender.AttackPower + Power
        if (Defender.UnitType === 'Infantry') {
            Damage = DH * .05
            DH = DH - Damage

            skillEmbed
            .addFields(
                { name: `${Defender.OfficerSkill}`, value: `**${Defender.Officer}** & reduces ${Attacker.Player} **${Attacker.Name}'s Heal** by **${Damage.toLocaleString()}**` },
            ) 
        }

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Damage.toLocaleString() || Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
if (Defender.OfficerSkill === 'Flamestorm') {
    if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
        const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
        console.log(skillSuccess)
        if (skillSuccess === 'Yes') {
        console.log(`Flamestorm`)
        Power =Defender.AttackPower * 0.1
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]}) 
    return
}
    } 
}        
if (Defender.OfficerSkill === 'Inpenetrable') {
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    console.log(skillSuccess)
    if (skillSuccess === 'Yes') {
        console.log(`Inpenetrable`) 
        health = DH * 0.5
        DH = DH + health
        if (DH > 0) {
            console.log(`Health Increased`, health)
        } else return console.log(`Health Error`)

        skillEmbed
                .addFields(
                    { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Health** to **${health.toLocaleString()}**` },
                )   
    Defender.SkillUsed = 'Health'
    interaction.followUp({embeds: [skillEmbed]})
    return
    }         
}        
if (Defender.OfficerSkill === 'Breaching Charge') {
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    console.log(skillSuccess)
    if (skillSuccess === 'Yes') {
        console.log(`Breaching Charge`)            
        Power = Defender.AttackPower * 0.13
        Defender.AttackPower = Defender.AttackPower + Power
        if (Attacker.UnitType === 'Infantry') {
            Special = Defender.AttackPower * .5
            Defender.AttackPower = Defender.AttackPower - Special

            skillEmbed
            .addFields(
                { name: `${Defender.OfficerSkill}`, value: `**${Defender.Officer}** & reduces ${Attacker.Player} **${Attacker.Name}'s Heal** by **${Special.toLocaleString()}**` },
            ) 
        }

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Special.toLocaleString() || Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
if (Defender.OfficerSkill === 'Flaming Meteors') {
    if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
        const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
        console.log(skillSuccess)
        if (skillSuccess === 'Yes') {
        console.log(`Flaming Meteors`)
        Power = Defender.AttackPower * 0.3
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Defender.AttackPower.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]}) 
    return
}
    } 
}        
if (Defender.OfficerSkill === 'Master of War') {
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    console.log(skillSuccess)
    if (skillSuccess === 'Yes') {
        console.log(`Master of War`)            
        Power = Defender.AttackPower * 0.10
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Defender.AttackPower.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
if (Defender.OfficerSkill === 'Phantom Power') {
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    console.log(skillSuccess)
    if (skillSuccess === 'Yes') {
        console.log(`Phantom Power`)            
        Power = Defender.AttackPower * 0.10
        Defender.AttackPower = Defender.AttackPower + Power

        
        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
if (Defender.OfficerSkill === 'Blinding Flash') {
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    console.log(skillSuccess)
    if (skillSuccess === 'Yes') {
        console.log(`Blinding Flash`)            
        Power = Defender.AttackPower * 0.10
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
if (Defender.OfficerSkill === 'Rain of Blades') {
    if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
        const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
        console.log(skillSuccess)
        if (skillSuccess === 'Yes') {
        console.log(`Rain of Blades`)
        Power = Defender.AttackPower * 0.1
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]}) 
    return
}
    } 
}        
if (Defender.OfficerSkill === 'Devastation') {
    if (Defender.UnitType === 'Howitzers' || 'AntiTankGuns'){
        const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
        console.log(skillSuccess)
        if (skillSuccess === 'Yes') {
        console.log(`Devastation`)
        Power = Defender.AttackPower * 0.25
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]}) 
    return
}
    } 
}        
if (Defender.OfficerSkill === 'Beauty Worth Preserving') {
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    console.log(skillSuccess)
    if (skillSuccess === 'Yes') {
        console.log(`Beauty Worth Preserving`)            
        Power = Defender.AttackPower * 0.15
        Defender.AttackPower = Defender.AttackPower + Power
        
        health = Attacker.AttackPower * .1
        Attacker.AttackPower = Attacker.AttackPower - damage

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Defender.AttackPower.toLocaleString()}**` },
                { name: `${Defender.OfficerSkill}`, value: `**${Defender.Officer}** & decreases ${Attacker.Player} **${Attacker.Name}'s Health** by **${health.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
if (Defender.OfficerSkill === 'Forlorn Hope') {
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    console.log(skillSuccess)
    if (skillSuccess === 'Yes') {
        console.log(`Forlorn Hope`)            
        Power = Defender.AttackPower * 0.25
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
if (Defender.OfficerSkill === 'Sky Dancer') {
    if (Defender.UnitType === 'Bombers' || 'Fighters'){
        const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
        console.log(skillSuccess)
        if (skillSuccess === 'Yes') {
        console.log(`Sky Dancer`)
        Power = Defender.AttackPower * 0.15
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Defender.AttackPower.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]}) 
    return
}
    } 
}        
if (Defender.OfficerSkill === 'Untouchable') {
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    console.log(skillSuccess)
    if (skillSuccess === 'Yes') {
        console.log(`Untouchable`)            
        Power = Attacker.AttackPower
        Attacker.AttackPower = 0

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & decreases ${Attacker.Player} **${Attacker.Name}'s Attack** to **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    sleep(1000)
    Attacker.AttackPower = Power
    return
    } 
}        
if (Defender.OfficerSkill === 'Heavenly Rays') {
    if (Attacker.UnitType === 'Fighters' && Defender.UnitType === 'Fighters'){
        const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
        console.log(skillSuccess)
        if (skillSuccess === 'Yes') {
        console.log(`Heavenly Rays`)    
        Power = Defender.AttackPower * 0.15
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** to **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]}) 
    return
}
    } 
}        
if (Defender.OfficerSkill === 'Twin Fangs') {
    if (Defender.UnitType === 'Bombers' || 'Fighters'){
        const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
        console.log(skillSuccess)
        if (skillSuccess === 'Yes') {
        console.log(`Twin Fangs`)            
        Power = Defender.AttackPower * 0.25
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]}) 
    return
}
    } 
}        
if (Defender.OfficerSkill === 'Night Evader') {
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    console.log(skillSuccess)
    if (skillSuccess === 'Yes') {
        console.log(`Night Evader`)            
        Power = Attacker.AttackPower * .2
        Attacker.AttackPower = Attacker.AttackPower - Power

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & decreases ${Attacker.Player} **${Attacker.Name}'s Attack** to **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}        
if (Defender.OfficerSkill === 'Unleashed Justice') {
    if (Defender.UnitType === 'Bombers'){
        const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
        console.log(skillSuccess)
        if (skillSuccess === 'Yes') {
        console.log(`Unleashed Justice`)            
        Power = Defender.AttackPower * 2
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]}) 
    return
}
    } 
}        
if (Defender.OfficerSkill === 'Sticky Situation') {
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    console.log(skillSuccess)
    if (skillSuccess === 'Yes') {
        console.log(`Sticky Situation`)            
        Power = Defender.AttackPower * .2
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
    } 
}
if (Defender.OfficerSkill === 'Desperate Counterattack') {
    const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
    console.log(skillSuccess)
    if (skillSuccess === 'Yes') {
    if (Defender.UnitType === 'Fighter') {
        console.log(`Desperate Counterattack`)        
        Power = Defender.AttackPower * .25
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]})
    return
}
    } 
}        
if (Defender.OfficerSkill === 'Last Gasp') {
    if (Defender.UnitType === 'Bombers'){
        const skillSuccess = chance[Math.floor(Math.random() * chance.length)]
        console.log(skillSuccess)
        if (skillSuccess === 'Yes') {
        console.log(`Last Gasp`)            
        Power = Defender.AttackPower * 2
        Defender.AttackPower = Defender.AttackPower + Power

        skillEmbed
            .addFields(
                { name: `${Defender.Officer}`, value: `used the **${Defender.OfficerSkill} Skill** & increases ${Defender.Player} **${Defender.Name}'s Attack** by **${Power.toLocaleString()}**` },
            ),   
    console.log(Power.toLocaleString())
    Defender.SkillUsed = 'Attack'
    interaction.followUp({embeds: [skillEmbed]}) 
    return
}
} 
}
}
}
